const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// setup form grabbing form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// setup static file
app.use(express.static('public'));

// setup storage for save the uploaded file from multer
const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function(req, file, cb) {
		cb(null, file.fieldname + Date.now() + path.extname(file.originalname));	
	}
});

// init upload
const upload = multer({
	storage: storage,
	limits: { fileSize: 3000000 },
	fileFilter: function(req, file, cb) {
		checkFileType(file, cb);
	}
}).single('img');

function checkFileType(file, cb) {

	// allowed extention
	const fileTypes = /jpeg|jpg|png/;

	// check ext
	const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
	// check mime
	const mimeType = fileTypes.test(file.mimetype);

	if( extname && mimeType ) {
		return cb(null, true);
	} else cb('Error: Images only!');
}


app.get('/', (req, res) => {
	
	res.render('index');

});

app.post('/upload', (req, res) => {
	upload(req, res, err => {
		if(err) {
			res.render('index', {
				msg: err
			})
		} else {
			res.render('index', { msg: 'success' })
		}
	})
})

app.listen(3000, () => {
	console.log('Magic happen at port 3000')
});