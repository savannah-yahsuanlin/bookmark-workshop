const express = require('express')
const {db, seedAndSync, model:{Bookmark}} = require('./db')

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))
app.use(require('method-override')('_method'))

app.get('/', (req, res) => {res.redirect('/bookmark')})

app.post('/bookmark', async(req, res, next) => {
	try {
		const bookmark = await Bookmark.create(req.body)
		res.redirect('/bookmark')
	}
	catch(ex) {
		next(ex)
	}
})

app.get('/bookmark', async(req, res, next) => {
	try {
		const bookmarks = await Bookmark.findAll()
		res.send(`
			<html>
				<head>
					<link rel="stylesheet" href="/style.css">
				</head>
				<body>
					<h1>Acme Bookmarks ${bookmarks.length}</h1>
					<form method="POST">
						<input name="id" placeholder="id">
						<input name="bookmark" placeholder="bookmark">
						<input name="category" placeholder="category">
						<button>Add</button>
					</form>
					<ul>
					${bookmarks.map(bookmark => `<li>
						${bookmark.id}
						${bookmark.bookmark}
						<a href="/categories/${bookmark.category}">${bookmark.category}</a>
						</li>
					`).join('')}
					</ul>
				</body>
			</html>
		`)
	}
	catch(ex) {
		next(ex)
	}
})

app.get('/categories/:category', async(req, res, next) => {
	try {
		const category = req.params.category
		const bookmarks = await Bookmark.findAll({where: {category}})
		res.send(`
			<html>
				<head>
					<link rel="stylesheet" href="/style.css">
				</head>
				<body>
					<h1>Acme Bookmarks</h1>
						<ul>${bookmarks.map(val => 
						`
							<form method="POST" action="/categories/${val.id}?_method=DELETE">
								<li>${val.bookmark}</li>
								<button>X</button>
							</form>
						`
						).join('')}
						</ul>
				</body>
			</html>
		`)
	}
	catch(ex) {
		next(ex)
	}
})


app.delete('/categories/:id', async(req, res, next) => {
	try {
		const bookmark = await Bookmark.findByPk(req.params.id)
		await bookmark.destroy()
		res.redirect('/bookmark')
	}
	catch(ex) {
		next(ex)
	}
})

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