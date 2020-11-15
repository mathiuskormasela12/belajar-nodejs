const getData = app => {
	app.get('/getdata/:id', (req, res) => {
		const id = req.params.id
		const modelUpdate = require('../models/updateModel')
		modelUpdate.getData(id, (result) => {
			res.send(result[0])
		})
	})
}

const updateData = app => {
	app.post('/update', (req, res) => {
		const modelUpdate = require('../models/updateModel')
		const allData = require('../models/showDataModel')
		const id = req.body.id
		const nama = req.body.namaSiswa
		const nisn = req.body.nisn
		const foto = req.body.fotoSiswa
		modelUpdate.updateData(id, nama, nisn, foto, (msg, cond, type) => {
			allData((...data) => {
				res.render('index', {
					msgAddData:msg,
					condAddData: cond,
					typeAddData: type,
					data: data.pop()
				})
			})
		})
	})
}

module.exports = {
	getData,
	updateData
}