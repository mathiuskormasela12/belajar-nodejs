const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Hello Hacktiv8');
});

app.get('/users/:name', (req, res) => {
	res.send(`Welcome ${req.params.name}`);
});

app.get('/move', (req, res) => {
	// Untuk pindah halaman
	res.redirect('https://hacktiv8.com');
});

app.get('/download', (req, res) => {
	// Untuk membuka file dan mendownload
	res.sendFile('/home/mathius/Downloads/Immanuel.mp4');
})

app.listen(5432, () => console.log('Magic happen at http://127.0.0.1:5432'));

