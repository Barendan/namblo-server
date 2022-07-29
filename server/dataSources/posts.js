import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class Posts extends MongoDataSource {
    async getPosts() {
        return await this.model.find();
    }

    async getPost(id) {
        return await this.model.findById(id);
    }

    async createPost({title, body, author}) {
        return await this.model.create({ title, body, author });
    }

    async deletePost(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async updatePost(payload) {
        console.log('here is payload', payload.id, payload.body )
        return await this.model.findByIdAndUpdate(payload.id, { title: payload.title, body: payload.body, author: payload.author })
    }
}