# 🐭 - dormouse

e-commerce framework for my WEBSCRP Uni unit

### to run:

+ run `app/create.sql` to create database
+ [install grunt](http://gruntjs.com/getting-started)
+ run `grunt` at root to build
+ dist/ should be created with the built project

### for dev:

run `grunt dev`

this watches any changes to files and automatically builds

run `php -S localhost:9001` for the server


### data api


Resource | POST (Create) | GET (Read) | PUT / PATCH (Update) | DELETE (Delete)
---------|---------------|------------|----------------------|----------------
data/item | create new item | list items | bulk update of items | error
data/item/001 | error | info on item | update if exists or error | delete named item
data/category | create new category | list categories | bulk update of categories | error
data/category/001 | error | info on category | update if exists or error | delete named category
data/category/item | error | list items in category | update if exists or error | error
data/category/item/001 | error | info on item | update if exists or error | delete named item
