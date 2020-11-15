const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE
});

exports.logout = (req, res) => {
	req.session.login = false;
	res.redirect('/login');
}

exports.login = (req, res) => {

	const { email, password } = req.body;

	if( !email || !password ) {
		return res.status(401).render('login', { message: 'Form must be filled', type: 'danger' });
	}

	db.query('SELECT * from users WHERE email = ?', [email], async (err, result) => {
		if( err ) {
			console.log(err);
		} else if( result.length < 1 || !(await bcrypt.compare(password, result[0].password)) ) {
			return res.status(402).render('login', { message: 'Email or Password incorrect', type: 'warning' });
		}

		req.session.login = true;
		const random = Math.random().toString();
		res.cookie('loginCookie', random, { expires: new Date() + 60000, maxAge: 60000 });
		return res.status(200).redirect('/');

	});

}

exports.register = (req, res) => {

	const { name, email, password, passwordConfirm } = req.body;

	for( let x in req.body ) {
		if( !req.body[x] ) {
			return res.render('register', { message: 'Form cannot be empty', type: 'warning' });
		}
	}

	db.query('SELECT email from users WHERE email = ?', [email], async (err, result) => {
		if(err) {
			console.log(err);
		} else if(result.length > 0) {
			return res.render('register', { message: 'Email already in use', type: 'warning' });
		} else if( password !== passwordConfirm ) {
			return res.render('register', { message: 'Password do not match', type: 'warning' });
		}

		let hashed = await bcrypt.hash(password, 8);
		
		db.query('INSERT INTO users SET ?', { name, email, password: hashed }, (err, result) => {
			if(err) {
				console.log(err);
			} else {
				return res.render('register', { message: 'User has been added', type: 'success' });
			}
		})

	})

}