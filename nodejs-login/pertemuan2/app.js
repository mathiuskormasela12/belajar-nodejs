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

app.get('/', (req, res) => {
	// res.send('<h1>Hello</h1>');
	res.render('index');
});

app.get('/register', (req, res) => {
	res.render('register');
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});