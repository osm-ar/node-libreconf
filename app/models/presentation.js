// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PresentationSchema = new Schema({
  title: String,
  subtitle: String,
  speaker_id: Number,
  url: String,
  text: String,
  approved: Boolean,
  conference: String
});

PresentationSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

var model = module.exports = mongoose.model('Presentation', PresentationSchema);

