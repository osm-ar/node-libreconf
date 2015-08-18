// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ConfigurableSchema = new Schema({
  title: String,
  slogan: String,
  primary_font: String,
  secondary_font: String
});

ConfigurableSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

var model = module.exports = mongoose.model('Configurable', ConfigurableSchema);

