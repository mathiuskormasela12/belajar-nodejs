// ===== App Controller
// import all modules
const fs							= require('fs');
const Flasher					= require('../core/Flasher');

// import all models
const	userModel				= require('../models/UserModel');

exports.add						= async function(req, res) {

	const {
		full_name,
		nisn,
		ttl,
		kelas,
		jurusan
	} = req.body;

	if(!full_name || !nisn || !kelas || !ttl || !jurusan) {
		Flasher.setFlash(req, 'warning', 'Form Kosong');
		return res.redirect('/add');
	} 

	if(nisn.length > 5 || nisn.length < 5) {
		Flasher.setFlash(req, 'warning', 'NISN harus 5 karakter');
		return res.redirect('/add');
	}

	const foto = await upload(req, res);
	
	if(foto.type !== 'success') {
		Flasher.setFlash(req, foto.type, foto.message);
		return res.redirect(foto.action);
	}

	userModel.add(full_name, nisn, ttl, kelas, jurusan, foto.message, (type, message, action) => {
		if(type !== 'success' && req.files) {
			fs.unlink(`./public/uploads/${foto.message}`, err => {
				if(err)
					console.log(err);
			});
		}
		console.log(type)
		Flasher.setFlash(req, type, message);
		res.redirect(action);
	});

}

exports.edit			= async function(req, res) {
	const {
		id,
		full_name,
		nisn,
		ttl,
		kelas,
		jurusan,
		foto_lama
	} = req.body;

	if(!id || !full_name || !nisn || !ttl || !kelas || !jurusan || !foto_lama) {
		Flasher.setFlash(req, 'warning', 'Form Kosong');
		return res.redirect('/edit/' + id);
	}
	
	let foto = { message: foto_lama };

	if(req.files) {
		foto = await upload2(req, res);
		if(foto.type !== 'success') {
			Flasher.setFlash(req, foto.type, foto.message);
			return res.redirect('/edit/' + id);
		}
	}

	userModel.editStudent(id, full_name, nisn, ttl, kelas, jurusan, foto.message, (type, message, action) => {
		if(req.files && type === 'success') {
			fs.unlink(`./public/uploads/${foto_lama}`, err => {
				if(err)
					console.log(err);
			})
		}

		Flasher.setFlash(req, type, message);
		res.redirect(action);
	});

}

exports.delete	= function(req, res) {
	const id = req.params.id;

	userModel.removeStudent(id, (type, message, action, foto) => {

		if(type === 'success') {
			fs.unlink(`./public/uploads/${foto}`, err => {
				if(err)
					console.log(err);
			})
		}

		Flasher.setFlash(req, type, message);
		res.redirect(action);
	})
}

function upload(req, res) {
	if(!req.files) {
		return {
			status: 200,
			type: 'warning',
			message: 'Wajib upload foto',
			action: '/add'
		}
	}

	const photo						= req.files.foto;
	
	const extValid				= /JPG|JPEG|PNG/gi;
	const checkMimeType		= extValid.test(photo.mimetype);
	const checkExtension	= extValid.test(photo.name);

	// check file type
	if(!checkMimeType && !checkExtension) {
		return {
			status: 200,
			type: 'warning',
			message: 'yg anda upload bukan gambar',
			action: '/add'
		}
	}

	if(photo.size > 3000000) {
		return {
			status: 200,
			type: 'warning',
			message: 'foto maksimal 3mb',
			action: '/add'
		}
	}

	let foto	= photo.name.split('.')[0];
	foto 			+= '-';
	foto 			+= Date.now();
	foto 			+= photo.name.split('.')[1].toLowerCase();

	photo.mv('./public/uploads/' + foto);
	return {
		type: 'success',
		message: foto
	}
}

function upload2(req, res) {

	const photo						= req.files.foto;
	
	const extValid				= /JPG|JPEG|PNG/gi;
	const checkMimeType		= extValid.test(photo.mimetype);
	const checkExtension	= extValid.test(photo.name);

	// check file type
	if(!checkMimeType && !checkExtension) {
		return {
			status: 200,
			type: 'warning',
			message: 'yg anda upload bukan gambar',
			action: '/add'
		}
	}

	if(photo.size > 3000000) {
		return {
			status: 200,
			type: 'warning',
			message: 'foto maksimal 3mb',
			action: '/add'
		}
	}

	let foto	= photo.name.split('.')[0];
	foto 			+= '-';
	foto 			+= Date.now();
	foto 			+= photo.name.split('.')[1].toLowerCase();

	photo.mv('./public/uploads/' + foto);
	return {
		type: 'success',
		message: foto
	}
}
