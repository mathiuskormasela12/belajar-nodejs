const http = require('http');

http
	.createServer((req, res) => {
		res.end('Hello NodeJs');
	})
	.listen(8000);

console.log('Magic happen at http://localhost:8000');