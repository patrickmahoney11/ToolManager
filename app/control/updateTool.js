const toolId = prompt('Enter the Tool ID: ')
const newLocation = prompt('Enter the new Location: ')

const xhr = new XMLHttpRequest()
xhr.open('PUT', `http://localhost:3000/tools/${toolId}`)

const newValues = {loc : newLocation}

// JSON encoding 
const jsonStr = JSON.stringify(newValues)
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.responseType = 'json'
xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		console.log(this.response)
	}
}
xhr.send(jsonStr)
