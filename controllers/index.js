var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session)
	  	User.find({})
	    .exec(function(err, users){
			if (err) { console.log(err); }
			
			res.render('index', {
				title: 'ASMR Trigger Happy',
				users: users
			});
		});
});

module.exports = router;
