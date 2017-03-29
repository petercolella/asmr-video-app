pry = require('pryjs');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var methodOverride = require('method-override');
var livereload = require('connect-livereload');
require('dotenv').config()

var db = require('./db');

mongoose.connect('mongodb://localhost/asmr-video-app');

var index = require('./controllers/index');
var usersController = require('./controllers/usersController');
var videosController = require('./controllers/videosController');
var sessionsController = require('./controllers/sessions');

var app = express();

// // Connect to database
// mongoose.connect(process.env.MONGODB_URI);

// mongoose.connection.on('error', function(err) {
//   console.error('MongoDB connection error: ' + err);
//   process.exit(-1);
//   }
// );
// mongoose.connection.once('open', function() {
//   console.log(process.env.MONGODB_URI)
//   console.log("Mongoose has connected to MongoDB!");
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(session({
  secret: "derpderpderpcats",
  resave: true,
  saveUninitialized: false
}));

app.use('/', index);
app.use('/users', usersController);
app.use('/users/:userId/videos', videosController);
app.use('/sessions', sessionsController);
app.use(livereload());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.listen(5000, function(){
  console.log("app listening on port 5000");
});
