// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ConferenceSchema = new Schema({
  title: String,
  subtitle: String,
  slogan: String,
  year: String,
  month: String,
  days: Array,
  tracks: Array,
  description: String,
  theme: String,
  when: { type: Date, default: Date.now },
});

ConferenceSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

var model = module.exports = mongoose.model('Conference', ConferenceSchema);

