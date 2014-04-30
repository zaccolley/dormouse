# 🐭 - dormouse

e-commerce framework for my WEBSCRP Uni unit

### to run:

+ run `app/create.sql` to create database
+ [install grunt](http://gruntjs.com/getting-started)
+ run `grunt build` at root to build
+ dist/ should be created with the built project

### for dev:

run `grunt`

this watches any changes to files and automatically builds

navigate to [`localhost/dormouse/dist`](http://localhost/dormouse/dist) for the live copy


### data api:


Resource | POST (Create) | GET (Read) | PATCH (Update) | DELETE (Delete)
---------|---------------|------------|----------------------|----------------
data/item | create new item | list items | error | error
data/item/001 | error | info on item | update if exists or error | delete named item
data/category | create new category | list categories | error| error
data/category/001 | error | info on category | update if exists or error | delete category
data/category/item | error | list items in category | error | error

#### references:

+ [css reset: http://meyerweb.com/eric/tools/css/reset/](http://meyerweb.com/eric/tools/css/reset/)
+ [findById: http://jsfiddle.net/rwaldron/j3vST/](http://jsfiddle.net/rwaldron/j3vST/)
+ [formatMoney: http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript](http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript)
+ [Yin-Yang background: http://lea.verou.me/css3patterns/#yin-yang](http://lea.verou.me/css3patterns/#yin-yang)
+ [Font Awesome: http://fortawesome.github.io/Font-Awesome/](http://fortawesome.github.io/Font-Awesome/)
+ Open Sans
+ Image file input: https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications

