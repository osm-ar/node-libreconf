var
  mongoose = require("mongoose"),
  schema = require("./schema.json"),
  Configurable = mongoose.model('Configurable');


module.exports = function() {
  return function(req, res, next) {
    Configurable.find(function(err, configurable) {
      if (err)
        throw err;
      if (configurable.length) {
        return next();
      } else {
        populate(function(err, data) {
          next(err);
        })
      }
    });
  };
};

function populate(cb) {
  cb = cb || function() {};

  Configurable.create(schema.configurables, function(err, data) {
    cb(err, data);
  });
}
