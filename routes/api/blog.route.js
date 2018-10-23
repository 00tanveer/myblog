var express = require("express");
var router = express.Router();
var BlogController = require("../../controllers/blog.controller");

router.get("/all", BlogController.getBlogs);
router.get("/tags", BlogController.getTags);
router.get("/:blogId", (req, res, next) => {
  console.log("chodna shala");
  next();
});
router.get("/:blogId", BlogController.getBlog);
router.post("/create", BlogController.createBlog);
router.put("/update", BlogController.updateBlog);
router.delete("/remove/:id", BlogController.removeBlog);
router.post("/uploadPicture", BlogController.uploadPicture);

module.exports = router;
