var express = require('express');
var i18n = require('i18n');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var config = require('../../config/config');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'),
  Configurable = mongoose.model('Configurable'),
  Conference = mongoose.model('Conference'),
  Article = mongoose.model('Article'),
  Speaker = mongoose.model('Speaker'),
  Presentation = mongoose.model('Presentation'),
  PresentationType = mongoose.model('PresentationType'),
  Sponsor = mongoose.model('Sponsor'),
  SponsorType = mongoose.model('SponsorType');
var sessions = require("client-sessions");

module.exports = function() {

  var app = express();

  var models = [{
    mongooseModel: Article,
    name: 'Article',
    pluralName: 'Articles',
    toString: 'title',
    fields: {
      title: {},
      url: {},
      text: {
        editor: 'markdown'
      }
    }
  }, {
    mongooseModel: Speaker,
    name: 'Speaker',
    pluralName: 'Speakers',
    toString: 'lastname',
    fields: {
      firstname: {},
      lastname: {},
      avatar: {},
      twitter: {},
      email: {},
      bio: {
        editor: 'markdown'
      }
    }
  }, {
    mongooseModel: Sponsor,
    name: 'Sponsor',
    pluralName: 'Sponsors',
    toString: 'title',
    fields: {
      title: {},
      add_url: {},
      logo_url: {},
      url: {},
      text: {
        editor: 'markdown'
      }
    }
  }, {
    mongooseModel: SponsorType,
    name: 'Sponsor Type',
    pluralName: 'SponsorTypes',
    toString: 'title',
    fields: {
      title: {},
      text: {
        editor: 'markdown'
      }
    }
  }, {
    mongooseModel: Configurable,
    name: 'Configurable',
    pluralName: 'Configurables',
    toString: 'title',
    fields: {
      title: {},
      slogan: {
        editor: 'markdown'
      }
    }
  }, {
    mongooseModel: Presentation,
    name: 'Presentation',
    pluralName: 'Presentations',
    toString: 'title',
    fields: {
      title: {},
      speaker_id: {},
      presentation_type: {},
      subtitle: {
        editor: 'markdown'
      },
      text: {
        editor: 'markdown'
      }
    }
  }, {
    mongooseModel: PresentationType,
    name: 'Presentation Type',
    pluralName: 'PresentationTypes',
    toString: 'title',
    fields: {
      title: {},
      text: {
        editor: 'markdown'
      }
    }
  }, {
    mongooseModel: Conference,
    name: 'Conference',
    pluralName: 'Conferences',
    toString: 'title',
    fields: {
      title: {},
      subtitle: {
        editor: 'markdown'
      },
      description: {
        editor: 'markdown'
      }
    }
  }];

  var credentials = config.credentials;
  var sessionSecret = config.sessionSecret;

  // app configuration
  app.use(function(req, res, next) {
    //return res.send(app.mountpath);
    res.locals.baseUri = app.mountpath ? app.mountpath : '/.';
    next();
  });

  // view engine setup
  app.set('views', __dirname + '/../../app/views/admin');
  app.set('view engine', 'jade');

  app.use(favicon());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());
  // QUITAR
  app.use(require('less-middleware')('../../public/admin'));

  app.use(express.static(__dirname + '/../../public/admin'));
  app.use(sessions({
    cookieName: 'swanAdminSession',
    secret: sessionSecret,
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5
  }));

  // Simple authentication, for now
  app.get('/login', function(req, res, next) {
    res.render('login', {});
  });

  app.post('/login', function(req, res, next) {
    if (req.body.username === credentials.username && req.body.password ===
      credentials.password) {
      req.swanAdminSession.loggedInAs = credentials.username;
      res.redirect(app.mountpath);
    } else {
      next({
        message: __('Invalid credentials')
      });
    }
  });

  app.get('/logout', function(req, res, next) {
    req.swanAdminSession.loggedInAs = null;
    res.redirect(app.mountpath);
  });

  // Any other page requires authentication
  app.use(function(req, res, next) {
    if (req.swanAdminSession.loggedInAs !== credentials.username) {
      res.redirect(app.mountpath + '/login');
    } else {
      res.locals.authenticated = true;
      next();
    }
  })

  // Fill in the models properties
  for (i in models) {
    (function(i) {
      // If this is a Mongoose Model instance, wrap it
      if (models[i].constructor === mongoose.Model.constructor) {
        models[i] = {
          mongooseModel: models[i]
        };
      }

      // Default name: model name
      if (!models[i].name) {
        models[i].name = models[i].mongooseModel.modelName.toLowerCase();
      }

      // Default plural: s
      if (!models[i].pluralName) {
        models[i].pluralName = models[i].name + 's';
      }

      // toString can be a string or a function
      if (models[i].toString === Object.prototype.toString) {
        models[i].toString = '';
      }
      if (typeof(models[i].toString) != 'function') {
        var field = '' + models[i].toString;
        if (field == '') {
          field = 'id';
        }
        models[i].toString = function(instance) {
          return instance[field];
        };
      }

      // Default fields: all of them
      if (!models[i].fields) {
        models[i].fields = {};
      }
      for (j in models[i].mongooseModel.schema.paths) {
        var pathData = models[i].mongooseModel.schema.paths[j];

        if (pathData.path.indexOf('_') != 0) {
          if (!models[i].explicitFieldsOnly || models[i].fields[pathData.path]) {
            if (!models[i].fields[pathData.path]) {
              models[i].fields[pathData.path] = {};
            }

            // Default kind: ask mongoose (why do different, btw?)
            if (!models[i].fields[pathData.path].kind) {
              models[i].fields[pathData.path].kind = pathData.options.type;
            }

            // Default editor: textfield or datetime
            if (!models[i].fields[pathData.path].editor) {
              switch (models[i].fields[pathData.path].kind) {
                case mongoose.Schema.Types.Date:
                case Date:
                  models[i].fields[pathData.path].editor = 'datetime';
                  break;

                case mongoose.Schema.Types.Array:
                case Array:
                  models[i].fields[pathData.path].editor = 'csv';
                  break;

                case mongoose.Schema.Types.Mixed:
                case Object:
                  models[i].fields[pathData.path].editor = 'json';
                  break;

                default:
                  models[i].fields[pathData.path].editor = 'textfield';
                  break;
              }
            }
          }

        }
      }
    })(i);
  }

  function makeList(model) {
    app.get('/' + model.pluralName, function(req, res, next) {
      model.mongooseModel.find(function(err, instances) {
        res.render('list', {
          model: model,
          instances: instances,
          currentPage: 'model-' + model.pluralName
        })
      });
    });
  }

  function parseFieldValue(field, value) {
    switch (field.editor) {
      case 'csv':
        value = value.split(',');
        break;

      case 'json':
        value = JSON.parse(value);
        break;
    }

    return value;
  }

  function makeCreate(model) {
    app.get('/' + model.pluralName + '/create', function(req, res, next) {
      res.render('create', {
        model: model,
        newInstance: {},
        currentPage: 'model-' + model.pluralName
      });
    });

    app.post('/' + model.pluralName + '/create', function(req, res, next) {
      var instance = new model.mongooseModel();

      for (fieldName in model.fields) {
        instance.set(fieldName, parseFieldValue(model.fields[fieldName],
          req.body[fieldName]));

      }
      instance.save(function(err) {
        if (err) {
          return next(err);

          // TODO: Implement validation errors

          // res.render('create', {
          //     model: model,
          //     newInstance: instance,
          //     currentPage: 'model-' + model.pluralName,
          //     error: err,
          // });
        }

        res.redirect(app.mountpath + '/' + model.pluralName);
      });
    });
  }

  function makeEdit(model) {
    app.get('/' + model.pluralName + '/:id', function(req, res, next) {
      model.mongooseModel.findById(req.params.id, function(err, instance) {
        if (err || !instance) {
          return next(err);
        }

        res.render('edit', {
          model: model,
          instance: instance,
          currentPage: 'model-' + model.pluralName
        })
      });
    });

    app.post('/' + model.pluralName + '/:id', function(req, res, next) {
      model.mongooseModel.findById(req.params.id, function(err, instance) {
        if (err || !instance) {
          return next(err);
        }

        for (fieldName in model.fields) {
          instance.set(fieldName, parseFieldValue(model.fields[
            fieldName], req.body[fieldName]));
        }
        instance.save(function(err) {
          if (err) {
            return next(err);
          }

          res.redirect(req.originalUrl);
        });
      });
    });
  }

  function makeRemove(model) {
    app.get('/' + model.pluralName + '/:id/remove', function(req, res, next) {
      model.mongooseModel.findById(req.params.id, function(err, instance) {
        if (err || !instance) {
          return next(err);
        }

        res.render('remove', {
          model: model,
          instance: instance,
          currentPage: 'model-' + model.pluralName
        })
      });
    });

    app.post('/' + model.pluralName + '/:id/remove', function(req, res, next) {
      if (req.body.confirm == 'remove') {
        model.mongooseModel.findByIdAndRemove(req.params.id, function(err,
          instance) {
          if (err || !instance) {
            return next(err);
          }

          res.redirect(app.mountpath + '/' + model.pluralName);
        });
      } else {
        res.redirect(req.originalUrl);
      }
    });
  }

  app.locals.models = models;

  for (i in models) {
    makeList(models[i]);
    makeCreate(models[i]);
    makeEdit(models[i]);
    makeRemove(models[i]);
  }

  app.get('/', function(req, res) {
    models[0].mongooseModel.db.db.executeDbCommand({
      dbStats: 1,
      scale: 1024
    }, function(err, result) {
      res.render('index', {
        stats: result.documents[0],
        currentPage: 'home'
      });
    });
  });

  /// catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  /// error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  return app;
}
