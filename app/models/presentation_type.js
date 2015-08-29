// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PresentationTypeSchema = new Schema({
  title: String,
  position: Number,
  text: String
});

PresentationTypeSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

var model = module.exports = mongoose.model('PresentationType', PresentationTypeSchema);
