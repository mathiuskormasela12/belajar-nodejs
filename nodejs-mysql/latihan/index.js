const express = require('express');
const app = express()
const handleRoutes = require('./controllers/main')(app, express)
// const path = require('path')
// const bodyParser = require('body-parser')

// // setup view engine
// app.set('views', 'templates')
// app.set('view engine', 'hbs')

// // setup bodyParser
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

// // setup file static
// app.use(express.static('public'))

// app.get('/', (req, res) => {
// 	res.render('index')
// })

app.listen(3000, () => console.log('Magic happen at http://127.0.0.1:3000'))


