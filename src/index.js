import { ApolloServer } from 'apollo-server';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

// const MONGODB_URI = mongodb+srv://firstman:<password>@cluster0.mbphrki.mongodb.net/?retryWrites=true&w=majority

const server = new ApolloServer({typeDefs, resolvers})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});