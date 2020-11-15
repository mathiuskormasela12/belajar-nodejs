const dbConfig = require('../config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {

	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorAliases: false,

	pool: {
		min: dbConfig.pool.min,
		max: dbConfig.pool.max,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}

});

const db = {};

db.posts = require('./post.model.js')(Sequelize, sequlize);

module.exports = db;