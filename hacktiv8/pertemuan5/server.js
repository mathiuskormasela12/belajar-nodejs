const express = require('express')
const path = require('path')
const data = require('./data/data.json')
const bodyParser = require('body-parser')
const url = require('url')

const app = express();

// setup template engine
app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'hbs')

// setup body-parser
// setting untuk menggunakan bodyParser pada form
app.use(bodyParser.urlencoded({extended: false}))

// setting untuk menggunakan bodyParser untuk JSON
app.use(bodyParser.json());

// setup static file (Public)
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('index', {
		title: "Bukapedia",
		items: data
	});
})

app.get('/post', (req, res) => {
	res.render('post', {
		result: url.parse(req.url, true).query.nama2
	})
})

app.get('/detail/:id', (req, res) => {
	const detail = data.find(item => item.id === parseInt(req.params.id))
	console.log(detail)
	res.render('details', {
		detail: detail
	})
})

app.post('/post', (req, res) => {
	res.render('post', {
		title: "Bukapedia",
		result: req.body.nama
	})
})

app.listen(5432, () => console.log('Magic happen at http://127.0.0.1:5432'))