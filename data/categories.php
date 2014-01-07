<?php 
	
	header('Content-type: application/json');

	// DATA

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
	$dbh = null;

	$categories = array();

	foreach($results as $result){
		array_push($categories, $result['cat_name']);
	}


	echo json_encode($categories);

?>