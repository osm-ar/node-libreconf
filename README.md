### Steps to start

Install gulp and yeoman

```shell
$ npm install -g gulp yo
```

Install the yeoman express generator locally: 

```
$ npm install generator-express
```

Start it with gulp

```
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