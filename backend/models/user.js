const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    email: {
        type: String
    },
    isAdmin: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);