const xhr = new XMLHttpRequest()
const objId = prompt('Enter the Machine Number (0 for storage):')

xhr.open('GET', `http://localhost:3000/machine/${objId}`)
xhr.responseType = 'json'
xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		console.log(this.response)
		const body = document.getElementsByTagName('body')[0]
		for (const s of this.response) {
			// Type:
			body.appendChild(document.createElement('br'))
			body.appendChild(document.createTextNode('\Type: '))

			let c = document.createElement('label')
			let txt = document.createTextNode(s.name)
			c.appendChild(txt)
			body.appendChild(c)
			
			// ID:
			body.appendChild(document.createElement('br'))
			body.appendChild(document.createTextNode('\ ID: '))

			c = document.createElement('label')
			txt = document.createTextNode(s._id)
			c.appendChild(txt)
			body.appendChild(c)

			// Arrival Date:
			body.appendChild(document.createElement('br'))
			body.appendChild(document.createTextNode('\Arrival Date: '))

			c = document.createElement('label')
			txt = document.createTextNode(s.ad)
			c.appendChild(txt)
			body.appendChild(c)

			body.appendChild(document.createElement('br'))
		}
	}
}
xhr.send()
