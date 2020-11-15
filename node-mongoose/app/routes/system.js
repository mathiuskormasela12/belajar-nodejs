// ===== System
// import all modules
const express					= require('express');
const upload					= require('express-fileupload');

// import all controllers
const authController	= require('../controllers/authController');
const appController		= require('../controllers/appController');

// init router
const router					= express.Router();

// setup upload
router.use(upload({
	createParentPath: true
}));

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/add', appController.add);
router.get('/hapus/:id', appController.delete);
router.post('/edit', appController.edit);

module.exports				= router;
