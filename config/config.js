var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    theme: 'foss4g-ba-2016',
    locales: ["en", "es", "fr", "de", "ja", "pt"],
    locales_path: './locales',
    default_locale: 'es',
    locale_cookie: '_lang_',
    app: {
      name: 'node-libreconf'
    },
    port: 3005,
    db: 'mongodb://localhost/node-libreconf-development',
    credentials: {
      username: process.env.LIBRECONF_ADMIN_USERNAME || 'geoinquietos',
      password: process.env.LIBRECONF_ADMIN_PASSWORD || 'libreconf'
    },
    sessionSecret: 'a55d2ddb9d2d55d2ddb9hsa5555d255d2ddb9j2vc9'
  },

  test: {
    root: rootPath,
    theme: 'default',
    locales: ["en", "es", "fr", "de", "ja", "pt"],
    locales_path: './locales',
    default_locale: 'es',
    locale_cookie: '_lang_',
    app: {
      name: 'node-libreconf'
    },
    port: 3000,
    db: 'mongodb://localhost/node-libreconf-test',
    credentials: {
      username: process.env.LIBRECONF_ADMIN_USERNAME || 'geoinquietos',
      password: process.env.LIBRECONF_ADMIN_PASSWORD || 'libreconf'
    },
    sessionSecret: 'a55d2ddb9d2d55d2ddb9hsa5555d255d2ddb9j2vc9'
  },

  production: {
    root: rootPath,
    theme: 'default',
    locales: ["en", "es", "fr", "de", "ja", "pt"],
    locales_path: './locales',
    default_locale: 'es',
    locale_cookie: '_lang_',
    app: {
      name: 'node-libreconf'
    },
    port: 3000,
    db: 'mongodb://localhost/node-libreconf-production',
    credentials: {
      username: process.env.LIBRECONF_ADMIN_USERNAME || 'geoinquietos',
      password: process.env.LIBRECONF_ADMIN_PASSWORD || 'libreconf'
    },
    sessionSecret: 'a55d2ddb9d2d55d2ddb9hsa5555d255d2ddb9j2vc9'
  }
};

module.exports = config[env];
