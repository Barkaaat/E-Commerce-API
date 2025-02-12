const express = require('express');
const { cartItems, addToCart, deleteFromCart } = require('../controllers/cartController');


const router = express.Router();

router.get('/', cartItems);
router.post('/', addToCart);
router.delete('/', deleteFromCart);

module.exports = router;