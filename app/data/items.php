<?php 
	
	function getItems($itemId = null, $catId = null, $search = null, $filter = null){
	
		require('db.php');

		$output = array("items" => array(), "errors" => array());
		
		$sql = "SELECT * FROM item, category WHERE item.cat_id = category.cat_id";

		if($itemId){
			$sql .= " AND item.item_id = '".$itemId."'";
		}

		if($catId){
			$sql .= " AND category.cat_id = '".$catId."'";
		}

		if($search){
			$sql .= " AND (item_name LIKE '%".$search."%' OR item_desc LIKE '%".$search."%' OR cat_name LIKE '%".$search."%')";
		}

		if($filter){
			$sql .= " ORDER BY ";

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
				default:
					$sql .= "item_name ASC";
					break;

			}

		}

		$rows = $dbh->query($sql);

		if(!$rows){
			array_push($output["result"], "Error");
			array_push($output["errors"], $dbh->errorInfo());
		}

		$dbh = null;

		$count = $rows->rowCount();

		if($count){

			foreach($rows as $row){
				$item = array(
					"id" => $row['item_id'],
					"name" => $row['item_name'],
					"desc" => $row['item_desc'],
					"price" => array("currency" => $meta["currency"], "value" => $row['item_price']),
					"stock" => $row['item_stock'],
					"img" => $row['item_img'],
					"cat" => array('id' => $row['cat_id'], 'name' => $row['cat_name'])
				);

				array_push($output["items"], $item);
				
			}

		}else{
			array_push($output["errors"], "No items.");
		}

		return $output;

	}

	function addItems($items = null){

		require('db.php');

		$output = array("result" => array(), "errors" => array());

		if($items){

			foreach($items as $item){

				if($item->name && $item->desc && $item->price && $item->stock && $item->img && $item->cat){

					$name = addslashes($item->name);
					$desc = addslashes($item->desc);
					$price = $item->price;
					$stock = $item->stock;
					$img = $item->img;
					$cat = $item->cat;

					$sql = "INSERT INTO item (item_name, item_desc, item_price, item_stock, item_img, cat_id) VALUES
							('".$name."','".$desc."',".$price.",".$stock.",".$img.",".$cat.")";
				
					$sth = $dbh->query($sql);

					if(!$sth){
						array_push($output["result"], "Error");
						array_push($output["errors"], $dbh->errorInfo());
					}else{
						array_push($output["result"], "Successfully added ".$itemId);
					}

				}else{
					array_push($output["errors"], "Missing field");
				}

			}

			$dbh = null;

		}else{
			array_push($output["errors"], "No items to add");
		}

		return $output;

	}

	function deleteItems($itemId = null){

		require('db.php');

		$output = array("result" => array(), "errors" => array());

		if($itemId){

			$sth = $dbh->query("DELETE FROM item WHERE item_id =".$itemId);

			if(!$sth){
				array_push($output["result"], "Error");
				array_push($output["errors"], $dbh->errorInfo());
			}else{
				array_push($output["result"], "Successfully deleted ".$itemId);
			}

			$dbh = null;

		}else{
			array_push($output["errors"], "No items to delete");
		}

		return $output;

	}

	function updateItems($itemId = null, $itemData = null){

		require('db.php');

		$output = array("result" => array(), "errors" => array());

		if($itemId && $itemData){

			$name = addslashes($itemData->name);
			$desc = addslashes($itemData->desc);
			$price = $itemData->price;
			$stock = $itemData->stock;
			$img = $itemData->img;
			$cat = $itemData->cat;

			$sql = "UPDATE item SET item_name = '".$name."', item_desc = '".$desc."', item_price = '".$price."', item_stock = ".$stock.", item_img = '".$img."', cat_id = ".$cat." WHERE item_id =".$itemId;

			$sth = $dbh->query($sql);

			if(!$sth){
				array_push($output["result"], "Error");
				array_push($output["errors"], $dbh->errorInfo());
			}else{
				array_push($output["result"], "Successfully updated ".$itemId);
			}

			$dbh = null;

		}else{
			array_push($output["errors"], "No id or data given to update");
		}

		return $output;

	}

?>