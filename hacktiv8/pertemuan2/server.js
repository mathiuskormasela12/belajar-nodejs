/*
	======= Belajar Express =======

	Express adalah sebuah framework 
	Node Js yang tidak beropini dan
	minimalis. 

	Express telah menyediakan kita 
	berbagai modules-modules untul
	mempercepat pekerjaan kita. 

	Express telah menyediakan routing,
	middleware dll. Contoh-contoh
	middleware itu JWT Web Token,
	session, logger dll.

	Middleware dapat digunakan untuk
	membuat session atau cookie dalam 
	login dan register.
*/
// import express dari node_modules
const express = require('express');
const app = express();

/*
	====== Belajar Middleware ======

	Midleware berfungsi untuk memanipulasi
	request dan response. urutan dalam 
	pembuatan middleware itu berpengaruh.

	rumus :
	app.use((request, response, next) => {
		statement
		next()
	})
*/
app.use((req, res, next) => {
	console.log('middleware pertama');
	next();
})

app.use((req, res, next) => {
	console.log('middleware kedua');
	next();
})

app.get('/', (req, res) => {
	res.send('hello');
});

app.get('/users/:name', (req, res) => {
	let name = req.params.name;
	name = name.split('').map((item, index) => {
		if(index === 0) return item.toUpperCase()
			return item;
	}).join('');

	res.send(`Hello ${name}`);
});

app.listen(5432, () => console.log('http://127.0.0.1:5432'));