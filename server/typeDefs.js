import { gql } from 'apollo-server';

export const typeDefs = gql`
    type User {
        _id: ID!
        username: String,
        email: String,
        password: String,
        token: String,
    }

    input RegisterInput {
        username: String!,
        email: String!,
        password: String!
        confirmPassword: String
    }

    input LoginInput {
        email: String,
        password: String,
    }

    type Post {
        _id: ID!
        title: String!
        body: String!
        status: Boolean!
        createdAt: String!
    }

    type Query {
        getUser(id: ID!): User
        getPosts: [Post!],
        getPost(id: ID!): Post!
    }
    
    type Mutation {
        registerUser(registerInput: RegisterInput): User
        loginUser(loginInput: LoginInput): User
        createPost(title: String!, body: String!, status: Boolean!, createdAt: String!): Post!,
        deletePost(id: ID!): Post!
        updatePost(id: ID!, title: String, body: String, status: Boolean): Post!
    }
`