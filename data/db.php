<?php
	
	error_reporting(E_ALL);
	ini_set("display_errors", 1);

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

	$results = $dbh->query("SELECT * FROM category");

	foreach($results as $result){
		echo "<p>".$result['cat_id']." | ".$result['cat_name']."</p>";
	}

	$dbh = null;

?>