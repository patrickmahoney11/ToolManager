// import { displayTool } from './toolView.js';
console.log('Browser downloaded and about to execute the following logic.') 

const xhr = new XMLHttpRequest()
xhr.open('GET', `http://localhost:3000/tools`)
xhr.responseType = 'json'
xhr.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		console.log(this.response)
		const body = document.getElementsByTagName('body')[0]
		//
		for (const s of this.response) {
			
			// Type:
			body.appendChild(document.createElement('br'))
			body.appendChild(document.createTextNode('\Type: '))
			
			// Link:
			var c = document.createElement('a')
			c.text = s.name
			c.setAttribute(`id`,`${s._id}`);
			c.href = '#' 	// javascript:displayTool(c.id)	toolView.html

			c.addEventListener('click', function(event){
				event.preventDefault(); 
				// console.log(ObjId)

				const xhr1 = new XMLHttpRequest()
				xhr1.open('GET', `http://localhost:3000/tools/${s._id}`)
				xhr1.responseType = 'json'
				xhr1.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						document.body.innerHTML = "";
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

							// Dimensions:
							body.appendChild(document.createElement('br'))
							body.appendChild(document.createTextNode('\Dimensions: '))

							c = document.createElement('label')
							txt = document.createTextNode(s.d1)
							c.appendChild(txt)
							body.appendChild(c)
							
							body.appendChild(document.createTextNode('\ x '))
							c = document.createElement('label')
							txt = document.createTextNode(s.d2)
							c.appendChild(txt)
							body.appendChild(c)

							body.appendChild(document.createTextNode('\ x '))
							c = document.createElement('label')
							txt = document.createTextNode(s.d3)
							c.appendChild(txt)
							body.appendChild(c)

							// Location:
							body.appendChild(document.createElement('br'))
							body.appendChild(document.createTextNode('\Location: Machine '))

							c = document.createElement('label')
							txt = document.createTextNode(s.loc)
							c.appendChild(txt)
							body.appendChild(c)

							body.appendChild(document.createElement('br'))

							// ID:
							body.appendChild(document.createElement('br'))
							body.appendChild(document.createTextNode('\ID: '))

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
							
						}
					}
				}
				xhr1.send()
			})
			body.appendChild(c)

			// Location:
			body.appendChild(document.createTextNode('\Location: Machine '))
			c = document.createElement('label')
			var txt = document.createTextNode(s.loc)
			c.appendChild(txt)
			body.appendChild(c)
		}
	}
}
xhr.send()
