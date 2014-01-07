<?php 
	
	header('Content-type: application/json');

	require('db.php');

	$rows = $dbh->query("SELECT * FROM items");
	$dbh = null;

	$items = array("items" => array());

	foreach($rows as $row){
		$item = array(
			"id" => $row['item_id'],
			"name" => $row['item_name'],
			"desc" => $row['item_desc'],
			"price" => $meta["currency"].$row['item_price'],
			"cat" => $row['cat_id']
		);

		array_push($items["items"], $item);
	}

	

	echo json_encode($items, JSON_PRETTY_PRINT);

?>