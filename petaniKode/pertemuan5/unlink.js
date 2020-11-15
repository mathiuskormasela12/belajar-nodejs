const fs = require('fs');

fs.unlink('baru.txt', err => {
	if(err) throw err;
	console.log('deleted');
})