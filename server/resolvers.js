import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const resolvers = {
    Query: {
        getUser: (_, { id }, { dataSources: { users } }) => {
            return users.getUser(id)
        },
        getPosts: (_, _args, { dataSources: { posts } }) => {
            return posts.getPosts()
        },
        getPost: (_, {id}, { dataSources: { posts } }) => {
            return posts.getPost(id)
        }
    },
    Mutation: {
        registerUser: async (_, {registerInput: {username, email, password} }, { dataSources: { users } }) => {

            let encryptedPassword = await bcrypt.hash(password, 10);

            const newUser = {
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword
            }

            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFE_STRING",
                {
                    expiresIn: "2h"
                }
            );

            newUser.token = token;
            
            
            const res = await users.registerUser(newUser)
            console.log('reggie:', res)
            
            // const res = await newUser.save();

            return {
                id: res.id,
                ...res._doc
            }
        },
        loginUser: async (_, _args, { dataSources: { users } }) => {
            const user = await this.model.findOne({ email });

            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    { user_id: user._id, email },
                    "UNSAFE_STRING",
                    {
                        expiresIn: "2h"
                    }
                );

                user.token = token;

                return {
                    id: user.id,
                    ...user._doc
                }
            } else {
                throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD')
            }

        },
        createPost: (_root, _args, { dataSources: { posts } }) => {
            return posts.createPost(_args)
        },
        deletePost: (_root, {id}, { dataSources: { posts } }) => {
            return posts.deletePost(id)
        },
        updatePost: (_root, _args, { dataSources: { posts } }) => {
            return posts.updatePost(_args)
        }
    }
}