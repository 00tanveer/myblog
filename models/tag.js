var mongoose = require("mongoose");

var tagSchema = new mongoose.Schema({
  name: String
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
