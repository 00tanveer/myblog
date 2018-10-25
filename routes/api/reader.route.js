var express = require("express");
var router = express.Router();
var ReaderController = require("../../controllers/reader.controller");

router.get("/", ReaderController.getReaders);
router.post("/", ReaderController.createReader);

module.exports = router;
