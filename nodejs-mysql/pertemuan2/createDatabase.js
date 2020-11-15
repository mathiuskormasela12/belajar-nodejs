const db = require('./db_config')

// Ketika ingin menggunakan query sql kita wajib melakukan connection terlebih dahulu
db.connect(err => {
	if(err)
		throw new Error(err)

	let sql = "CREATE DATABASE kopi CHARACTER SET utf8 COLLATE utf8_general_ci"
	db.query(sql, (err, result) => {
		if(err)
			throw new Error(err);
		console.log('Database has been created')
	})
})