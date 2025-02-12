const mongoose = require('mongoose');

const order_items = new mongoose.Schema({
    id: Number,
    product_id: Number,
    quantity: Number
});

module.exports = mongoose.model("order_items", order_items);