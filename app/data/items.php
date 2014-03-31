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
?>