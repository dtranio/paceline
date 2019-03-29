const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const routeSchema = new Schema({
    _id: {
        type: ObjectId,
        auto: true
    },
    route_name: {
        type: String,
        required: true
    },
    route_pic_url: {
        type: String,
        required: true
    },
    route_gallery_url: {
        type: String,
        required: true
    },
    route_gallery_url2: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    center: {
        type: {
            lat: {
                type: Number,
                required: true
            },
            lng: {
                type: Number,
                required: true
            }
        }
    },
    bike_type: {
        type: String,
        required: true
    },
    route_description:{
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
});

const GroupRide = mongoose.model('BikeRoute', routeSchema);

module.exports = GroupRide;