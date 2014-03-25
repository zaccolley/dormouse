-- reset

DROP DATABASE hedgerows;
DROP USER 'dormouse'@'localhost';

-- create database

CREATE DATABASE hedgerows;
USE hedgerows;

-- create user

CREATE USER 'dormouse'@'localhost' IDENTIFIED BY 'hazel';
GRANT ALL PRIVILEGES ON * . * TO 'dormouse'@'localhost';
FLUSH PRIVILEGES;

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
	item_img BOOLEAN,
	cat_id INT NOT NULL,
	PRIMARY KEY (item_id),
	FOREIGN KEY (cat_id) REFERENCES category(cat_id)
);

-- insert values

INSERT INTO category (cat_name) VALUES ("Dogs");
INSERT INTO category (cat_name) VALUES ("Cats");
INSERT INTO category (cat_name) VALUES ("Software");

INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("Sausage Dog", "It's pretty sick. It's a dog.", 50, 100, true, 1);
INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("West Highland Terrier", "This is our family's dog and it's really annoying.", 75, 250, true, 1);
INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("Ocelot", "Salvidor Dali had one these cuties&hellip;", 7500, 2, true, 2);
INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("Pepper", "My cat, way too fluffy", 1000000, 1, false, 2);
INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("Adobe Dreamweaver CS6", "Where dreams are weaved!", 9999, 0, false, 3);