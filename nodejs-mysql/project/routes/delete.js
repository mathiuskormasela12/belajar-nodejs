const deleteData = app => {

	app.get('/delete/:id', (req, res) => {
		const id = req.params.id
		const modelDelete = require('../models/deleteModel')
		const showData = require('../models/showDataModel')
		modelDelete(id, (msgAddData, condAddData, typeAddData, lengthAddData) => {
			showData((...data) => {
				res.render('index', { msgAddData, condAddData, typeAddData, lengthAddData, data: data.pop() })
			})
			
		})
	})

}

module.exports = deleteData;