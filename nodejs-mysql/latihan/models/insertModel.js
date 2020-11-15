const db = require('../models/db_config')

const insertData = (nis, nama, email, sendMsg) => {

	db.connect(err => {
		// if(err) throw new Error(err)
		
		if(nis.length != 5) {
			sendMsg('NIS terlalu pendek', true, 'warning')
			return false;
		}

		let sql = [`INSERT INTO siswa 
		             VALUES(null, '${nis}', '${nama}', '${email}')`,
								`SELECT * FROM siswa 
								 WHERE nisn='${nis}' OR email='${email}'`]
		
		db.query(sql[1], (err, result) => {
			if(result.length > 0) {
				sendMsg('Data sudah ada', true, 'danger')
				return false;
			} else {
				db.query(sql[0], (err, result) => {
					if(err)
						throw new Error(err)
					sendMsg('Berhasil', true, 'success')
					return true;
				})
			} 
		})
	})

}

module.exports = insertData;

