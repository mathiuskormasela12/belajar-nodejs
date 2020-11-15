const express = require('express');
const session = require('express-session');

const authController = require('../controllers/auth');

const router = express.Router();

router.use(session({
	secret: 'anonymous',
	resave: true,
	saveUninitialized: true
}));

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;