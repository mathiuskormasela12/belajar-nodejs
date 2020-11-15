module.exports = {
	HOST: 'localhost',
	USER: 'root',
	PASSWORD: '',
	DB: 'api',
	dialect: 'mysql',
	pool: {
		min: 0,
		max: 5,
		acquire: 30000,
		idle: 30000
	}
}