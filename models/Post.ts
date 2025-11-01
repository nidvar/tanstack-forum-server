import mongoose from 'mongoose';

import { CommentSchema } from '../models/Comment';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
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
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;