import {machTool} from '/tools.js'

console.log('Browser downloaded and about to execute the following logic.') 

const createBtn = document.getElementById('create')
let typ = ''
createBtn.addEventListener('click', function(event){
	// Set input
	name = document.getElementById('name').value
	const d1 = document.getElementById('d1').value
	const d2 = document.getElementById('d2').value
	const d3 = document.getElementById('d3').value
	const loc = document.querySelector('input[name="machine"]:checked').value;
	// const loc = document.getElementById("machine").value;
	const ad = document.getElementById('ad').value
	
	// Create tool object 
	const stObj = new machTool(name, d1, d2, d3, loc, new Date(ad)) //
	console.log(stObj) 
	
	// Set the Content-Type 
	const xhr = new XMLHttpRequest()
	xhr.open('POST', `http://localhost:3000/tools`)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.responseType = 'json'
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
		}
	}
	// JSON encoding 
	const jsonStr = JSON.stringify(stObj)
	xhr.send(jsonStr)
	 
})

// firstName = document.getElementById('fn').value
// console.log(`The initial value of first name: ${firstName}`)


