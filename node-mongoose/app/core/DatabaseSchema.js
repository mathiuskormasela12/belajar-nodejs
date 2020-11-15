// ===== Users
// import mongoose
const { Schema, model }		= require('mongoose');

class DatabaseSchema {
	
	users() {
		const schema	= new Schema({
			username: {
				type: String,
				required: true
			},
			password: {
				type: String,
				required: true,
				minlength: 5
			},
		});
		return model('User', schema);
	}

	students() {
		const schema = new Schema({
			full_name: String,
			nisn: {
				type: String,
				minlength: 5,
				maxlength: 5
			},
			ttl: Date,
			kelas: String,
			jurusan: String,
			foto: String
		});

		return model('Student', schema);
	}

}

module.exports = DatabaseSchema;
