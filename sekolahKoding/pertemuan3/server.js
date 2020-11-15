const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Hello Express Js');
});

app.get('/users/:name', (req, res) => {
	// res.send(req.params);
	res.send(`Hello ${req.params.name}`);
});

app.listen(3000, () => console.log('Magic happen at http://localhost:3000'));