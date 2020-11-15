const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');

const app = express();

dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 3000;

// setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// setup static file
app.use(express.static('./public'));

// setup form use req.body to grab data from submited form
app.use(express.urlencoded({ extended: false }));
// setup for grab data as JSON for API
app.use(express.json());

const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME
})

db.connect(err => {
	if(err) {
		console.log(err);
	} else {
		console.log('Database has been connected');
	}
});

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});