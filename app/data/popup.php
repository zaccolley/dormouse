<?php 
	
	header('Content-type: application/json');

	require('db.php');

	$data = json_decode(isset($_REQUEST['data']) ? $_REQUEST['data'] : null);

	$itemId = $data->id;

	$sql = "SELECT * FROM item, category WHERE item.cat_id = category.cat_id AND item.item_id = " . $itemId;
	
	$output = array("items" => array(), "input" => array(), "errors" => array());

	array_push($output["input"], $data);

	$rows = $dbh->query($sql);
	$dbh = null;

	$count = $rows->rowCount();

	if($count){

		foreach($rows as $row){
			$item = array(
				"id" => $row['item_id'],
				"name" => $row['item_name'],
				"desc" => $row['item_desc'],
				"price" => $meta["currency"].$row['item_price'],
				"stock" => $row['item_stock'],
				"cat" => $row['cat_name']
			);

			array_push($output["items"], $item);
			
		}

	}else{
		array_push($output["errors"], "Nope, no items.");
	}

	echo json_encode($output);

?>