var express = require("express");
var router = express.Router();
var blogs = require("./api/blog.route");

router.use("/", blogs);

module.exports = router;
