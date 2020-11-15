// const http = require('http');

// http
// 	.createServer((req, res) => {
// 		// Untuk menentukan type responsenya
// 		// defaultnya itu text/plain
// 		// selain text/html bisa juga
// 		// application/json
// 		// application/pdf
// 		// application/xml
// 		res.writeHead(200, {'Content-Type': 'application/json'});
// 		res.write('{"msg": "Hello World!"}');
// 		// res.write('hello')
// 		res.end();
// 	})
// 	.listen(8000, () => console.log('magic happen at http://localhost:8000'));

// const http = require('http');

// http
// 	.createServer((req, res) => {
// 		res.writeHead(200, {"Content-Type": "text/html"});

// 		switch(req.url) {
// 			case '/' :
// 				res.write('<h1>Halaman Root</h1>');
// 			break;
// 			case '/about' :
// 				res.write('<h1>Halaman About</h1>');
// 			break;
// 			default :
// 				res.write('<h1>File Not Found</h1>');
// 		}

// 		res.end();
// 	})
// 	.listen(8000);

const http = require('http');
const url = require('url');

http
	.createServer((req, res) => {
		res.writeHead(200, {"Content-Type": "text/html"})
		const q = url.parse(req.url, true).query;
		const txt = 'Mencari ' + (q.keyword || '-');
		res.write(txt);
		res.end();
	})
	.listen(8000);