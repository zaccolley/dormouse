<?php

	include('data/config.php');

	$dbh = new PDO('mysql:host='.$config['host'].';', 'root');

	createUser($dbh, $config);
	createDb($dbh, $config);

	$dbh = new PDO('mysql:host='.$config['host'].';'.
				   'dbname='.$config['dbname'],
				   $config['user'], $config['pass']);

	createTables($dbh, $config);

	$dbh = null; // kill db connection

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