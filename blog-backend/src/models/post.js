import mongoose from 'mongoose';

const { Schema } = mongoose;

const Comment = new Schema({
    createdAt: { type: Date, default: Date.now },
    username: String, 
    text: String
});
const PostSchema = new Schema({
    title: String,
    body: String,
    tags: [String],
    likesCount: { 
        type: Number,
        default: 0 ,
    },
    likes: { 
        type: [String],
        default: [],
    },
    liked: { 
        type: Boolean,
        default: false,
    },
    comments: { 
        type: [Comment],
        default: [],
    },
    hidden: Boolean,
    publishedDate : {
        type: Date,
        default: Date.now,
    },
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
});

const Post = mongoose.model('Post',PostSchema);
export default Post;

