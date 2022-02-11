const route = require('express').Router()
const bodyParser = require('body-parser')
const {model:{Bookmark}} = require('../db')
const textParser = bodyParser.text()
route.get('/:id', textParser, async(req, res, next) => {
	try {
		const id = req.params.id
		const bookmarkOne = await Bookmark.findOne({where: {id}})
		const bookmarksUpdate = await Bookmark.update(`${req.body}`, {where: {id}})
	console.log(bookmarksUpdate)
		res.send(
		`
		<html>
				<head>
					<link rel="stylesheet" href="/style.css">
				</head>
			<body>
				<h1>Acme Bookmarks</h1>
				<ul>
					<form method="POST" action="/edit/${bookmarkOne.id}?_method=PUT">
						<input name="id" placeholder="id" value="${bookmarkOne.id}">
						<input name="bookmark" placeholder="bookmark" value="${bookmarkOne.bookmark}" autofocus>
						<input name="category" placeholder="category" value="${bookmarkOne.category}">
						<button>Update</button>
					</form>
				</ul>
			</body>
		</html>
		`
		)
	}
	catch(ex) {
		next(ex)
	}
})

module.exports = route