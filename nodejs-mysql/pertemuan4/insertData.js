const db = require('./db_config')

db.connect(err => {
	if(err)
		throw new Error(err)

	// let sql = "INSERT INTO siswa VALUES(null, 'Mathius', 'Jl.Annur')"
	const sql = "INSERT INTO siswa VALUES ?"
	const values = [
		[null, "Ammmar Abdulah", "Jl. Pendongkelan"],
		[null, "Kamal Bacrur", "Jl. Buah"],
		[null, "Edo Yudha", "Jl. Caur"]
	]

	db.query(sql, [values], (err, result) => {
		if(err)
			throw new Error(err)
		console.log(`${result.affectedRows} data has been created`)
	})
})