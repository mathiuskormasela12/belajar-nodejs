const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');

const app = express();

// setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// setup for grabbing data from the form
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// setup static file
app.use(express.static('public'));

// setup for file upload
app.use(fileUpload({
	createParentPath: true
}));

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/upload', async (req, res) => {

	try {
		if( !req.files ) {

			res.render('index', { msg: 'No file uploaded' });

		} else {

			let avatar = req.files.img;
			
			let mime = /png|jpg|jpeg/gi.test(avatar.mimetype);
			let ext = /png|jpeg|jpg/gi.test(avatar.name);

			if( !mime && !ext )
			{

				console.log(avatar.mimetype);
				res.render('index', { msg: 'bukan img' });

			} else {

				if( avatar.size > 3000000 ) {

					res.render('index', { msg: 'ukuran terlalu besar' });

				} else {

					let extFile = avatar.name.split('.')[1];
					let fileName = avatar.name.split('.')[0];
					fileName += '-';
					fileName += Date.now()
					fileName += '.';
					fileName += extFile;

					avatar.mv('./public/uploads/' + fileName);
					res.render('index', { msg: 'success' });

				}
			}

		}
	} catch(err) {
		res.status(500).render('index', { msg: 'Server error' });
	}

})

app.listen(3000, () => console.log('Magic happen at port 3000'));