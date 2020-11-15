// ===== Auth Controller
// import all modules
const bcrypt				= require('bcryptjs');
const Flasher				= require('../core/Flasher');

// import all models
const authModel			= require('../models/AuthModel');

exports.isLogin			= function(req, res, next) {
	if(!req.session.login && !req.cookies.login) 
		res.redirect('/login');
	else if(!req.session.login && req.cookies.login) {
		req.session.login = true;
		next();
	} else {
		next();
	}
}

exports.register = async function(req, res) {

	const {
		username,
		password,
		password2
	} = req.body;
	
	if(!username || !password || !password2) {
		Flasher.setFlash(req, 'warning', 'Form Kosong');
		return res.redirect('/register');	
	}

	if(password.match(/[A-Z]/g) === null || password.match(/[a-z]/g) === null || password.match(/\d/g) === null) {
		Flasher.setFlash(req, 'warning', 'Password harus terdiri dari huruf kapita, huruf kecil dan angka');
		return res.redirect('/register');
	}

	if(password.length < 5) {
		Flasher.setFlash(req, 'warning', 'Panjang password min 5 karakter');
		return res.redirect('/register');
	}

	if(password !== password2) {
		Flasher.setFlash(req, 'warning', 'Password tidak cocok');
		return res.redirect('/register');
	}

	authModel.register(username, password, (type, message, action) => {
		Flasher.setFlash(req, type, message);
		res.redirect(action);
	});

}

exports.login			= function(req, res) {
	
	const {
		username,
		password,
		remember
	}	= req.body;

	if(!username || !password) {
		Flasher.setFlash(req, 'warning', 'Form Kosong');
		return res.redirect('/login');
	}

	authModel.login(username, password, (type, message, action) => {
		if(remember && type === 'success') {
			res.cookie('login', Math.random().toString(), { maxAge: 120000 });
		} 

		if(type === 'success') {
			req.session.login = true;
			console.log('session')
		}
					console.log(type)
		Flasher.setFlash(req, type, message);
		res.redirect(action);
	});

}
