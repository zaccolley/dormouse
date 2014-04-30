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
	item_price DECIMAL(10, 2) NOT NULL,
	item_stock INT,
	item_img BOOLEAN,
	cat_id INT NOT NULL,
	PRIMARY KEY (item_id),
	FOREIGN KEY (cat_id) REFERENCES category(cat_id)
);