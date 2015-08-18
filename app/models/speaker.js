// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SpeakerSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  twitter: String,
  avatar: String,
  facebook: String,
  website: String,
  organization: String,
  country: String,
  bio: String,
  gender: String,
  tshirt_size: String
});

var model = module.exports = mongoose.model('Speaker', SpeakerSchema);

