// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SponsorTypeSchema = new Schema({
  title: String,
  importance: Number,
  text: String
});

SponsorTypeSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

var model = module.exports = mongoose.model('SponsorType', SponsorTypeSchema);
