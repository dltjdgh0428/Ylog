import mongoose from 'mongoose';

const { Schema } = mongoose;

const FollowSchema = new Schema({
    Followers: String,
    FollowedDate : {
        type: Date,
        default: Date.now,
    },
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
});

const Follow = mongoose.model('Follow',FollowSchema);
export default Follow;