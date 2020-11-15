const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const data = require('./models/siswa.json')

const app = express()

// setup view engine
app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'hbs')

// setup public static file
app.use(express.static('public'))

// setup body-parser
// Untuk  form
app.use(bodyParser.urlencoded({extended: false}))
// untuk json
app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.render('index', { data })
})

app.post('/search', (req, res) => {
	const keyword = req.body.keyword;
	let result = [data.find(item => item.name.toLowerCase() === keyword.toLowerCase())]
	
	res.render('index', {
		data: function() {
			if(result[0]) return result 
			else return false
		},
		msg: "Not Found"
	})
})

app.get('/detail/:id', (req, res) => {
	const result = data.find(item => item.id === parseInt(req.params.id))
	res.render('detail', { result })
})



app.listen(3000, () => console.log('Magic happen at http://127.0.0.1:3000'))