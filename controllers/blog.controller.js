// Accessing the service that we just created
var mongoose = require("mongoose");
var BlogService = require("../services/blog.service");
const path = require("path");
var cloudinary = require("cloudinary");
const multer = require("multer");
const config = require("../config");
const tags = require("../models/tags");

// Saving the context of the module inside the _this variable
_this = this;

// Async Controller function to get the Blog List
exports.getBlogs = async function(req, res, next) {
  // Check the existence of the query parameters, if they
  // don't exist set default values
  var genre = req.params.genre;
  var posted = req.query.posted;
  console.log(genre);
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;

  try {
    var blogs = await BlogService.getBlogs(
      { genre: genre, posted: posted },
      page,
      limit
    );
    //console.log(blogs);
    // Return the blogs list with the appropirate HTTP Status code and message
    return res.status(200).json({
      status: 200,
      data: blogs.docs,
      message: "Successfully blogs received"
    });
  } catch (e) {
    // Return an Error response message with code and error message
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getBlog = async function(req, res, next) {
  console.log("blogId ", req.params.blogId);
  var query = {
    _id: mongoose.Types.ObjectId(req.params.blogId)
  };
  var page = 1;
  var limit = 1;
  try {
    var blog = await BlogService.getBlog(query, page, limit);
    // Return the single blog with the appropriate HTTP status
    return res.status(200).json({
      status: 200,
      data: blog,
      message: "Successfully blog received"
    });
  } catch (e) {
    // Return an Error response message with code and error message
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.createBlog = async function(req, res, next) {
  // Req.body contains the form submit values
  var genre = req.params.genre;
  var blog = {
    genre: genre,
    title: "",
    tags: [],
    posted: false,
    delta_ops: [{}]
  };

  try {
    // Calling the service function with the new object from the request body
    var createdBlog = await BlogService.createBlog(blog);
    return res.status(201).json({
      status: 201,
      data: createdBlog,
      message: "Successfully created blog"
    });
  } catch (e) {
    //Return an Error Response Message with Code and the Error Message.
    return res
      .status(400)
      .json({ status: 400, message: "Blog creation was unsuccessful" });
  }
};

exports.updateBlog = async function(req, res, next) {
  var title = req.body.blog.title;
  var blog = {
    id: mongoose.Types.ObjectId(req.body.blog.id),
    date: req.body.blog.date ? req.body.blog.date : null,
    title: title,
    tags: req.body.blog.tags.length > 0 ? req.body.blog.tags : [],
    body: req.body.blog.body ? req.body.blog.body : null,
    delta_ops: req.body.blog.delta_ops ? req.body.blog.delta_ops : null,
    posted: req.body.blog.posted ? req.body.blog.posted : false
  };

  try {
    var updatedBlog = await BlogService.updateBlog(blog);
    return res.status(200).json({
      status: 200,
      data: updatedBlog,
      message: "Successfully updated blog"
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.updateBlogLikes = async function(req, res, next) {
  let blogId = mongoose.Types.ObjectId(req.params.id);
  try {
    var updatedBlog = await BlogService.updateBlogLikes(blogId);;
    return res.status(200).json({
      status: 200, 
      data: updatedBlog,
      message: "Successfully updated blog"
    });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ status: 400, message: e.message });
  }
}

exports.postComment = async function(req, res, next) {
  let blogId = mongoose.Types.ObjectId(req.params.id);
  let commenter = req.body.commenter;
  try {
    var updatedBlog = await BlogService.postComment(blogId, commenter);
    return res.status(200).json({
      status: 200,
      data: updatedBlog,
      message: "Successfully posted comment"
    })
  } catch(e) {
    console.log(e.message);
    return res.status(400).json({ status: 400, message: e.message });
  }
}
exports.removeBlog = async function(req, res, next) {
  var id = mongoose.Types.ObjectId(req.params.id);
  try {
    var deleted = await BlogService.deleteBlog(id);
    return res
      .status(204)
      .json({ status: 204, message: "Successfully blog deleted" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

const upload = multer({
  dest: "images/",
  limits: { fileSize: 10000000, files: 1 },
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
      return callback(new Error("Only Images are allowed !"), false);
    }

    callback(null, true);
  }
}).single("image");

exports.uploadPicture = async function(req, res, next) {
  console.log(req.files.file);
  //res.send(req.files.file);
  let imageFile = req.files.file;
  console.log(req.body);

  imageFile.mv(`./public/${req.body.filename}.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
  });

  console.log(config.CLOUD_NAME);
  console.log(config.API_KEY);
  console.log(config.API_SECRET);
  cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.API_KEY,
    api_secret: config.API_SECRET
  });
  console.log(req.body.filename);

  cloudinary.uploader.upload(`./public/${req.body.filename}.jpg`, function(
    result
  ) {
    if (result) {
      console.log(result);

      res.json(result);
    }
  });
};

exports.getTags = async function(req, res, next) {
  console.log("getTags called");
  let genre = req.params.genre;
  try {
    var ts = tags[genre];
    return res.status(200).json({
      status: 200,
      data: ts,
      message: "Successfully tags received"
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
