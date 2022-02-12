const express = require('express')
const route = require('express').Router()
const {models:{Bookmark}} = require('../db')

route.use(express.urlencoded({ extended: false }))

route.put('/:id', async(req, res, next) => {
	try {
		const bookmark = await Bookmark.findByPk(req.params.id)
		await bookmark.update(req.body)	
		res.redirect('/bookmark')
	}
	catch(ex) {
		next(ex)
	}
})

route.get('/:id', async(req, res, next) => {
	try {
		const bookmarkOne = await Bookmark.findByPk(req.params.id)
		res.send(
		`
		<html>
				<head>
					<link rel="stylesheet" href="/style.css">
				</head>
			<body>
				<h1>Acme Bookmarks</h1>
				<ul>
					<form method="POST" action="/edit?_method=PUT">
						<p>${bookmarkOne.id}</p>
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