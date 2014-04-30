<?php

	include('data/config.php');

	$dbh = new PDO('mysql:host='.$config['host'].';', 'root');

	createUser($dbh, $config);
	createDb($dbh, $config);


	$dbh = new PDO('mysql:host='.$config['host'].';'.
				   'dbname='.$config['dbname'],
				   $config['user'], $config['pass']);

	createTables($dbh, $config);
	dummyData($dbh, $config);

	$dbh = null; // kill db connection

	function dummyData($dbh, $config){
		$sql = '

			INSERT INTO category (cat_name) VALUES ("Dogs");
			INSERT INTO category (cat_name) VALUES ("Cats");
			INSERT INTO category (cat_name) VALUES ("Software");

			INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("Sausage Dog", "Its pretty sick. Its a dog.", 50, 100, true, 1);
			INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("West Highland Terrier", "This is our familys dog and its really annoying.", 75, 250, true, 1);
			INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("Ocelot", "Salvidor Dali had one these cuties&hellip;", 7500, 2, true, 2);
			INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("Pepper", "My cat, way too fluffy", 1000000, 1, true, 2);
			INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("Adobe Dreamweaver CS6", "Where dreams are weaved!", 9999, 5, true, 3);
			INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("Inkscape", "Some vector stuff", 20, 30, true, 3);
			INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES ("GIMP", "open source lol", 250, 10, true, 3);';
		
		$res = $dbh->query($sql);

		if(!$res){
			print_r( $dbh->errorInfo() );
		}

	}

	function createUser($dbh, $config){
		$sql = "DROP USER '".$config['user']."'@'".$config['host']."';
				CREATE USER '".$config['user']."'@'".$config['host']."' IDENTIFIED BY '".$config['pass']."';
				GRANT ALL PRIVILEGES ON * . * TO '".$config['user']."'@'".$config['host']."';
				FLUSH PRIVILEGES;";

		$res = $dbh->query($sql);

		if(!$res){
			print_r( $dbh->errorInfo() );
		}
	}

	function createDb($dbh, $config){
		$sql = "CREATE DATABASE ".$config['dbname'];

		$res = $dbh->query($sql);

		if(!$res){
			print_r( $dbh->errorInfo() );
		}
	}

	function createTables($dbh, $config){
		$sql = "CREATE TABLE category(
					cat_id INT NOT NULL AUTO_INCREMENT,
					cat_name VARCHAR(50) NOT NULL,
					PRIMARY KEY (cat_id)
				);";

		$sql .= "CREATE TABLE item(
					item_id INT NOT NULL AUTO_INCREMENT,
					item_name VARCHAR(50) NOT NULL,
					item_desc VARCHAR(255),
					item_price DECIMAL(10, 2) NOT NULL,
					item_stock INT,
					item_img BOOLEAN,
					cat_id INT NOT NULL,
					PRIMARY KEY (item_id),
					FOREIGN KEY (cat_id) REFERENCES category(cat_id)
				);";

		$res = $dbh->query($sql);

		if(!$res){
			print_r( $dbh->errorInfo() );
		}
	}

?>