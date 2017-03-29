var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var VideoSchema = new Schema({
	artist_name: String,
	video_title: String,
	genre: String,
	language: String,
	triggers: String,
	date: String,
	video_length_mins: String,
	url: String
})

VideoSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) { this.created_at = now}
    next()
})

var UserSchema = new Schema({
	username: String,
  email: String,
  password: String,
  about: String,
  videos: [VideoSchema],
  created_at: Date,
  updated_at: Date
});

UserSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) { this.created_at = now }
  next()
});

var UserModel = mongoose.model('User', UserSchema);
var VideoModel = mongoose.model('Video', VideoSchema);

module.exports = {
  User: UserModel,
  Video: VideoModel
}
