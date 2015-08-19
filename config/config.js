var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    theme: 'foss4g-ba-2016',
    locales: ["en", "es", "fr", "de", "ja", "pt"],
    locales_path: './config/locales',
    app: {
      name: 'node-libreconf'
    },
    port: 3000,
    db: 'mongodb://localhost/node-libreconf-development'
  },

  test: {
    root: rootPath,
    theme: 'default',
    locales: ["en", "es", "fr", "de", "ja", "pt"],
    locales_path: './config/locales',
    app: {
      name: 'node-libreconf'
    },
    port: 3000,
    db: 'mongodb://localhost/node-libreconf-test'
  },

  production: {
    root: rootPath,
    theme: 'default',
    locales: ["en", "es", "fr", "de", "ja", "pt"],
    locales_path: './config/locales',
    app: {
      name: 'node-libreconf'
    },
    port: 3000,
    db: 'mongodb://localhost/node-libreconf-production'
  }
};

module.exports = config[env];
