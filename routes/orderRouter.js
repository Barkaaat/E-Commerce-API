const express = require('express');
const { createOrder, getOrders, deleteOrder, checkoutOrder } = require('../controllers/orderController');
const checkUser = require('../middelwares/checkUser');

const router = express.Router();

router.get('/', checkUser, getOrders);
router.post('/', checkUser, createOrder);
router.delete('/', checkUser, deleteOrder);

// TO DO WITH PAYMENT METHODE
router.get('/checkout', checkUser, checkoutOrder);

module.exports = router;