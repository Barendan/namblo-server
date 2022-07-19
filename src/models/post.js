import mongoose from 'mongoose';

export const Post = mongoose.model('Post', {
    title: String,
    body: String,
    author: String
})