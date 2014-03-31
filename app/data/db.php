<?php

	// databases

	include('config.php');
	
	try{
		$dbh = new PDO('mysql:host='.$config['host'].';'.
					   'dbname='.$config['dbname'],
					   $config['user'], $config['pass']);
	}catch(PDOException $e){
		echo "Error: ". $e->getMessage();
		die();
	}

?>