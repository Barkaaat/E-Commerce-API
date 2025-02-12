const mongoose = require('mongoose');

const cart = new mongoose.Schema({
    user_id: Number,
    product_id: Number,
    quantity: Number
});

module.exports = mongoose.model("cart", cart);