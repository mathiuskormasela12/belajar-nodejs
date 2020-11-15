const express = require('express');
const session = require('express-session');
const cookie = require('cookie-parser');

const router = express.Router();

router.use(cookie());

router.use(session({
	secret: 'anonymous',
	resave: true,
	saveUninitialized: true
}));

router.get('/', (req, res) => {
	if(!req.session.login) {
		if( req.cookies.loginCookie ) {
			req.session.login = true;
			res.redirect('/');
		} else res.redirect('/login');
	} else {
		res.render('index', { session: req.session.login })
	};
});

router.get('/register', (req, res) => {
	res.render('register', { session: req.session.login });
});

router.get('/login', (req, res) => {
	res.render('login', { session: req.session.login });
})

module.exports = router;