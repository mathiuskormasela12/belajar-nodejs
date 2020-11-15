// const http = require('http');

// const server = http.createServer((req, res) =>
// {
// 	res.end('Hello World');
// });

// server.listen(3000, () => console.log('Server running on port 3000'));

// Mengambil built in module
const http = require('http');
// Mengambil built in module
const fs = require('fs');

const server = http.createServer((req, res) => {

	res.writeHead(200, {'Content-Type': 'text/html'});
	fs.readFile('./index.html', null, (err, data) => {
		if(err) {
			res.writeHead(404);
			res.write('File Not Found')
		} else {
			res.write(data);
		}

		res.end();
	})
});

server.listen(3000, () => console.log('Magic happed at http://localhost:3000'));