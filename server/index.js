import 'dotenv/config';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { Post as PostModel } from './models/post';
import Posts from './dataSources/posts';


const uri = process.env.MONGODB_URI;
const main = async () => {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
}

main()
  .then(console.log('🎉 connected to database successfully'))
  .catch(error => console.error(error));

const dataSources = () => ({
  posts: new Posts(PostModel),
});

const server = new ApolloServer({
  typeDefs, 
  resolvers, 
  dataSources,
  cors: {
    origins: ['http://localhost:3000']
  }
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});