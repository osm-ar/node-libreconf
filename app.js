var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  debug = require("debug")("libreconf"),
  mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || config.db);
var db = mongoose.connection;
db.on('error', function() {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function(model) {
  require(model);
});

var app = express();

require('./config/express')(app, config);

app.listen(process.env.PORT || config.port);
debug("Listening on port %s", process.env.PORT || config.port);
