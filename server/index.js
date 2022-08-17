import 'dotenv/config';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';
import axios from 'axios';

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
  dataSources,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const userId = token.split(' ')[1]; // get username after 'Bearer '
    if (userId) {
      const { data } = await axios
        .get(`http://localhost:4011/login/${userId}`)
        .catch((error) => {
          throw new AuthenticationError(error.message);
        });

      return { userId: data.id, userRole: data.role };
    }
  }
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});