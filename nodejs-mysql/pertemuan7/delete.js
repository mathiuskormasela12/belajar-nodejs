const db = require('./db_config')

db.connect(err => {
	if(err)
		throw new Error(err)

	let sql = "DELETE FROM siswa WHERE id = 1"
	db.query(sql, (err, result) => {
		console.log(`${result.affectedRows} data has been deleted`)
	})
})