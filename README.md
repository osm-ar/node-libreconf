# Libreconf

### A simple and libre conference CMS

Based on nodejs, [express](http://expressjs.com/4x/api.html), mongodb, [mongoose](http://mongoosejs.com/docs/guide.html), [jade](http://jade-lang.com/), [i18n](https://www.npmjs.com/package/i18n), [etc.](https://github.com/osm-ar/node-libreconf/blob/develop/package.json)

![image](http://i.imgur.com/bU0A3fh.png)


## Installation

Asuming you already have [Node.js](http://nodejs.org/) and git installed:

### Clone node-libreconf

```shell
$ git clone https://github.com/osm-ar/node-libreconf
$ cd node-libreconf
$ npm install
```

### Run / Ejecutar
```shell
$ gulp
```

[You can create an issue here.](https://github.com/osm-ar/node-libreconf/issues)

## Configuration

Set `config/config.js` with your own values.

![image](http://i.imgur.com/8rwkghc.png)

The configuration object has main properties on which config values
are set.

    var config = {
      development: {},
      test: {},
      production: {}
    }

 The set of config values affecting the rutime depends on the environment variable `ENV`. 
 
 If `ENV` is set to `development`, then the config values under the property `development` will be used by the runtime and not the others.

**By default, and if `ENV` is not set, the config values under the  `development` property will be used**.

** Tip** 
* **Check your MongoDB URL first in your config values**.

## Administration

Administration currently is mostly based on writing raw
MongoDB objects via a web admin interface based on a [swan-admin](https://npmjs.com/package/swan-admin) instance.

## Admin Interface 

The admin interface has a default user/password combination:

* **User**: `geoinquietos`
* **Password**: `libreconf`


The url `/admin` show a [swan-admin](https://npmjs.com/package/swan-admin) instance.

    http://host/admin
    
