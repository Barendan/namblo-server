import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ApolloError } from 'apollo-server-errors';

export default class Users extends MongoDataSource {
    async getUser(id) {
        return await this.model.findById(id);
    }

    async registerUser({username, email, password, token}) {
        const oldUser = await this.model.findOne({ email });
        if (oldUser) {
            throw new ApolloError('A user is already registered with the email' + email, 'USER_ALREADY_EXISTS');
        }

        return await this.model.create({ username, email, password, token });
    }

}