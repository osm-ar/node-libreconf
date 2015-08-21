// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PresentationSchema = new Schema({
  title: String,
  subtitle: String,
  speaker_id: String,
  presentation_type: String,
  url: String,
  text: String,
  approved: Boolean,
  conference: String,
  when: { type: Date, default: Date.now },
});

PresentationSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

var model = module.exports = mongoose.model('Presentation', PresentationSchema);

