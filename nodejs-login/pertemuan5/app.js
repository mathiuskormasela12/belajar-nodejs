const express = require('express');
const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');

const app = express();

// setup dotenv
dotenv.config({ path: './.env' });

// setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// setup static files
app.use(express.static('public'));

// setup to grab data from form
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// setup database
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
})

// setup port
const port = process.env.PORT || 3000;

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(port, () => console.log(`Magic happen at ${port}`));
