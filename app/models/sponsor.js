// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SponsorSchema = new Schema({
  title: String,
  logo_url: String,
  ad_url: String,
  url: String,
  text: String,
  sposor_type: Number,
  enabled: Boolean
});

SponsorSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

var model = module.exports = mongoose.model('Sponsor', SponsorSchema);

