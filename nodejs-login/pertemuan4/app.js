const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');

const app = express();

// setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// setup static file
app.use(express.static('public'));

// setup for grab data from form
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// setup dotenv for hide sensitive information
dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE
});

db.connect(err => {
	if(err) {
		console.log(err);
	} else {
		console.log('Database has been connected');
	}
});

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(PORT, () => console.log(`Magic happen at http://127.0.0.1:${PORT}`));
