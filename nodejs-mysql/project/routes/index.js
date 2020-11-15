const home = require('./home')
const deleteData = require('./delete')
const update = require('./update')
const updateData = update.updateData
const getData = update.getData

module.exports = {
	handleHome: home,
	handleDelete: deleteData,
	handleUpdate: updateData,
	handleGetData: getData
}