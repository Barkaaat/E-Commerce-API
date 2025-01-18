const express = require('express');
const { register, verify, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.get('/verify/:token', verify);
router.get('/login', login);

module.exports = router;
