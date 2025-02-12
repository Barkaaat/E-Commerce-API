const mongoose = require('mongoose');

const orders = new mongoose.Schema({
    user_id: Number,
    order_id: Number,
    country: String,
    city: String,
    area: String,
    street_name: String,
    building: String
});

module.exports = mongoose.model("orders", orders);