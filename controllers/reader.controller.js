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
  var reader = {
    name: req.body.name,
    email: req.body.email,
    isSubscriber: req.body.isSubscriber,
    messages: req.body.message ? [req.body.message] : []
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
