const http = require('http');
const url = require('url');
const fs = require('fs');

http
	.createServer((req, res) => {
		
		const path = url.parse(req.url, true);

		const link = 'https://www.petanikode.com/nodejs-url/?key=102';
		console.log('Protocol    :', url.parse(link).protocol);
		console.log('Hostname    :', url.parse(link).host);
		console.log('Path        :', url.parse(link).pathname);
		console.log('Params        :', url.parse(link).search);
		console.log('Object Path :', url.parse(link, true).query );
		console.log(path.pathname);
		console.log(req.url)
		console.log(req)

		fs.readFile('.' + path.pathname, (err, data) =>
		{
			if(err) {
				res.writeHead(404, {"Content-Type": "text/html"})
				res.write('<h1>404</h1>')
			} else {
				res.writeHead(200, {"Content-Type": "text/html"})
				res.write(data);
			}

			res.end();
		})
		
	})
	.listen(8000, () => console.log('Open http://localhost:8000'))