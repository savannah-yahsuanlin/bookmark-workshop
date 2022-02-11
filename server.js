const express = require('express')
const bodyParser = require('body-parser')
const {db, seedAndSync, model:{Bookmark}, models} = require('./db')

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.raw({ extended: true }))
app.use(require('method-override')('_method'))


app.get('/', (req, res) => {res.redirect('/bookmark')})

app.use('/bookmark', require('./routes/bookmark'))
app.use('/categories', require('./routes/category'))
app.use('/edit', require('./routes/edit'))


const setUp = async() => {
	try {
		await db.authenticate()
		await seedAndSync()

		const port = process.env.PORT || 3000
		app.listen(port, () => {
			console.log(`Listening on port ${port}`)
		})
	}
	catch(ex) {
		console.log(ex)
	}
}

setUp()