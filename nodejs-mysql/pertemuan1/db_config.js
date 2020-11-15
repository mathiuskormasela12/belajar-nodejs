const mysql = require('mysql');

const db = mysql.createConnection({
	host:"localhost",
	user: "root",
	password: ""
});

db.connect(err => {
	if(err) 
		throw new Error(err)
	console.log('Database has been conected')
})