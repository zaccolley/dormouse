-- create database

CREATE DATABASE hedgerows;

-- create user

CREATE USER 'dormouse'@'localhost' IDENTIFIED BY 'hazel';
GRANT ALL PRIVILEGES ON * . * TO 'dormouse'@'localhost';
FLUSH PRIVILEGES;

-- drop tables

DROP TABLE item;
DROP TABLE category;

-- create tables

CREATE TABLE category(
	cat_id INT NOT NULL AUTO_INCREMENT,
	cat_name VARCHAR(50) NOT NULL,
	PRIMARY KEY (cat_id)
);

CREATE TABLE item(
	item_id INT NOT NULL AUTO_INCREMENT,
	item_name VARCHAR(50) NOT NULL,
	item_desc VARCHAR(255),
	item_price INT NOT NULL,
	item_stock INT,
	cat_id INT NOT NULL,
	PRIMARY KEY (item_id),
	FOREIGN KEY (cat_id) REFERENCES category(cat_id)
);

-- insert values

INSERT INTO category (cat_name) VALUES
("Dogs"), ("Cats"), ("Software");

INSERT INTO item (item_name, item_desc, item_price, item_stock, cat_id) VALUES
("Sausage Dog", "It's pretty sick. It's a dog.", 50, 100, 1),
("West Highland Terrier", "This is our family's dog and it's really annoying.", 75, 250, 1),
("Ocelot", "Salvidor Dali had one these cuties&hellip;", 7500, 2, 2),
("Adobe Dreamweaver CS6", "Where dreams are weaved!", 9999, 0, 3),
("Pepper", "My cat, way too fluffy", 1000000, 1, 2);