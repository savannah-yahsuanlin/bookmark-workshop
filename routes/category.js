const route = require('express').Router()
const {model:{Bookmark}} = require('../db')


route.get('/:category', async(req, res, next) => {
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
								<li>${val.bookmark}</li>
								<form method="POST" action="/categories/${val.id}?_method=DELETE">
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


route.delete('/:id', async(req, res, next) => {
	try {
		const bookmark = await Bookmark.findByPk(req.params.id)
		await bookmark.destroy()
		res.redirect('/bookmark')
	}
	catch(ex) {
		next(ex)
	}
})

module.exports = route