module.exports = (Sequelize, sequelize) => {

	const Post = sequelize.define('post', {

		title: {
			type: Sequelize.STRING
		},

		description: {
			type: Sequelize.STRING
		},

		published: {
			typr: Sequelize.BOOLEAN
		}

	});

	return Post;

}