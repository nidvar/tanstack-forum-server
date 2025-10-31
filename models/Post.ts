import mongoose from 'mongoose';

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
    tags: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
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