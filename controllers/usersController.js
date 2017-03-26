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

router.get('/:id', function(req, res) {
    User.findById(req.params.id)
        .exec(function(err, users) {
            if(err) console.log(err);

            console.log(users);
            res.render('users/show.hbs', {
        		users: users
      		});
        });
});

module.exports = router;
