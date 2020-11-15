const express = require('express');
const mysql = require('mysql');
const path = require('path');
const dotenv = require('dotenv');

const app = express();

dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE
})

db.connect(err => {
	if(err) {
		console.log(err);
	} else {
		console.log('Mysql has been connected')
	}
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
	// res.send('<h1>Hello</h1>')
	res.render('index')
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})