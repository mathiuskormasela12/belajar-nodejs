const fs = require('fs');

fs.open('news.txt', 'w', err => {
	if(err) throw err;
	console.log('saved');
});


fs.writeFile('news.txt', 'Hello World', err => {
	if(err) throw err;
	console.log('written');
})

fs.readFile('news.txt', (err, data) =>{
	if(err) throw err;
	console.log(data.toString('utf8'));
})