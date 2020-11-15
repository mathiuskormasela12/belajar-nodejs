const db = require('./')

const deleteData = (id, msgSend) => {

	db.connect(err => {
		let sql = `DELETE FROM siswa WHERE id = '${id}'`
		db.query(sql, (err, result) => {
			if(err) 
				msgSend(`${result.affectedRows} data failed to delete`, true, 'danger')
			msgSend(`${result.affectedRows} data has been deleted`, true, 'success')
		})
	})


}

module.exports = deleteData