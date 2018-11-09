var Blog = require("../models/blog");
var Tag = require("../models/tags");
var mongoose = require("mongoose");

_this = this;

exports.getBlogs = async function(query, page, limit) {
  // Options setup for the mongoose paginate
  var options = {
    page,
    limit
  };
  // Try Catch the awaited promise to handle the error
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

exports.getBlog = async function(query, page, limit) {
  // Options setup for the mongoose paginate
  var options = {
    page,
    limit
  };
  try {
    var blog = await Blog.paginate(query, options);
    // return the blog that was returned by the mongoose promise
    return blog;
  } catch (e) {
    throw Error("Error while paginating Blogs");
  }
};

exports.createBlog = async function(blog) {
  // Creating a new Mongoose object by using the new keyword
  var newBlog = new Blog({
    genre: blog.genre,
    title: blog.title,
    tags: blog.tags,
    delta_ops: blog.delta_ops
  });

  try {
    // Saving the blog
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

exports.updateBlogLikes = async function(blogId) {
  await Blog.findOneAndUpdate(
    {_id: blogId},
    {$inc: {likes: 1}}, 
    function(err, result) {
      if (err) {
        throw Error(err);
      } else {
        return result;
      }
    }
  );
}

exports.postComment = async function(blogId, commenter) {
  await Blog.findOneAndUpdate(
    {_id: blogId},
    {$push: {commentedBy: commenter}},
    function(err, result) {
      if (err) {
        throw Error(err);
      } else {
        return result;
      }
    }
  );
}

exports.deleteBlog = async function(id) {
  // Delete the Blog
  try {
		var deleted = await Blog.remove({ _id: id });
    if (deleted.n === 0) {
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
