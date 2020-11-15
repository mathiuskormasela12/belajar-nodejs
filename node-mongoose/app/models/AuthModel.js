// ===== AuthModel
// import all modules
const bcrypt					= require('bcryptjs');

// import Schema
const DatabaseSchema	= require('../core/DatabaseSchema');

class AuthModel extends DatabaseSchema {

	constructor() {
		super();
		this.modelUser = this.users();
	}

	register(username, password, send) {	

		const modelUser = this.modelUser;

		modelUser.find({ username }, async (err, result) => {
			if(err) {
				console.log(err);
				send('danger','Server Error','/register');
			} else if(result.length > 0) {
					send('warning', 'username sudah digunakan', '/register');
			} else {
					const hash = await bcrypt.hash(password, 8);
					const Users = new modelUser({ username, password: hash})
					Users.save(err => {
						if(err) {
							console.log(err);
							send('danger', 'Server Error','/register');
						} else {
								send('success', 'berhasil','/register');
						}
					});
			}
		});
	}

	login(username, password, send) {
		const modelUser = this.modelUser;

		modelUser.find({ username }, async (err, results) => {
			if(err) {
				console.log(err);
				send('danger', 'Server Error', '/login');
			} else if(results.length < 1 || !(await bcrypt.compare(password, results[0].password))) {
				send('warning', 'username atau password salah', '/login');
			} else {
				send('success', 'berhasil login', '/');
				console.log('hello')
			}
		});
	}

}

module.exports = new AuthModel();
