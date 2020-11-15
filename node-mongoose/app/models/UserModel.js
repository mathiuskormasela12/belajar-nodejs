// ===== User Model
// import all modules
const moment							= require('moment');
const DatabaseSchema			= require('../core/DatabaseSchema');

class UserModel extends DatabaseSchema {

	constructor() {
		super();
		this.modelStudent = this.students();
	}

	add(full_name, nisn, ttl, kelas, jurusan, foto, send) {
		const studentsModel		= this.modelStudent;

		studentsModel.find({ nisn }, (err, results) => {
			if(err) {
				console.log(err);
				send('danger', 'Server Error', '/add');
			} else if(results.length > 0) {
				send('warning', 'Siswa udah ada', '/add');
			} else {
				const Student = new studentsModel({
					full_name,
					nisn,
					ttl,
					kelas,
					jurusan,
					foto
				});
				Student.save(err => {
					if(err) {
						console.log(err);
						send('danger', 'Server Error', '/add');
					} else {
						send('success', 'Siswa berhasil ditambahkan', '/add');
					}
				});
			}
		});
	}

	editStudent(id, full_name, nisn, ttl, kelas, jurusan, foto, send) {
		const studentModel = this.modelStudent;

		studentModel.updateOne({ _id: id }, { $set: { full_name, nisn, ttl, kelas, jurusan, foto  } }, err => {
			if(err) {
				console.log(err);
				send('danger', 'Server Error', '/edit/' + id);
			} else {
				send('success', 'Siswa berhasil di ubah', '/');
			} 
		})
	}

	removeStudent(id, send) {
		const studentModel		= this.modelStudent;

		studentModel.find({ _id: id }, (err, result) => {
			if(err) {
				console.log(err);
				send('danger', 'Server Error', '/', '');
			} else {
				studentModel.deleteOne({ _id: id }, err => {
					if(err) {
						console.log(err);
						send('danger', 'Server Error', '/', '');
					} else {
						send('success', 'Siswa berhasil dihapus', '/', result[0].foto)
					}
				});
			}
		});
	}

	getStudentById(id, send) {
		const studentModel		= this.modelStudent;

		studentModel.find({ _id: id }, (err, results) => {
			if(err) {
				console.log(err);
				send('danger', 'Server Error', []);
			} else {
				results = results.map(item => ({
					id: item._id,
					full_name: item.full_name,
					nisn: item.nisn,
					foto: item.foto,
					ttl: moment(item.ttl).format('YYYY-MM-DD'),
					kelas: item.kelas,
					jurusan: item.jurusan,
					isX: (() => {
						switch(item.kelas) {
							case 'X':
								return true;
							break;
							default :
								return false;
							break;
						}
					})(),
						isXI: (() => {
							switch(item.kelas) {
								case 'XI':
									return true;
								break;
								default :
									return false;
								break;
							}
						})(),
						isXII: (() => {
							switch(item.kelas) {
								case 'XII':
									return true;
								break;
								default :
									return false;
								break;
							}
						})(),
						isRPL: (() => {
							switch(item.jurusan) {
								case 'RPL':
									return true;
								break;
								default :
									return false;
								break;
							}
						})(),
						isAKL: (() => {
							switch(item.jurusan) {
								case 'AKL':
									return true;
								break;
								default :
									return false;
								break;
							}
						})(),
						isOTKP: (() => {
							switch(item.jurusan) {
								case 'OTKP':
									return true;
								break;
								default :
									return false;
								break;
							}
						})()
					}))
				send('success', 'Berhasil mengambil siswa', results[0]);
			}
		})
	}

	getAllStudents(send) {
		const studentModel		= this.modelStudent;

		studentModel.find().sort({ full_name: 1 }).exec((err, results) => {
			if(err) {
				console.log(err);
				send('danger', 'Server Error', []);
			} else if(results.length < 1) {
				send('warning', 'Tidak ada siswa', []);
			} else {
				results = results.map((item, index) => ({
					id: item._id,
					no: index + 1,
					full_name: item.full_name,
					nisn: item.nisn,
					ttl: moment(item.ttl).format('DD MMMM YYYY'),
					kelas: item.kelas,
					jurusan: item.jurusan,
					foto: item.foto
				}))
				send('success', 'berhasil mengambil data', results)
			}
		});
	}

}

module.exports = new UserModel();
