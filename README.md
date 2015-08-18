# Libreconf
                                                        
### A simple and libre conference CMS 

## Getting started

### Install

```shell
$ git clone https://github.com/f3rnando/node-libreconf.git
$ cd node-libreconf
$ npm install
```

### Run
```shell
$ gulp
```

### MVC

* app/
  * controllers
    * home.js
  * models
    * article.js, presentation.js, speaker.js, sponsor.js, sponsor_type.js

* themes/
  * default/ (semantic-ui based theme)
    * css/, js/, img/, etc.

* lib/
  * semantic-ui/ (you can compile your custom semantic-ui, and automate the process in /gulpfile.js)
