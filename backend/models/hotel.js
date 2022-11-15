const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    city :{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    cheapestPrice: {
        type: Number
    },
    distance:{
        type: String,
        required: true
    },
    photos: [String],
    rooms: [String],
    title: {
        type: String
    },
    desc:{
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Hotel', hotelSchema);