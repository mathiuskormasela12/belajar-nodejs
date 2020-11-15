const db = require('../models');
const Post = db.posts;
const Op = db.Sequelize.Op;

// Create
exports.create = (req, res) => {

	// Validate request
	if( !req.body.title ) {
		res.status(400).send({
			message: "Content can not be empty"
		});
		return;
	}

	const post = {
		title: req.body.title,
		description: req.body.description,
		published: req.body.published ? req.body.published : false
	}

	Post.create(post)
	.then(data => {
		res.send(data)
	})
	.catch(err => {
		res.status(500).send({
			message: err.message || 'Oh sorry, Database error'
		});
	})

}

// Retrieve All
exports.findAll = (req, res) => {

}

// Find a single
exports.findOne = (req, res) => {

}

// Update a Post with id
exports.update = (req, res) => {

}

// Delete a Post
exports.delete = (req, res) => {

}

// Delete all Posts
exports.deleteAll = (req, res) => {

}

// Find All Published
exports.findAllPublished = (req, res) => {

}