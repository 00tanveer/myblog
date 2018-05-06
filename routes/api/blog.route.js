var express = require('express')

var router = express.Router()

var BlogController = require('../../controllers/blog.controller');

router.get('/', BlogController.getBlogs);
router.post('/', BlogController.createBlog);
router.put('/', BlogController.updateBlog);
router.delete('/:id', BlogController.removeBlog);

module.exports = router;
