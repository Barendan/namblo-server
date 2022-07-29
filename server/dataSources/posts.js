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

    async updatePost({ id, title, body, author }) {
        return await this.model.findByIdAndUpdate(id, { title, body, author }, { new: true, overwrite: false })
    }
}