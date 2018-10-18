var Blog = require("../models/blog");
var Tag = require("../models/tag");
var mongoose = require("mongoose");

_this = this;

exports.getBlogs = async function(query, page, limit) {
  // Options setup for the mongoose paginate
  var options = {
    page,
    limit
  };
  // Ty Catch the awaited promise to handle the error
  try {
    var blogs = await Blog.paginate(query, options);
    //return the blog list that was returned by the mongoose promise
    //console.log(blogs.docs);
    return blogs;
  } catch (e) {
    //return an Error message describing the reason
    throw Error("Error while Paginating Blogs");
  }
};

exports.createBlog = async function(blog) {
  // Creating a new Mongoose object by using the new keyword
  var newBlog = new Blog({
    title: blog.title,
    body: blog.body,
    delta_ops: blog.delta_ops
  });

  try {
    // Saving the blog
    console.log(newBlog);
    var savedBlog = await newBlog.save();
    return savedBlog;
  } catch (e) {
    //return an Error message describing the error
    throw Error("Error while Creating Blog");
  }
};

exports.updateBlog = async function(blog) {
  var title = blog.title;
  var id = mongoose.Types.ObjectId(blog.id);
  // try{
  // 	// find the old Blog objectt by the id
  // 	var oldBlog = await Blog.findById(title);
  // } catch(e){
  // 	throwError("Error occurred while finding the Blog")
  // }
  // //If no old Blog Object exists return false
  // if(!oldBlog){
  // 	return false;
  // }
  // console.log(oldBlog)
  // //Edit the Blog Object
  // oldBlog.title = blog.title
  // oldBlog.body = blog.body
  // oldBlog.delta_ops = blog.delta_ops

  // console.log(oldBlog)

  // try{
  // 	var savedBlog = await oldBlog.save()
  // 	return savedBlog
  // } catch(e){
  // 	throw Error("An Error occurred while updating the Blog")
  // }

  var query = { _id: id };
  var update = blog;
  var options = { upsert: true, new: true, setDefaultsOnInsert: true };

  await Blog.findOneAndUpdate(query, update, options, function(err, result) {
    if (err) {
      throw Error(err);
    } else {
      return result;
    }
  });
};

exports.deleteBlog = async function(id) {
  // Delete the Blog
  try {
    var deleted = await Blog.remove({ _id: id });
    if (deleted.result.n === 0) {
      throw Error("Blog could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error("Error occurred while deleting the Blog");
  }
};

exports.getTags = async function() {
  try {
    var tags = await Tag.find({});
    return tags;
  } catch (e) {
    throw Error("Error while retrieving tags");
  }
};
