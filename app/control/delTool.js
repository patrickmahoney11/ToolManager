const xhr = new XMLHttpRequest()

const toolId = prompt('Enter Tool ID to Delete:')

xhr.open('DELETE', `http://localhost:3000/tools/${toolId}`)
xhr.responseType = 'json'
xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		console.log(this.response)
	}
}
xhr.send()
