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
	await Bookmark.create({id: 2, bookmark: 'monster.com', category: 'jobs'})
	await Bookmark.create({id: 3, bookmark: 'indeed.com', category: 'jobs'})
	await Bookmark.create({id: 4, bookmark: 'msdn.com', category: 'code'})
	await Bookmark.create({id: 5, bookmark: 'stackoverflow.com', category: 'code'})
	await Bookmark.create({id: 6, bookmark: 'amazon.com', category: 'shopping'})
	await Bookmark.create({id: 7, bookmark: 'nordstrom.com', category: 'shopping'})
	await Bookmark.create({id: 8, bookmark: 'leetcode.com', category: 'code'})
	await Bookmark.create({id: 9, bookmark: 'google.com', category: 'code'})
}


module.exports = {
	seedAndSync,
	db,
	models: {
		Bookmark
	}
}