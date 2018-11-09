var express = require("express");
var router = express.Router();
var BlogController = require("../../controllers/blog.controller");

router.get("/all/:genre", BlogController.getBlogs);
router.get("/tags/:genre", BlogController.getTags);
router.get("/:blogId", BlogController.getBlog);
router.post("/create/:genre", BlogController.createBlog);
router.put("/update/likes/:id", BlogController.updateBlogLikes);
router.put("/update", BlogController.updateBlog);
router.post("/comments/:id", BlogController.postComment);
router.delete("/remove/:id", BlogController.removeBlog);
router.post("/uploadPicture", BlogController.uploadPicture);

module.exports = router;
