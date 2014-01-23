<?php 
	
	header('Content-type: application/json');

	require('db.php');

	$data = json_decode(isset($_REQUEST['data']) ? $_REQUEST['data'] : null);

	$sql = "SELECT * FROM item, category WHERE item.cat_id = category.cat_id";
	
	$output = array("items" => array(), "data" => array(), "errors" => array());

	array_push($output["data"], $data);

	if($data && property_exists($data, "category")){
		$category = $data->category;


		$sql .= " AND cat_name = '".$category."'";
	}

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