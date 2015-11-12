var
  mongoose = require("mongoose"),
  schema = require("./schema.json"),
  debug = require("debug")("libreconf:installer"),
  Configurable = mongoose.model('Configurable');


module.exports = function() {
  return function(req, res, next) {
    Configurable.find(function(err, configurable) {
      if (err)
        throw err;
      if (configurable.length) {
        return next();
      } else {
        debug("populating DB with configurables collection")
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
