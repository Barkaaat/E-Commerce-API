const express = require('express');
const adminAuth = require('../middelwares/adminAuth');
const { getProduct, addProduct, deleteProduct } = require('../controllers/productController');


const router = express.Router();

router.get('/', getProduct);
router.post('/', adminAuth, addProduct);
router.delete('/:produtId', adminAuth, deleteProduct);

module.exports = router;