// ===== Pages
// import all modules
const express					= require('express');
const session					= require('express-session');
const cookie					= require('cookie-parser');
const Flasher					= require('../core/Flasher');
const authController	= require('../controllers/authController');
const studentModel		= require('../models/UserModel');

// init router
const	router					= express.Router();
const secret					= process.env.SECRET;

// setup session
router.use(session({
	secret,
	resave: true,
	saveUninitialized: true,
}));

// setup cookie
router.use(cookie());

router.get('/login', (req, res) => {
	res.status(200).render('login', {
		type: req.session.type,
		message: req.session.message
	})
	Flasher.removeFlash(req);
});

router.get('/', authController.isLogin);
router.get('/', (req, res) => {
	studentModel.getAllStudents((type, message, results) => {
		res.status(200).render('index', { results, type: req.session.type, message: req.session.message });
		Flasher.removeFlash(req);
	});
});

router.get('/register', authController.isLogin);
router.get('/register', (req, res) => {
	res.status(200).render('register', {
		type: req.session.type,
		message: req.session.message
	});
	Flasher.removeFlash(req);
});

router.get('/add', authController.isLogin);
router.get('/add', (req, res) => {
	res.status(200).render('add', {
		type: req.session.type,
		message: req.session.message
	});
	Flasher.removeFlash(req);
});

router.get('/edit/:id', authController.isLogin);
router.get('/edit/:id', (req, res) => {
	studentModel.getStudentById(req.params.id, (type, message, results) => {
		console.log(results)
		res.status(200).render('edit', { type: req.session.type, message: req.session.message, results });
		Flasher.removeFlash(req);
	});
});

module.exports = router;

