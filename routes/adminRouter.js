const express = require('express');
const { getAllUsers, addAdmin, updateUser, deleteUser } = require('../controllers/adminController');
const adminAuth = require('../middelwares/adminAuth')

const router = express.Router();

router.route('/:id')
    .get(adminAuth, getAllUsers)
    .post(adminAuth, addAdmin)
    .put(adminAuth, updateUser)
    .delete(adminAuth, deleteUser);

module.exports = router;
