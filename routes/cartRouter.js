const express = require('express');
const checkUser = require('../middelwares/checkUser');
const { cartItems, addToCart, deleteFromCart } = require('../controllers/cartController');


const router = express.Router();

router.get('/', checkUser, cartItems);
router.post('/', checkUser, addToCart);
router.delete('/', checkUser, deleteFromCart);

module.exports = router;