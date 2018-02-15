var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var blogSchema = new mongoose.Schema({
	title: String,
	date: Date,
	body: String
})

blogSchema.plugin(mongoosePaginate)
const Blog = mongoose.model('Blog', blogSchema)

model.exports = Blog;
