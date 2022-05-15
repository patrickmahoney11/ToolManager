
// Encapsulation
// Constructor function 
function Tool(name, d1, d2, d3, loc, ad) { // 
	this.name = name
	this.d1 = d1
	this.d2 = d2
	this.d3 = d3
	this.loc = loc //
	this.ad = ad 
	// getter property
	Object.defineProperty(this, 'fullDim', {
		get: function() {return `${this.d1} ${this.d2} ${this.d3}`}
	})
}

// Define getLabel method
Tool.prototype.getLabel = function() {
	return `${this.name}`
}

// super()
function toolInfo(name, d1, d2, d3, loc, ad) { // 
	Tool.call(this, name, d1, d2, d3, loc, ad)	// 
}

Object.setPrototypeOf(toolInfo.prototype, Tool.prototype)

// Polymorphism
toolInfo.prototype.getLabel = function() {
	return `${this.name}`	
}

// for tools that are in a machine
export class machTool extends toolInfo {
	// __dateinsertedinto = null 	// Set to current date!!
	
	// get dateInsertedInto() {
	// 	return this.__dateinsertedinto
	// }
	
	// set dateInsertedInto(y) {
	// 	this.__dateinsertedinto = y 
	// }
}








