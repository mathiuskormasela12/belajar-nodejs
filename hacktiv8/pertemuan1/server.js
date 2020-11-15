const http = require('http');

const handleServer = (request, response) => {
	response.writeHead(200, {
		"Content-Type": "application/json"
	});

	response.end(`{"name": "Mathius"}`);
}

http.createServer(handleServer).listen(5432, '127.0.0.1');
console.log('Magic happen at http://127.0.0.1:5432');