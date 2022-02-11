const route = require('express').Router()
const {model:{Bookmark}} = require('../db')


route.post('/', async(req, res, next) => {
	try {
		const bookmark = await Bookmark.create(req.body)
		res.redirect('/')
	}
	catch(ex) {
		next(ex)
	}
})

route.get('/', async(req, res, next) => {
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
					${bookmarks.map(bookmark => `
					<li>
						${bookmark.id}
						${bookmark.bookmark}
						<a href="/categories/${bookmark.category}">${bookmark.category}</a>
						<a href="/edit/${bookmark.id}">edit</a>
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

module.exports = route