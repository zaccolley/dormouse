-- create database

CREATE DATABASE hedgerows;

-- create user

CREATE USER 'dormouse'@'localhost' IDENTIFIED BY 'hazel';
GRANT ALL PRIVILEGES ON * . * TO 'dormouse'@'localhost';
FLUSH PRIVILEGES;

-- create tables

-- DROP TABLE category;

CREATE TABLE category(
	cat_id INT PRIMARY KEY,
	cat_name VARCHAR(50) NOT NULL
);

INSERT INTO category VALUES (0, "All");
INSERT INTO category VALUES (1, "Baby");
INSERT INTO category VALUES (2, "Beauty");
INSERT INTO category VALUES (3, "Books");
INSERT INTO category VALUES (4, "Car &amp; Motorbike");
INSERT INTO category VALUES (5, "Classical");
INSERT INTO category VALUES (6, "Clothing");
INSERT INTO category VALUES (7, "Computers &amp; Accessories");
INSERT INTO category VALUES (8, "DIY &amp; Tools");
INSERT INTO category VALUES (9, "Electronics &amp; Photo");
INSERT INTO category VALUES (10, "Film &amp; TV");
INSERT INTO category VALUES (11, "Garden &amp; Outdoors");
INSERT INTO category VALUES (12, "Gift Cards");
INSERT INTO category VALUES (13, "Grocery");
INSERT INTO category VALUES (14, "Health &amp; Personal Care");
INSERT INTO category VALUES (15, "Jewellery");
INSERT INTO category VALUES (16, "Kindle Store");
INSERT INTO category VALUES (17, "Kitchen &amp; Home");
INSERT INTO category VALUES (18, "Large Appliances");
INSERT INTO category VALUES (19, "Lighting");
INSERT INTO category VALUES (20, "Luggage");
INSERT INTO category VALUES (21, "Music");
INSERT INTO category VALUES (22, "Musical Instruments &amp; DJ");
INSERT INTO category VALUES (23, "PC &amp; Video Games");
INSERT INTO category VALUES (24, "Pet Supplies");
INSERT INTO category VALUES (25, "Shoes &amp; Bags");
INSERT INTO category VALUES (26, "Software");
INSERT INTO category VALUES (27, "Sports &amp; Outdoors");
INSERT INTO category VALUES (28, "Stationery &amp; Office Supplies");
INSERT INTO category VALUES (29, "Toys &amp; Games");
INSERT INTO category VALUES (30, "VHS");
INSERT INTO category VALUES (31, "Watches");

-- DROP TABLE item;

CREATE TABLE item(
	item_id INT PRIMARY KEY,
	item_name VARCHAR(50) NOT NULL,
	item_desc VARCHAR(255),
	item_price VARCHAR(5) NOT NULL,
	cat_id INT NOT NULL,
	FOREIGN KEY (cat_id) REFERENCES category(cat_id)
);

INSERT INTO item VALUES (0, "Sausage Dog", "It's pretty sick. It's a dog.", "50", 3);
INSERT INTO item VALUES (1, "West Highland Terrier", "This is our family's dog and it's really annoying.", "75", 5);
INSERT INTO item VALUES (2, "Ocelot", "Salvidor Dali had one these cuties&hellip;", "7500", 7);
INSERT INTO item VALUES (3, "Adobe Dreamweaver CS6", "Where dreams are weaved!", "-Life", 9);