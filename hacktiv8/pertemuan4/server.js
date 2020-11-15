const express = require('express');
const path = require('path');

const app = express();

// setup hbs
// __dirname berfungsi untuk mengambil alamat directory file ini
// Express views akan mengacu folder templates
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	res.render('index', {
		name: "Mathius Kormasela"
	});
})

app.get('/user/:nama', (req, res) => {
	res.render('index', {
		name: req.params.nama
	})
})

app.listen(5432, () => console.log('http://127.0.0.1:5432'));