// const http = require('http');

// const server = http.createServer((req, res) => {
// 	res.writeHead(200, {'Content-Type': 'text/html'});
// 	res.write('<h1>Hello World!</h1>');
// 	res.end();
// });

// server.listen(3000, () => console.log('Magic happen at http://localhost:3000'));

// const http = require('http');
// const fs = require('fs');

// const server = http.createServer((req, res) => {
// 	res.writeHead(200, {'Content-Type': 'text/html'});
// 	fs.readFile('./view/index.html', null, (error, data) => {
// 		if(error) {
// 			res.writeHead(404);
// 			res.write('<h1>File Not Found</h1>');
// 		} else {
// 			res.write(data);
// 		}

// 		res.end();
// 	});
// });

// server.listen(3000, () => console.log('Magic happen at http://localhost:3000'))

const http = require('http');
const route = require('./route');

http
	.createServer(route.handleReq)
	.listen(3000, () => console.log('Magic happen at http://localhost:3000'));