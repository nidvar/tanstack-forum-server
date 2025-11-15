import mongoose from 'mongoose';

import { CommentSchema } from '../models/Comment';

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            required: true,
        },
    },
    img: {
        url: {
            type: String,
        },
        public_id: {
            type: String,
        },
    },
    tags: {
        type: [String],
        default: []
    },
    comments: {
        type: [CommentSchema],
        default: []
    },
    likes: {
        type: [String]
    },
    dislikes: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

const News = mongoose.model('News', NewsSchema);

export default News;