import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReplySchema = new Schema({
    reply: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
}, {timestamps: true});

const Reply = mongoose.model('Reply', ReplySchema);

export default Reply;