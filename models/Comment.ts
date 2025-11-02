import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CommentSchema = new Schema({
    postId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
}, {timestamps: true});

export const Comment = mongoose.model('Comment', CommentSchema);