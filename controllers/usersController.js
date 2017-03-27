var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  	User.find({})
    .exec(function(err, users){
	    if (err) { console.log(err); }
	    console.log(users);
	    res.render('users/index.hbs', {
	        users: users
	    });
    });
});

//USER SIGNUP ROUTE
router.get('/signup', function(req, res) {
	res.render('users/signup.hbs');
});

//USER EDIT ROUTE
router.get('/:id/edit', function(req, res) {
  User.findById(req.params.id)
  .exec(function(err, user) {
    if (err) console.log(err);
    res.render('users/edit.hbs', {
      user: user
    });
  });
});

// USER SHOW ROUTE
router.get('/:id', function(req, res){
  	User.findById(req.params.id)
  	.exec(function(err, user) {
    	if (err) console.log(err);
    	console.log(user);
    	res.render('users/show.hbs', {
      		user: user
    	});
  	});
});

router.post('/', /*authHelpers.createSecure,*/ function(req, res){

  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password_digest: res.hashedPassword
  });

  user.save(function(err, user){
    if (err) console.log(err);
    console.log(user);
    console.log(req.session.currentUser);
    res.redirect('/users/login');
  });
});

module.exports = router;
