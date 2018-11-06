var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var blogSchema = new mongoose.Schema({
  title: String,
  date: { type: mongoose.Schema.Types.Date, default: Date.now() },
  tags: [String],
  delta_ops: [{}],
  genre: String,
  posted: { type: Boolean, default: false },
  likes: { type: Number, default: 0},
  commentedBy: [
    {
      name: String,
      email: String,
      message: String
    }
  ]
});

blogSchema.plugin(mongoosePaginate);
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
