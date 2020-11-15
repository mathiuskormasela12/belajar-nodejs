const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql')

exports.register = (req, res) => {
	
	const db = mysql.createConnection({
		host: process.env.DATABASE_HOST,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		database: process.env.DATABASE
	});

	const { name, email, password, passwordConfirm } = req.body;

	db.query('SELECT email FROM users WHERE email = ?', [email], async (err, result) => {
		if(err) {
			console.log(err);
		}

		if( result.length > 0 ) {
			return res.render('register', { message: 'Email already in use', type: 'danger' });
		} else if( password !== passwordConfirm ) {
			return res.render('register', { message: 'Password does not match', type: 'danger' });
		}

		const hashed = await bcrypt.hash(password, 8);
		
		db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashed }, (err, result) => {
			if(err) {
				console.log(err);
				return res.render('register', { message: `${result.affectedRows} users can't be inserted`, type: 'danger' });
			} else {
				console.log(result);
				return res.render('register', { message: 'Users registered', type: 'success' });
			}
		})

	});

}