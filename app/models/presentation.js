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
  conference: {
    id: Number,
    name: String,
    year: Number,
    country: String,
    address: String
    //name: "FOSS4G Buenos Aires",
    //year: 2016,
    //country: "Argentina",
    //address: "Cabildo 300, Ciudad Autónoma de Buenos Aires, Argentina",
  }
});

PresentationSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

var model = module.exports = mongoose.model('Presentation', PresentationSchema);

