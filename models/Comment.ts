import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    replies: {
        type: [String],
        default: []
    },
}, {timestamps: true});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;