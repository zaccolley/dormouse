<?php

	// databases

	include('config.php');
	
	// if cant connect to db throw an error
	try{
		$dbh = new PDO('mysql:host='.$config['host'].';'.
					   'dbname='.$config['dbname'],
					   $config['user'], $config['pass']);
	}catch(PDOException $e){
		echo "Error: ". $e->getMessage();
		die();
	}

?>