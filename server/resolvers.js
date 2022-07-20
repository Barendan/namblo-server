import { getMouseEventOptions } from "@testing-library/user-event/dist/utils"

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
            return posts.createPost(args)
        }
    }
}