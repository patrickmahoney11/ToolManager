 
const express = require('express')
const app = express()
const cors = require('cors')
const mongo = require('mongodb')
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"

app.set('port', 3000)

app.use(express.json())
app.use(cors())

// GET a tool by ID
app.get('/tools/:id', function(req, res){
	console.log(`${req.params.id}`)
	MongoClient.connect(url, function(err, conn) {
		if (err) console.log(err)
		else {
			const db = conn.db('manufacturing')
			const coll = db.collection('tools')
			const criteria = {_id: new mongo.ObjectID(req.params.id)}
			coll.find(criteria).toArray(function(err, result) {
				if (err) console.log(err)
				else {
					conn.close()
					// Send the data back 
					res.type('application/json')
					res.status(200)
					res.json(result)					
				}
			})
		}
	})
})

// GET tool list
app.get('/tools', function(req, res){
	console.log(req.body)

	if (Object.keys(req.query).length == 0) {	// find all the documents
		MongoClient.connect(url, function(err, conn) {
			if (err) console.log(err)
			else {
				const db = conn.db('manufacturing')
				const coll = db.collection('tools')
				coll.find({}).toArray(function(err, result) {
					if (err) console.log(err)
					else {
						conn.close()
						// Send the data back 
						res.type('application/json')
						res.status(200)
						res.json(result)					
					}
				})
			}
		})	
	}
})

// POST a new tool 
app.post('/tools', function(req, res) {
	console.log(req.body)
	MongoClient.connect(url, function(err, conn) {
		if (err) console.log(err)
		else {
			const db = conn.db('manufacturing')
			const coll = db.collection('tools')

			// Prepare the JS myObj 
			const myObj = new Object()
			myObj.name = req.body.name
			myObj.d1 = req.body.d1
			myObj.d2 = req.body.d2
			myObj.d3 = req.body.d3
			myObj.loc = req.body.loc
			// const dt_flds = req.body.ad.split('-')
			// const yyyy = dt_flds[0]
			// const mm = dt_flds[1]
			// const dd = dt_flds[2] 
			// myObj.ad = new Date(yyyy, mm, dd)
			myObj.ad = req.body.ad

			coll.insertOne(myObj, function(err, result) {
				if (err) console.log(err)
				else {
					conn.close()
					// Send the data back 
					res.type('application/json')
					res.status(200)
					res.json(result)					
				}
			})
		}
	})
})

// DELETE a tool by ID 627b494225314bb4b7d6131f
app.delete('/tools/:id', (req, res) => {
	console.log(`${req.params.id}`)
	MongoClient.connect(url, function(err, conn) {
		if (err) console.log(err)
		else {
			const db = conn.db('manufacturing')
			const coll = db.collection('tools')
			const criteria = {_id: new mongo.ObjectID(req.params.id)}
			coll.deleteOne(criteria)
			res.type('application/json')
			res.status(200)
		}
	})  
})

// UPDATE a tool type by ID
app.put('/tools/:id', function(req, res){
	const id = req.params.id
	const criteria = {_id : new mongo.ObjectID(req.params.id)}
	const newValues = req.body
	MongoClient.connect(url, function(err, conn) {
		if (err) throw err;
		const db = conn.db("manufacturing");
		db.collection('tools').updateOne(criteria, {$set: newValues}, function(err, result){
			if (err) console.log(err)
			else {
				res.type('application/json')
				res.status(200)
				res.json(result)
		  	}
	 	})
	})
})

// GET tools by Machine
app.get('/machine/:id', function(req, res){
	console.log(`${req.params.id}`)
	MongoClient.connect(url, function(err, conn) {
		if (err) console.log(err)
		else {
			const db = conn.db('manufacturing')
			const coll = db.collection('tools')
			const criteria = {loc: req.params.id}
			coll.find(criteria).toArray(function(err, result) {
				if (err) console.log(err)
				else {
					conn.close()
					// Send the data back 
					res.type('application/json')
					res.status(200)
					res.json(result)					
				}
			})
		}
	})
})

app.listen(app.get('port'), function(){
	console.log('Express server started on http://localhost:' + app.get('port'));
	console.log(__dirname)
})
