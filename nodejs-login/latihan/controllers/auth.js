const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});

exports.logout = (req, res) => {
	req.session.login = false;
	res.cookie('loginCookie', '-', { expires: new Date() - 60000, maxAge: 0 });
	res.redirect('/login');
}

exports.login = (req, res) => {

	const { email, password, remember } = req.body;

	for( let x in req.body ) {
		if( !req.body[x] ) {
			return res.status(401).render('login', { message: 'Form must be filled', type: 'warning' });
		}
	}

	db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
		if(err) {
			console.log(err);
		} else if( result.length < 1 || !(await bcrypt.compare(password, result[0].password)) ) {
			return res.status(402).render('login', { message: 'Email or Password incorrect', type: 'warning' });
		}

		req.session.login = true;
		
		if( remember ) {
			res.cookie('loginCookie', Math.random().toString(), { expires: new Date() + 60000, maxAge: 60000 } );
		}

		res.redirect('/');
	});

}

exports.register = (req, res) => {
	
	const { email, name, password, passwordConfirm } = req.body;

	for(let x in req.body) {
		if( !req.body[x] ) {
			return res.render('register', { message: 'Form must be filled', type: 'danger' });
		}
	}

	db.query('SELECT email from users WHERE email = ?', [email], async (err, result) => {
		if(err) {
			console.log(err);
		} else if( result.length > 0 ) {
			return res.render('register', { message: 'email already in use', type: 'warning' });
		} else if( password !== passwordConfirm ) {
			return res.render('register', { message: 'Password do not match', type: 'warning' });
		}

		let hashed = await bcrypt.hash(password, 8);

		db.query('INSERT INTO users SET ?', { name, email, password: hashed }, (err, result) => {
			if(err) {
				console.log(err);
			} else {
				return res.render('register', { message: 'User has been registered', type: 'success' });
			}
		})
	});

}
