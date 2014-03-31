<?php 

	require('db.php');

	$data = json_decode(isset($_REQUEST['data']) ? $_REQUEST['data'] : null);

	if($data && property_exists($data, "category")){
		$categories = $data->category;

		foreach($categories as $category){
			$sth = $dbh->query("INSERT INTO category (cat_name) VALUES ('".$category."')");
		}
	}

	if(property_exists($data, "item")){
		$items = $data->item;

		foreach($items as $item){

			if( property_exists($item, "name") && property_exists($item, "desc") && property_exists($item, "price")
				&& property_exists($item, "stock") && property_exists($item, "cat") ){

				$name = $item->name;
				$desc = $item->desc;
				$price = $item->price;
				$stock = $item->stock;
				$cat = $item->cat;

				$sql = "INSERT INTO item (item_name, item_desc, item_price, item_stock, cat_id) VALUES
						('".$name."','".$desc."',".$price.",".$stock.",".$cat.")";
			
				$sth = $dbh->query($sql);
			}else{
				echo print_r($item)." Missing field";
			}

			
		}
	}

	$return = array("request" => $_REQUEST);
	echo json_encode($return);

	$dbh = null;

?>