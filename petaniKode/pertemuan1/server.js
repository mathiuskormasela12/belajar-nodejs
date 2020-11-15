/*  
	Kode dibawah berfungsi untuk mengambil
	library http dari nodemodules. nodemodules
	adalah directory penyimpanan nodejs.
*/
const http = require('http');

/*
	Untuk membuat object server yang akan
	meresponse ke client dengan text
	'Hi, selamat datang di node js'
*/
const server = http.createServer((req,res) => {
	// Untuk menentukan type response nya ke client menjadi html
	res.writeHead(200, {'Content-Type': 'text/html'});
	// res.end('Hi, selamat datang di node js');

	// Untuk mengirimkan response body atau content ke client
	res.write('Hello <b>World</b>!');

	// Untuk mengakhiri responsenya
	res.end();
});

// Untuk menentukan nomor port di server yg ingin kita gunakan
server.listen(8000);
console.log('Magic happen at http://localhost:8000');