const mongoose = require('mongoose');

const users = new mongoose.Schema({
    id: Number,
    name: String,
    mail: String,
    pass: String,
    is_admin: {
        type: Boolean,
        default: false
    },
    is_verified: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Users', users);