const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    user: {
        type: String,
        ref: 'User',
        required: true
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    room: [Number],
    dateStart: {
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date
    },
    price: {
        type: Number,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);