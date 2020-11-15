const handleRoutes = (app, express) => {
	const bodyParser = require('body-parser')

	// setup view engine
	app.set('views', 'templates')
	app.set('view engine', 'hbs')

	// setup bodyParser
	app.use(bodyParser.urlencoded({extended: false}))
	app.use(bodyParser.json())

	// setup file static
	app.use(express.static('public'))

	app.get('/', (req, res) => {
		res.render('index')
	})

	app.post('/add', (req, res) => {

		const addData = require('../models/insertModel')
		const nis = req.body.nis
		const nama = req.body.nama
		const email = req.body.email

		addData(nis, nama, email, function(msg, status, type) {
			res.render('index', { status, msg, type })
		})
	})
}

module.exports = handleRoutes;