var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/asmr-video-app');

var User = require('../models/user');
var Video = require('../models/video');

mongoose.Promise = global.Promise;

User.remove({}, function(err){
  console.log(err);
});

var firstUser = new User({
    username: 'pcolella',
  	email: 'peter.joseph.colella@gmail.com',
  	password_digest: '1234',
  	about: 'I like triggers.',
  	videos: [{
  		artist_name: 'WhispersAudios ASMR',
  		video_title: 'ASMR - Annual Physical Exam with Dr. Hastings',
  		genre: 'Role Play',
  		language: 'English',
  		triggers: 'Soft Spoken',
  		date: '04/24/2016',
  		video_length_mins: '36',
  		url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/81H9B738C3g" frameborder="0" allowfullscreen></iframe>'
  	}, {
  		artist_name: 'WhispersRed ASMR',
  		video_title: 'ASMR Gong Tapping | Gloves & Sticky Fingers',
  		genre: 'Relaxation',
  		language: 'English',
  		triggers: 'Gloves',
  		date: '03/26/2016',
  		video_length_mins: '24',
  		url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/nOb5buDpAG0" frameborder="0" allowfullscreen></iframe>'
  	}]
});

var secondUser = new User({
    username: 'Pavo',
  	email: 'pavo@comcast.net',
  	password_digest: '5678',
  	about: 'My hair is standing on end.',
  	videos: [{
  		artist_name: 'Fairy Char ASMR',
  		video_title: 'The Cranial Nerves Examination ASMR',
  		genre: 'Role Play',
  		language: 'English',
  		triggers: 'Soft Spoken',
  		date: '03/27/2017',
  		video_length_mins: '43',
  		url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/MXmOhUtHBJw" frameborder="0" allowfullscreen></iframe>'
  	}]
});

firstUser.save(function(err) {
  if (err) console.log(err);

  console.log('first user created!');
});

secondUser.save(function(err) {
  if (err) console.log(err);

  console.log('second user created!');
});