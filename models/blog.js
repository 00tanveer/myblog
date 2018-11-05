var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var blogSchema = new mongoose.Schema({
  title: String,
  date: { type: mongoose.Schema.Types.Date, default: Date.now() },
  tags: [String],
  delta_ops: [{}],
  genre: String,
  posted: { type: Boolean, default: false },
  likedBy: [
    {
      name: String,
      
    }
  ]
});

blogSchema.plugin(mongoosePaginate);
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
