const fs = require('fs');
const url = require('url');

function renderTemplate(template, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});

	fs.readFile(template, null, (err, data) => {
		if(err) {
			res.writeHead(404, {'Content-Type': 'text/html'});
			res.write('<h1>File Not Found</h1>');
		} else res.write(data);

		res.end();
	});
}

module.exports = {
	handleReq: (req, res) => {
		res.writeHead(200, {'Content-Type': 'text/html'});
		const path = url.parse(req.url).pathname;

		switch(path) {
			case '/' :
				renderTemplate('./template/index.html', res);
			break;
			case '/about' :
				renderTemplate('./template/about.html', res)
			break;
		}
	}
}