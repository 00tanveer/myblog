var mongoose = require("mongoose");
var ReaderService = require("../services/reader.service");

exports.getReaders = async function(req, res, next) {
  try {
    var readers = await ReaderService.getReaders(query, page, limit);
    return res.status(200).json({
      status: 200,
      data: readers.docs,
      message: "Readers successfully received"
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.createReader = async function(req, res, next) {
  console.log(req.body);
  var reader = {
    name: req.body.reader.name,
    email: req.body.reader.email,
    subject: req.body.reader.subject ? [req.body.reader.subject] : null,
    isSubscriber: req.body.reader.isSubscriber,
    message: req.body.reader.message ? [req.body.reader.message] : null
  };

  try {
    var createdReader = await ReaderService.createReader(reader);
    return res.status(201).json({
      status: 201,
      data: createdReader,
      message: "Successfully created reader"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Reader creation was unsuccessful"
    });
  }
};
