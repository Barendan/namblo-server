
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
        registerUser: async (_, _args, { dataSources: { users } }) => {            
            return users.registerUser(_args)
        },
        loginUser: (_, _args, { dataSources: { users } }) => {
            return users.loginUser(_args)
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