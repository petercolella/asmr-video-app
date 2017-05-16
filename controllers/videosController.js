var express = require('express');
var router = express.Router({mergeParams: true});

var User = require('../models/user');
var Video = require('../models/video');
var authHelpers = require('../helpers/auth.js');

//VIDEO INDEX ROUTE
router.get('/', function indexVideo(req, res) {
	User.findById(req.params.userId)
	.exec(function(err, user) {
		if (err) { console.log(err) }
			// res.send(user);
			res.render('videos/index', {
				user: user
			});
	});
});

//VIDEO NEW ROUTE
router.get('/new', authHelpers.authorize, function newVideo(req, res) {
	User.findById(req.params.userId)
	.exec(function(err, user) {
		if (err) { console.log(err) }
			res.render('videos/new', {
				user: user
			});
	});
});

//VIDEO CREATE ROUTE
router.post('/', authHelpers.authorize, function createVideo(req, res) {
	User.findById(req.params.userId)
	.exec(function (err, user){
		if (err) { console.log(err); }

		const newVideo = {
			artist_name: req.body.artist_name,
			video_title: req.body.video_title,
			genre: req.body.genre,
			language: req.body.language,
			triggers: req.body.triggers,
			date: req.body.date,
			video_length_mins: req.body.video_length_mins,
			url: req.body.url
		}

		user.videos.push(newVideo)

		user.save(function (err) {
			if (err) console.log(err);
			console.log('New Video created')
		});
		// res.render('videos/index.hbs', {
		// 	user: user
		// });
		res.redirect('/users/' + user.id + '/videos/')
		// res.send(newVideo);
	});
});

//VIDEO SHOW ROUTE
router.get('/:id', function showVideo(req, res) {
  	User.findById(req.params.userId)
    .exec(function (err, user) {
	    if (err) { console.log(err); }
	    const video = user.videos.id(req.params.id);
	    // res.send(video);
	    res.render('videos/show', {
	        video: video,
	        user: user
      	});
    });
});

//VIDEO EDIT ROUTE
router.get('/:id/edit', authHelpers.authorize, function editVideo(req, res) {
	User.findById(req.params.userId)
	.exec(function (err, user) {
		if (err) { console.log(err); }
		const video = user.videos.id(req.params.id);
		res.render('videos/edit', {
			video: video,
			user: user
		});
	});
});

//VIDEO UPDATE ROUTE
router.patch('/:id', authHelpers.authorize, function updateVideo(req, res) {
	User.findById(req.params.userId)
	.exec(function(err, user) {
		if (err) console.log(err);
		var video = user.videos.id(req.params.id)
		video.set(req.body)
		user.save()

		res.render('videos/show', {
			video: video,
			user: user
		});
	});
});

//VIDEO DELETE ROUTE
router.delete('/:id', authHelpers.authorize, function deleteVideo(req, res) {
	User.findById(req.params.userId)
	.exec(function (err, user) {
		if (err) console.log(err);

		user.videos.id(req.params.id).remove();

		user.save(function(err) {
			if (err) console.log(err);
		console.log('Video Deleted!');
		});

		res.redirect('/users/' + user.id + '/videos/'); 
	});
});

module.exports = router;