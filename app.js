var express = require("express");

var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var bluebird = require("bluebird");
var fileUpload = require("express-fileupload");

var index = require("./routes/index");
var users = require("./routes/users");

// Initialize express app
var app = express();

//mongoose setup
mongoose.Promise = bluebird;
//mongoose.connect('mongodb://127.0.0.1:27017/myblog')
mongoose
  .connect(
    "mongodb://00tanveer:3djrl9341046@ds237363.mlab.com:37363/cityoftroy"
  )
  .then(() => {
    console.log(`Successfully Connected to the Mongodb database
at URL : mongodb://<dbuser>:<dbpassword>@ds237363.mlab.com:37363/cityoftroy`);
  })
  .catch(() => {
    console.log(`Error Connecting to the Mongodb databae
at URL : mongodb://<dbuser>:<dbpassword>@ds237363.mlab.com:37363/cityoftroy`);
  });

//CORS configuration
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Mehthods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));

// Get the routes
var blog_api = require("./routes/api/blog.route");
var reader_api = require("./routes/api/reader.route");
app.use("/", index);
app.use("/blogs", blog_api);
app.use("/readers", reader_api);
var auth = require("./auth/AuthController");
app.use("/auth", auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
