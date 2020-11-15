const db = require('./')

const getData = (id, sendData) => {
	db.connect(err => {

		let sql = `SELECT * FROM siswa WHERE id = ${id}`

		db.query(sql, (err, result) => {
			sendData(result)
		})
	})
}

const updateData = (id, nama, nisn, foto, sendData) => {
	db.connect(err => {
		let sql = `UPDATE siswa
		           SET 
		           nama = '${nama}',
		           nisn = '${nisn}',
		           foto = '${foto}'
		           WHERE id = '${id}'
		          `
		db.query(sql, (err, result) => {
			if(err) {
				sendData('0 data failed to update', true, 'danger')
				return false
			}

			sendData(`${result.affectedRows} data has been updated`, true, 'success')
		})
	})
}

module.exports = {
	getData,
	updateData
}