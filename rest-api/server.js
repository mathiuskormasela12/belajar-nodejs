const express = require('express');
const cors = require('cors');

// init app
const app = express();

// setup cors
const whiteList = [
	'http://localhost:8081',
	'http://127.0.0.1:8081'
];

const corsOptions = {
	origin: function(origin, callback) {
		if( whiteList.indexOf(origin) !== -1 || !origin ) {
			callback(null, true);
		} else {
			callback(new Error('Not Allowed By Cors'))
		}
	}
}

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		"message": "Welcome to Rest Api"
	})
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Web Service running on http://localhost:${PORT}`));