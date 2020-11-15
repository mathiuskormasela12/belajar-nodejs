const fs = require('fs');

fs.appendFile('baru.txt', 'Hello Nodejs', err => {
	if(err) throw err;
	console.log('Saved');
})