var express = require('express');
var router = express.Router({mergeParams: true});

var User = require('../models/user');
var Video = require('../models/video');

//VIDEO INDEX ROUTE
router.get('/', function indexVideo(req, res) {
	User.findById(req.params.userId)
	.exec(function(err, user) {
		if (err) { console.log(err) }
			// res.send(user);
			res.render('videos/index.hbs', {
				user: user
			});
	});
});

//VIDEO SHOW ROUTE
router.get('/:id', function showVideo(req, res) {
  User.findById(req.params.userId)
    .exec(function (err, user){
	    if (err) { console.log(err); }
	    const video = user.videos.id(req.params.id);
	    // res.send(video);
	    res.render('videos/show', {
	        video: video,
	        user: user
      	});
    });
});

module.exports = router;