<?php 
	
	header('Content-type: application/json');

	require('db.php');

	$data = json_decode(isset($_REQUEST['data']) ? $_REQUEST['data'] : null);

	$sql = "SELECT * FROM item, category WHERE item.cat_id = category.cat_id";

	if($data && property_exists($data, "search")){
		$search = $data->search;

		$sql .= " AND (item_name LIKE '%".$search."%' OR item_desc LIKE '%".$search."%' OR cat_name LIKE '%".$search."%')";
	}

	if($data && property_exists($data, "filter")){
		$sql .= " ORDER BY ";

		$filter = $data->filter;

		switch($filter){
			
			case 'price-desc':
				$sql .= "item_price DESC";
				break;

			case 'price-asc':
				$sql .= "item_price ASC";
				break;
			
			case 'name-desc':
				$sql .= "item_name DESC";
				break;

			case 'none':
			case 'name-asc':
				$sql .= "item_name ASC";
				break;

			default: break;

		}

	}

	$rows = $dbh->query($sql);
	$dbh = null;

	$items = array("items" => array());

	foreach($rows as $row){
		$item = array(
			"id" => $row['item_id'],
			"name" => $row['item_name'],
			"desc" => $row['item_desc'],
			"price" => $meta["currency"].$row['item_price'],
			"stock" => $row['item_stock'],
			"cat" => $row['cat_name']
		);

		array_push($items["items"], $item);
	}

	echo json_encode($items);

?>