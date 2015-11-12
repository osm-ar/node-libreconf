var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Configurable = mongoose.model('Configurable'),
  Article = mongoose.model('Article'),
  Speaker = mongoose.model('Speaker'),
  Presentation = mongoose.model('Presentation'),
  PresentationType = mongoose.model('PresentationType'),
  Sponsor = mongoose.model('Sponsor'),
  debug = require("debug")("libreconf:home"),
  SponsorType = mongoose.model('SponsorType');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/', function(req, res, next) {
  debug("Finding configurables on DB");
  Configurable.findOne(function(err, configurable) {
    if (err) return next(err);
    debug("Finding articles on DB");
    Article.find(function(err, articles) {
      if (err) return next(err);
      debug("Finding speakers on DB");
      Speaker.find(function(err, speakers) {
        if (err) return next(err);
        debug("Finding presentations on DB");
        Presentation.find(function(err, presentations) {
          if (err) return next(err);
          debug("Finding presentation types on DB");
          PresentationType.find(function(err,
            presentation_types) {
            if (err) return next(err);
            debug("Finding sponsors on DB");
            Sponsor.find(function(err, sponsors) {
              if (err) return next(err);
              debug("Finding sponsor types on DB");
              SponsorType.find(function(err,
                sponsor_types) {
                if (err) return next(err);
                var a = function(slug) {
                  var article, i, len;
                  for (i = 0, len = articles.length; i <
                    len; i++) {
                    article = articles[i];
                    if (article.url == slug) {
                      return article.text;
                    } else {
                      return '';
                    }
                  }
                }
                return res.render('index', {
                  title: configurable.title,
                  slogan: configurable.slogan,
                  a: a,
                  //art: a,
                  //article: a,
                  articles: articles,
                  speakers: speakers,
                  presentations: presentations,
                  presentation_types: presentation_types,
                  sponsors: sponsors,
                  sponsor_types: sponsor_types
                });
              });
            });
          });
        });
      });
    });
  });
});
