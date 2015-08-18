var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Configurable = mongoose.model('Configurable'),
  Article = mongoose.model('Article'),
  Speaker = mongoose.model('Speaker'),
  Presentation = mongoose.model('Presentation'),
  Sponsor = mongoose.model('Sponsor'),
  SponsorType = mongoose.model('SponsorType');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

  Configurable.findOne(function (err, configurable) {
    if (err) return next(err);
    Article.find(function (err, articles) {
      if (err) return next(err);
      Speaker.find(function (err, speakers) {
        if (err) return next(err);
        Presentation.find(function (err, presentations) {
          if (err) return next(err);
          Sponsor.find(function (err, sponsors) {
            if (err) return next(err);

            SponsorType.find(function (err, sponsor_types) {
              if (err) return next(err);
              return res.render('index', {
                title: configurable.title,
                slogan: configurable.slogan,
                articles: articles,
                speakers: speakers,
                presentations: presentations,
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
