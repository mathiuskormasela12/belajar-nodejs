// ========= SERVER.JS =========
const http = require('http');
const route = require('./route');

http
	.createServer(route.handleRequest)
	.listen(3000, () => console.log('Server running on http://localhost:3000'));