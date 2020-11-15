const db = require('./db_config')

db.connect(err => {
	if(err)
		throw new Error(err)

	let sql = `UPDATE siswa
						 SET address = 'Jl. wkwkw'
						 WHERE id = 1
						`
	db.query(sql, (err, result) => {
		if(err)
			throw new Error(err)
		console.log(`${result.affectedRows} line has been updated`)
	})
})