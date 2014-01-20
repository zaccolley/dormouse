<?php 

	require('db.php');

	$data = isset($_REQUEST['data']) ? $_REQUEST['data'] : "dead";

	$data = json_decode($data);

	if(property_exists($data, "category")){
		$categories = $data->category;

		foreach($categories as $category){
			$sth = $dbh->query("INSERT INTO category (cat_name) VALUES ('".$category."')");
		}
	}

	// if(property_exists($data, "item")){
	// 	$items = $data->item;

	// 	foreach($items as $item){
	// 		// $sth = $dbh->query("INSERT INTO category (cat_name) VALUES ('".$item."')");
	// 	}
	// }

	$return = array("request" => $_REQUEST);
	echo json_encode($return);

	$dbh = null;

?>