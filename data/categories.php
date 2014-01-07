<?php 
	
	header('Content-type: application/json');

	require('db.php');

	$rows = $dbh->query("SELECT * FROM category");
	$dbh = null;

	$categories = array("categories" => array());

	foreach($rows as $row){
		array_push($categories["categories"], $row['cat_name']);
	}

	echo json_encode($categories, JSON_PRETTY_PRINT);

?>