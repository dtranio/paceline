const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    _id: {
        type: ObjectId,
        auto: true
    },
    first_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    interests: {
        type: String,
        required: true
    },
    bike_owned: {
        type: String,
        required: true
    },
    profile_pic_list_url: {
        type: String
    },
    profile_pic_url: {
        type: String
    },
    joined_groups: [{
        type: ObjectId,
        ref: "GroupRide"
    }],
    friends: [{
        type: ObjectId,
        ref: "User"
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;