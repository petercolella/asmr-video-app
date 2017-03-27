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

module.exports = router;
