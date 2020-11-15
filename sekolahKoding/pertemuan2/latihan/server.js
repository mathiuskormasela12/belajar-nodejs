// const http = require('http');

// const server = http.createServer((req, res) => {
// 	res.writeHead(200, {'Content-Type': 'text/html'});
// 	res.write('<h1>Hello Node Js</h1>');
// 	res.end();
// });

// server
// 	.listen(8000, () => console.log('Magic happen at http://localhost:8000'));

// const http = require('http');
// const fs = require('fs');

// const server = http.createServer((req, res) => {
// 	res.writeHead(200, {'Content-Type':'text/html'});
// 	fs.readFile('./templates/index.html', null, (error, data) => {
// 		if(error) {
// 			res.writeHead(404, {'Content-Type': 'text/html'});
// 			res.write('File Not Found');
// 		} else res.write(data);

// 		res.end();
// 	});
// });

// server
//  .listen(8000, () => console.log('on port 800'))

const http = require('http');
const routes = require('./routes');

http
	.createServer(routes.handleReq)
	.listen(8000, 'Please open http://localhost:8000');