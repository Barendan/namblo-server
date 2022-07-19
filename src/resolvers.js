import { moveEmitHelpers } from "typescript";

const Posts = [{
    _id: "420",
    title: 'First Post',
    body: 'I sure do love writing',
    author: 'Daniel Barenboim'
}];

export const resolvers = {
    Query: {
        getPosts: (_, _args, _context, _) => {
            return posts
        },
        getPost: (_, {id}, context, _) => {
            return posts.find(({ _id }) => _id === id)
        }
    },
    Mutation: {
        createPost: (_root, _args, _context, _info) => {
            const randomId = Math.random().toString().split('.')[1];
            const newPost = { ...args, _id: randomId };
            Posts.push(newPost);
            return newPost
        }
    }
    
}