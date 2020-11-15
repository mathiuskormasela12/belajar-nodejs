const db = require('./')

const getSearchData = (keyword, sendData) => {
	db.connect(err => {
		let sql = `SELECT *
							 FROM siswa
							 WHERE nama
							 LIKE '%${keyword}%'
							 OR
							 nisn
							 LIKE '%${keyword}%'
							`;
		db.query(sql, (err, result) => {
			if(err) {
				sendData(`${keyword} failed to search`)
				return false
			}

			else if(result.length < 1) {
				sendData(`Sorry ${keyword} not found`)
				return false	
			}

			sendData(null, true, result)
		})
	})
}

module.exports = getSearchData