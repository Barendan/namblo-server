import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ApolloError } from 'apollo-server-errors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class Users extends MongoDataSource {
    async getUser(id) {
        return await this.model.findById(id);
    }

    async registerUser({ registerInput: {username, email, password} }) {
        const oldUser = await this.model.findOne({ email });

        if (oldUser) {
            throw new ApolloError('A user is already registered with the email' + email, 'USER_ALREADY_EXISTS');
        }

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

        // return {
        //     id: res.id,
        //     ...res._doc
        // }

        return await this.model.create({ username, email, password, token });
    }

    async loginUser({ loginInput: { email, password } }) { 
        const user = await this.model.findOne({ email });
            
        if ( user && (await bcrypt.compare(password, user.password)) ) {
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
    }
}