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
  	about: 'I am new here.',
  	videos: [{
  		artist_name: 'WhispersAudios ASMR',
  		video_title: 'ASMR - Annual Physical Exam with Dr. Hastings',
  		genre: 'Role Play',
  		language: 'English',
  		triggers: 'Soft Spoken',
  		date: '04/24/2016',
  		video_length_mins: '36',
  		url: 'https://youtu.be/81H9B738C3g'
  	}, {
  		artist_name: 'WhispersRed ASMR',
  		video_title: 'ASMR Gong Tapping | Gloves & Sticky Fingers',
  		genre: 'Relaxation',
  		language: 'English',
  		triggers: 'Gloves',
  		date: '03/26/2016',
  		video_length_mins: '24',
  		url: 'https://youtu.be/nOb5buDpAG0'
  	}]
});

var secondUser = new User({
    username: 'nunya',
  	email: 'peter.joseph.colella@gmail.com',
  	password_digest: '1234',
  	about: 'None of your business.',
  	videos: [{
  		artist_name: 'WhispersAudios ASMR',
  		video_title: 'ASMR - Annual Physical Exam with Dr. Hastings',
  		genre: 'Role Play',
  		language: 'English',
  		triggers: 'Soft Spoken',
  		date: '04/24/2016',
  		video_length_mins: '36',
  		url: 'https://youtu.be/81H9B738C3g'
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