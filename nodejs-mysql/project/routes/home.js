const handleHome = app => {

	app.get('/', (req, res) => {

		const modelShowAllSiswa = require('../models/showDataModel')

		modelShowAllSiswa((msg, cond, type, data) => {
			res.render('index', { msg, cond, type, data })
		})

	})

	app.post('/add', (req, res) => {

		const nama = req.body.namaSiswa;
		const nisn = req.body.nisn;
		const foto = req.body.fotoSiswa;
		const addSiswaModel = require('../models/addSiswaModel')

		addSiswaModel(nama, nisn, foto, (msgAddData, condAddData, typeAddData, lengthData) => {
			const showAllData = require('../models/showDataModel')
			showAllData((...data) => {
				res.render('index', { msgAddData, condAddData, typeAddData, lengthData, data: data.pop() })
			})
		})


	})

	app.post('/search', (req, res) => {
		const keyword = req.body.keyword
		const modelSearchData = require('../models/searchModel')
		modelSearchData(keyword, (msg, cond, data) => {
			res.render('index', {
				condSearch: cond,
				data,
				msg: msg
			})
		})
	})
	
}

module.exports = handleHome;