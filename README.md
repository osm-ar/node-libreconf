# Libreconf

### A simple and libre conference CMS

Based on nodejs, [express](http://expressjs.com/4x/api.html), mongodb, [mongoose](http://mongoosejs.com/docs/guide.html), [jade](http://jade-lang.com/), [i18n](https://www.npmjs.com/package/i18n), [etc.](https://github.com/osm-ar/node-libreconf/blob/develop/package.json)

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

* **Check your MongoDB URL**.

## Administration

Administration now is mostly based on writing raw
MongoDB objects via an admin interface

## Admin Interface 

#### /admin 

The url `/admin` show a [swan-admin](https://npmjs.com/package/swan-admin) instance.

    http://host/admin
    