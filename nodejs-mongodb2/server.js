// === import all modules
const express 		= require('express');
const mongoose		= require('mongoose');
const upload			= require('express-fileupload');

// define default setting
const app 				= express();
const router			= express.Router();
const port				= process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(upload({
	createParentPath: true
}))

// setting database
mongoose.connect("mongodb://localhost/apiusers", { useNewUrlParser: true, useUnifiedTopology: true});
const User			= require('./models/User');

router
	.route('/user')
		.post((req, res) => {
			const user = new User();
			user.nama = req.body.nama;
			user.password = req.body.password;
			console.log(req.body)
			user.save(err => {
				if(err)
					console.log(err);
				else {
					res.json({
						message: 'berhasil'
					})
				}
			})
		})
		.get((req, res) => {
			User.find({$or: [{ nama: "Mathius"},{ nama: "Matt"}]}, { _id: 0, __v:0}).exec((err, result) => {
				if(err) console.log(err)
				res.json(result)
			})
		})
app.use('/api', router);

app.listen(port);
console.log('http://127.0.0.1:' + port);



