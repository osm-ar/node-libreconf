var express = require('express');
var glob = require('glob');
var i18n = require('i18n');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var admin = require('../lib/admin'),
  installer = require("../lib/installer"),
  router = express.Router(),
  mongoose = require('mongoose'),
  Configurable = mongoose.model('Configurable'),
  Article = mongoose.model('Article'),
  Speaker = mongoose.model('Speaker'),
  Presentation = mongoose.model('Presentation'),
  PresentationType = mongoose.model('PresentationType'),
  Conference = mongoose.model('Conference'),
  Sponsor = mongoose.model('Sponsor'),
  SponsorType = mongoose.model('SponsorType');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', [config.root + '/themes/' + config.theme + '/views']);
  app.set('view engine', 'jade');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(installer());

  app.use(compress());
  app.use(methodOverride());

  app.use(cookieParser());

  app.use(express.static(config.root + '/themes/' + config.theme + '/public'));

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function(controller) {
    require(controller)(app);
  });


  i18n.configure({
    locales: config.locales,
    directory: config.locales_path,
    defaultLocale: config.default_locale, //'es'
    cookie: config.locale_cookie, //'_lang_',
    debug: false,
    updateFiles: true,
    indent: "  "
  });

  app.use(i18n.init);
  __ = i18n.__;
  app.locals.__ = i18n.__;
  app.locals.__n = i18n.__n;
  console.log(app.locals.__(
    "Internationalization initialized. Current locale: ") + i18n.getLocale());

  app.use('*', function(req, res, next) {
    var catalogs = i18n.getCatalog();

    app.locals.lang = catalogs[req.locale];
    next();
  });

  app.use('/admin', admin());

  app.use(function(req, res, next) {

    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

};
