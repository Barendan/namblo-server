import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Post {
        _id: ID!
        title: String!
        body: String!
        author: String
    }

    type Query {
        getPosts: [Post!],
        getPost(id: ID!): Post!
    }

    type Mutation {
        createPost(title: String!, body: String!, author: String): Post!,
        deletePost(id: ID!): Post!
        updatePost(id: ID!, title: String, body: String, author: String): Post!
    }
`