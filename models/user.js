var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;
