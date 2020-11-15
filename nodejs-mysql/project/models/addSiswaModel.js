const db = require('./')

const addSiswaModel = (nama, nisn, foto, sendMsg) => {

	db.connect(err => {

		let sql = `SELECT * FROM siswa WHERE nisn = '${nisn}' OR foto = '${foto}'`;
		db.query(sql, (err, result) => {

			if(result.length > 0) {
				sendMsg('Data tersebut sudah ada !', true, 'warning', result.length)
				return false
			}

			sql = `INSERT INTO siswa(nama, nisn, foto) 
			       VALUES('${nama}', '${nisn}', '${foto}')`;
			db.query(sql, (err, result) => {
				sendMsg('Data berhasil ditambahkan', true, 'success', result.affectedRows)
				return true
			})

		})
		
	})

}

module.exports = addSiswaModel;