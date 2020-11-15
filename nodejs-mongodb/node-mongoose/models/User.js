const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	nama: {
		type: String,
		required: true
	},
	usia: {
		type: Number,
		required: true,
		default: 0
	}
});

module.exports = model('User', userSchema);
