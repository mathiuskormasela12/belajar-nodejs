// ==== import all modules
const express		= require('express');
const cors			= require('cors');
const mongoose	= require('mongoose');

// init app
const app				= express();
const router		= express.Router();
const port			= process.env.PORT || 3000;
const User			= require('./models/User');

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/belajarmongoose', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
	if(err)
		console.log(err);
	else
		console.log('Database connected');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const whiteList	= [
	'http://127.0.0.1:5000'
];

const corsOptions = {
	origin: function(origin, callback) {
		if(whiteList.indexOf(origin) !== -1 || !origin) 
			callback(null, true)
		else
			callback(new Error('Blocked by cors'))
	}
};

app.use(cors(corsOptions));

router
	.route('/users')
		.post(async (req, res) => {
			const { nama, usia } = req.body;
			const user = new User({ nama, usia });
			
			try {
				const result = await User.find({ nama });
				if(result.length > 0) {
					return res.json({ message: 'udh ada jgn ditambah'})
				} else {
					try {
						const result = await user.save();
						res.json({ message: 'User berhasil ditambahkan'})					
					} catch(err) {
						console.log(err);
						res.json({ message: 'server error'})
					}
				}
			} catch(err) {
				console.log(err);
				res.json({ message: 'Server Error'})
			}

		})
		.get(async (req, res) => {
		
			try {
				const result = await User.find({}, { _id: 0, __v: 0});
				res.json(result)
			} catch(err) {
					console.log(err);
					res.json({
						message: 'Server Error'
					});
			}

		});

		router.route('/users/:nama').put((req, res) => {
				
					User.updateOne({ nama: req.body.nama }, { $set: { usia: req.body.usia}}).exec((err, result) => {
						if(err) 
							return console.log(err);
						res.json({
							message: 'berhasil di update',
							result
						})
					});
			
		})
		.delete(async(req, res) => {
			try {
				const result = await User.deleteOne({ nama: req.params.nama });
				res.json({ message: 'terhapus', nama: req.params.nama, result})
			} catch(err) {
				console.log(err);
			}
		});

app.use('/api', router);

app.listen(port);
console.log(`http://127.0.0.1:${port}/api`);

