import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class Posts extends MongoDataSource {
    async getPosts() {
        return await this.model.find();
    }

    async getPost(id) {
        return await this.findOneById(id);
    }

    async createPost({title, body, author}) {
        return await this.model.create({ title, body, author })
    }
}