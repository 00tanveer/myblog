var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var readerSchema = new mongoose.Schema({
  name: String,
  email: String,
  isSubscriber: Boolean,
  messages: [String]
});

readerSchema.plugin(mongoosePaginate);
const Reader = mongoose.model("Reader", readerSchema);

module.exports = Reader;
