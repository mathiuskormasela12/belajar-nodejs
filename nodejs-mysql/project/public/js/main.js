const input = document.querySelectorAll('.modal .modal-body > .container input.form-control')
const save = document.querySelector('button.btn.btn-primary.save')
const addData = document.querySelector('.add-data')

addData.addEventListener('click', function() {
	const modalTitle = document.querySelector('.modal-title')
	const form = document.querySelector('#method')
	form.action = '/add'
	modalTitle.textContent = 'Tambah Data'
})

document.addEventListener('click', async function(e) {
	if(e.target.classList.contains('update-data')) {
		const modalTitle = document.querySelector('.modal-title')
		const form = document.querySelector('#method')
		const id = e.target.dataset.id
		form.action = '/update'
		modalTitle.textContent = 'Ubah Data'
		
		try {
			const result = await getData(id)
			const nama = document.getElementById('namaSiswa')
			const nisn = document.getElementById('nisn')
			const foto = document.getElementById('fotoSiswa')
			const idSiswa = document.getElementById('id')
			idSiswa.value = result.id
			nama.value = result.nama 
			nisn.value = result.nisn
			foto.value = result.foto
			console.log(result)
		} catch(err) {
			throw new Error(err)
		}
	}
})

input.forEach((item, index, array) => {
	item.addEventListener('keyup', function(){
		if(this.id == 'nisn') {
			if( this.value.length > 5 || this.value.length < 5 )
			{
				this.classList.add('is-invalid')
				if(array[index - 1].value != '' && array[index + 1].value != '') {
					save.setAttribute('disabled', null)
				}
			} else {
				this.classList.remove('is-invalid')
				this.classList.add('is-valid')
				if(index == 1) {
					if(array[index - 1].value != '' && array[index + 1].value != '') {
						save.removeAttribute('disabled')
					}
				}
			}
		}
		else if (this.value == '') {
			this.classList.add('is-invalid')
			save.setAttribute('disabled', null)
		} else {
			console.log('hello')
			this.classList.remove('is-invalid')
			if( index == 0 ) {
				this.classList.add('is-valid')
				if(array[index + 1].value != '' && array[index + 2].value != '') {
					save.removeAttribute('disabled')
				}
			} else {
				this.classList.add('is-valid')
				if(array[index - 1].value != '' && array[index - 2].value != '') {
					save.removeAttribute('disabled')
				}
			}
		}
	})
})

function getData(id) {
	return fetch(`http://127.0.0.1:3000/getdata/${id}`)
				 .then(response => {
				 	if(!response.ok) {
				 		throw new Error(response.statusText)
				 	}
				 	return response.json();
				 })
				 .then(response => response)
}