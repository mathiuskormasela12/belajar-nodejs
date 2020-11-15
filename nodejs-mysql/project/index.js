const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()

// setup bodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// setup view engine
app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'hbs')

// setup static file
app.use(express.static('public'))

routes.handleHome(app);
routes.handleDelete(app)
routes.handleUpdate(app)
routes.handleGetData(app)

app.listen(3000, () => console.log('Magic happen at http://127.0.0.1:3000'))