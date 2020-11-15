const http = require('http');
const fs = require('fs');

http
	.createServer((req, res) => {
		res.writeHead(200, {"Content-Type": "text/html"});
		fs.readFile('./index.html', (err, data) => {
			if(err) throw new Error(err);

			res.write(data);
			res.end();
		});
	})
	.listen(8000, () => console.log('Magic happen at http://localhost:8000'))