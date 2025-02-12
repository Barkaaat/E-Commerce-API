const mongoose = require('mongoose');

const products = new mongoose.Schema({
    id: Number,
    name: String,
    category: String,
    price: Number,
    stock_quantity: Number,
});

module.exports = mongoose.model("Products", products);