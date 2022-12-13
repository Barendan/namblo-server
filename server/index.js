import 'dotenv/config';
import mongoose from 'mongoose';
// import { ApolloServer } from 'apollo-server';
import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { Post as PostModel } from './models/post';
import { User as UserModel } from './models/user';
import Posts from './dataSources/posts';
import Users from './dataSources/users';


const uri = process.env.MONGODB_URI;
const main = async () => {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
}

main()
  .then(console.log('🎉 connected to database successfully'))
  .catch(error => console.error(error));

const dataSources = () => ({
  posts: new Posts(PostModel),
  users: new Users(UserModel),
});

const server = new ApolloServer({
  typeDefs, 
  resolvers, 
  dataSources
})

const newPromise = new Promise (function (resolve, reject) {
  resolve( startStandaloneServer(server, {
    listen: { port: 4000 },
  }))
});

newPromise.then(function(result) { console.log(`🚀  Server ready at: ${result.url}`)} )

// console.log(`🚀  Server ready at: ${url}`);

// server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });