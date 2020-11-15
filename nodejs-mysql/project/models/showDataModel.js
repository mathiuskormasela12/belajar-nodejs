const db = require('./')
const showAllSiswa = sendData => {

	db.connect(err => {

		let sql = "SELECT * FROM siswa ORDER BY nama"
		db.query(sql, (err, result) => {
			if(result.length > 0)
			{
				sendData(null, true, null ,result)
				return true
			} else {
				sendData('Data Kosong!', true, null ,false)
			}
		})

	})

}

module.exports = showAllSiswa