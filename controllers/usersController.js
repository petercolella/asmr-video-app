var express = require('express');
var router = express.Router();

var User = require('../models/user');

var authHelpers = require('../helpers/auth.js');

/* GET users listing. */
router.get('/', function indexAction(req, res, next) {
  // res.send('respond with a resource');
  // var currentUser = req.session && req.session.currentUser
  // console.log(req.session)
  	User.find({})
    .exec(function(err, users){
	    if (err) { console.log(err); }

	    res.render('users/index', {
	        users: users,
          // currentUser: currentUser
	    });
    });
});

//USER SIGNUP ROUTE
router.get('/signup', function newAction(req, res) {
	res.render('users/signup');
});

//USER EDIT ROUTE
router.get('/:id/edit', /*authHelpers.authorize, */function editAction(req, res) {
	User.findById(req.params.id)
  	.exec(function(err, user) {
    	if (err) console.log(err);
    	res.render('users/edit', {
      		user: user
    	});
  	});
});

//USER UPDATE ROUTE
router.put('/:id', /*authHelpers.authorize, */function updateAction(req, res) {
	User.findByIdAndUpdate(req.params.id, {
		username: req.body.username,
		email: req.body.email,
		password_digest: req.body.password_digest,
		about: req.body.about
	}, { new: true })
		.exec(function(err, user) {
			if (err) console.log(err);
			console.log(user);
			// res.send(user);
			res.render('users/show', {
				user: user
			});
		});
});

// USER SHOW ROUTE
router.get('/:id', function showAction(req, res){
  var currentUser = req.session && req.session.currentUser
  	User.findById(req.params.id)
  	.exec(function(err, user) {
    	if (err) console.log(err);
    	console.log(user);
    	res.render('users/show', {
      		user: user,
          currentUser: currentUser,
    	});
  	});
});

//USER CREATE ROUTE
router.post('/', /*authHelpers.createSecure, */function createAction(req, res){

  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password_digest: res.hashedPassword
  });

  user.save(function(err, user){
    if (err) console.log(err);
    console.log(user);
    console.log(req.session.currentUser);
    res.redirect('sessions/login');
  });
});

//USER DELETE ROUTE
router.delete('/:id', /*authHelpers.authorize, */function(req, res) {
	User.findByIdAndRemove(req.params.id)
	.exec(function(err, user) {
		if (err) console.log(err);
		console.log('User Deleted!');
		res.redirect('/users');
	});
});

module.exports = router;
