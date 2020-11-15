const db = require('./db_config')

db.connect(err => {
	if(err)
		throw new Error(err)

	let sql = "SELECT * FROM siswa"
	db.query(sql, (err, result) => {
		console.log(`ID \t Name \t Address`)
		result.forEach(item => {
			console.log(`${item.id} \t ${item.name} \t ${item.address}`)
		})
	})
})