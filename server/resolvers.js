
export const resolvers = {
    Query: {
        getPosts: (_, _args, { dataSources: { posts } }) => {
            return posts.getPosts()
        },
        getPost: (_, {id}, { dataSources: { posts } }) => {
            return posts.getPost(id)
        }
    },
    Mutation: {
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