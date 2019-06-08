var express = require('express');
var router = express.Router();
var User = require('../models/user');
var authHelpers = require('../helpers/auth.js');

/* GET users listing. */
router.get('/', function indexAction(req, res, next) {
  // res.send('respond with a resource');
  // var currentUser = req.session.currentUser
  console.log(req.session);
  // console.log(currentUser)
  User.find({}).exec(function(err, users) {
    if (err) {
      console.log(err);
    }

    res.render('users/index.hbs', {
      users: users,
      currentUser: req.session.currentUser
    });
  });
});

//USER SIGNUP ROUTE
router.get('/signup', function newAction(req, res) {
  res.render('users/signup.hbs');
});

//USER EDIT ROUTE
router.get('/:id/edit', authHelpers.authorize, function editAction(req, res) {
  User.findById(req.params.id).exec(function(err, user) {
    if (err) console.log(err);
    res.render('users/edit', {
      user: user,
      currentUser: req.session.currentUser
    });
  });
});

//USER UPDATE ROUTE
router.patch('/:id', authHelpers.authorize, function updateAction(req, res) {
  User.findById(req.params.id).exec(function(err, user) {
    if (err) console.log(err);
    // console.log(user);
    // res.send(user);
    user.set(req.body);
    user.save();

    res.render('users/show', {
      user: user,
      currentUser: req.session.currentUser
    });
  });
});

// USER SHOW ROUTE
router.get(
  '/:id',
  /*authHelpers.authorize,*/ function showAction(req, res) {
    var currentUser = req.session.currentUser;
    User.findById(req.params.id).exec(function(err, user) {
      if (err) console.log(err);
      // console.log(user);
      res.render('users/show.hbs', {
        user: user,
        currentUser: currentUser
      });
    });
  }
);

//USER CREATE ROUTE
router.post('/', authHelpers.createSecure, function createAction(req, res) {
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password_digest: res.hashedPassword
  });

  user.save(function(err, user) {
    if (err) console.log(err);
    // console.log(user);
    // console.log(req.session.currentUser);
    res.redirect('/sessions/login');
  });
});

//USER DELETE ROUTE
router.delete('/:id', authHelpers.authorize, function(req, res) {
  User.findByIdAndRemove(req.params.id).exec(function(err, user) {
    if (err) console.log(err);
    // var session = req.session
    req.session.destroy();
    console.log('User Deleted!');
    res.redirect('/users');
  });
});

module.exports = router;
