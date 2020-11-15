const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mysql = require('mysql');

const app = express();

// setup dotevn
dotenv.config({ path: './.env' });

// setup database
const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});

db.connect(err => {
	if(err) {
		console.log(err);
	} else console.log('Database has been connected')
});

// setup port server
const port = process.env.PORT || 3000;

// setup for catch form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// setup template engine
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'hbs');

// setup static file
app.use(express.static('public'));

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(port, () => console.log(`Magic happen at http://127.0.0.1:${port}`));