var Reader = require("../models/reader");
var mongoose = require("mongoose");

exports.getReaders = async function(query, page, limit) {
  var options = {
    page,
    limit
  };

  try {
    var readers = await Reader.paginate(query, options);
    return readers;
  } catch (e) {
    throw Error("Error while paginating readers.");
  }
};

exports.createReader = async function(reader) {
  var newReader = new Reader(reader);

  try {
    var savedReader = await newReader.save();
    return savedReader;
  } catch (e) {
    throw Error("Error while creating a reader");
  }
};
