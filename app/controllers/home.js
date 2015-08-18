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
    //console.log(configurable);
    //configurable.remove(function(){});

    Article.find(function (err, articles) {
      if (err) return next(err);

      console.log(articles);
      Speaker.find(function (err, speakers) {
        if (err) return next(err);
        console.log(speakers);
        Presentation.find(function (err, presentations) {
          if (err) return next(err);
          console.log(presentations);
          Sponsor.find(function (err, sponsors) {
            if (err) return next(err);
            //console.log(sponsors);
            SponsorType.find(function (err, sponsor_types) {
              if (err) return next(err);
              console.log(sponsor_types);
              req.app.locals.sponsor_types = sponsor_types;
              //SponsorType.remove(function(){});  
              //Article.remove(function(){});  
              return res.render('index', {
                title: 'FOSS4G',//configurable.title,
                slogan: 'Buenos Aires 2016',//configurable.slogan,
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
