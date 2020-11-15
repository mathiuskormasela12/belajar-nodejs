// ===== App
// import all modules
const express			= require('express');
const dotenv			= require('dotenv');
const path				= require('path');
const mongoose		= require('mongoose');

// setupdotenv
dotenv.config({ path: '.env'});

// init app & port
const app					= express();
const port				= process.env.PORT || 3000;

// setup database
mongoose.connect('mongodb://127.0.0.1:27017/node-mongoose', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
	if(err)
		console.log(err);
	else
		console.log('Database has been connected');
})

// setup urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup static files
app.use(express.static(path.join(__dirname, './public')));

// setup template enginee
app.set('views', path.join(__dirname, './app/templates'));
app.set('view engine', 'hbs');

app.use('/', require('./app/routes/pages'));
app.use('/', require('./app/routes/system'));

app.listen(port, () => console.log(`Application running at http://127.0.0.1:${port}`));
