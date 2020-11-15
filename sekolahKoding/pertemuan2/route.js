// ========= ROUTES.JS =========
const fs  = require('fs');
const url = require('url');

function renderFile(fileName, res)
{
	res.writeHead(200, {'Content-Type': 'text/html'});

	fs.readFile(fileName, null, (err, data) => {
		if(err) {
			res.writeHead(404);
			res.write('File Not Found');
		} else {
			res.write(data);
		}

		res.end();
	});
}

module.exports = {
	handleRequest: (req, res) => {
		res.writeHead(200, {'Content-Type': 'text/html'});
		const path = url.parse(req.url).pathname;

		switch(path) {
			case '/' :
				renderFile('./view/index.html', res);
			break;
			case '/user' :
			 renderFile('./view/user.html', res);
			break;
		}
	}
}