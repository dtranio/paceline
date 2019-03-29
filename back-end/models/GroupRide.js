const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const groupSchema = new Schema({
    _id: {
        type: ObjectId,
        auto: true
    },
    group_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    meetup_date: {
        type: String,
        required: true
    },
    meetup_spot: {
        type: String,
        required: true
    },
    attending: [{
        type: ObjectId,
        ref: "User"
    }],
    bike_route: {
        type: ObjectId,
        ref: "BikeRoute"
    },
    created_by: {
        type: ObjectId,
        ref: "User"
    }
});

const GroupRide = mongoose.model('GroupRide', groupSchema);

module.exports = GroupRide;