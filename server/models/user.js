import mongoose from 'mongoose';

export const User = mongoose.model('User', {
    username: {type: String, default: null},
    email: {type: String, unique: true},
    password: { type: String },
    token: String
})