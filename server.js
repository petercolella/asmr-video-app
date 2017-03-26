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

var db = require('./db');

mongoose.connect('mongodb://localhost/asmr-video-app');

var index = require('./controllers/index');
var users = require('./controllers/usersController');

var app = express();

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
  resave: false,
  saveUninitialized: false
}));

app.use('/', index);
app.use('/users', users);

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

// // Now that we're connected, let's save that connection to the database in a variable.
// var db = mongoose.connection;

// // Will log an error if db can't connect to MongoDB
// db.on('error', function(err){
//   console.log(err);
// });

// // Will log "database has been connected" if it successfully connects.
// db.once('open', function() {
//   console.log("database has been connected!");
// });

//added listen function

module.exports = app;

app.listen(5000, function(){
  console.log("app listening on port 5000");
});