const {Sequelize, DataTypes, models} = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_bookmarks_workshop')

const Bookmark = db.define('Bookmark', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
  	},
	bookmark: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	category: {
		type: DataTypes.STRING,
		allowNull: false,
	}
});


const seedAndSync = async() => {
	await db.sync({force: true})
	await Bookmark.create({id: 1, bookmark: 'linkedin.com', category: 'jobs'})
	await Bookmark.create({id: 2, bookmark: 'indeed.com', category: 'jobs'})
	await Bookmark.create({id: 3, bookmark: 'msdn.com', category: 'code'})
	await Bookmark.create({id: 4, bookmark: 'stackoverflow.com', category: 'code'})
	await Bookmark.create({id: 5, bookmark: 'amazon.com', category: 'shopping'})
	await Bookmark.create({id: 6, bookmark: 'nordstrom', category: 'shopping'})
}


module.exports = {
	seedAndSync,
	db,
	model: {
		Bookmark
	},
	models
}