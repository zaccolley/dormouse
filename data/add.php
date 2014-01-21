<?php 

	require('db.php');

	$data = json_decode(isset($_REQUEST['data']) ? $_REQUEST['data'] : null);

	if($data && property_exists($data, "category")){
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