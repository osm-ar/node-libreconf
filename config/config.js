var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
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
