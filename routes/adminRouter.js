const express = require('express');
const { getAllUsers, addAdmin, deleteUser } = require('../controllers/adminController');

const router = express.Router();

router.get('/', getAllUsers);
router.put('/:id', addAdmin);
router.delete('/:id', deleteUser);


module.exports = router;
