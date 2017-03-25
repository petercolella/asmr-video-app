var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var VideoSchema = new Schema({
	artist: String,
	title: String,
	genre: String,
	language: String,
	triggers: [],
	date: Date,
	length: Number,
	url: String
})

var UserSchema = new Schema({
	username: String,
  	email: String,
  	password_digest: String,
  	about: String,
  	video: [VideoSchema],
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
