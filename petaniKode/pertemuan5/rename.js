const fs = require('fs');

fs.rename('news.txt', 'kabar.txt', err => {
	if(err) throw err;
	console.log('renamed');
})