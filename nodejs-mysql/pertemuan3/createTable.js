const db = require('./db_config')

db.connect(err => {
	if(err)
		throw new Error(err)

	let sql = `CREATE TABLE siswa(
		id int(2) NOT NULL AUTO_INCREMENT PRIMARY KEY,
		name varchar(255) NOT NULL,
		address text
	);`;
	db.query(sql, (err, result) => {
		if(err)
			throw new Error(err)

		console.log('Table siswa has been created')
	})
})