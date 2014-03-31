<?php 

	function getCategories($catId = null){

		require('db.php');

		$output = array("categories" => array(), "errors" => array());

		$sql = "SELECT * FROM category";

		if($catId){
			$sql .= " WHERE cat_id='".$catId."'";
		}

		$sql .= " ORDER BY cat_name ASC";

		$rows = $dbh->query($sql);
		$dbh = null;

		$count = $rows->rowCount();

		if($count){

			foreach($rows as $row){
				$category = array(
					"id" => $row['cat_id'],
					"name" => $row['cat_name']
				);

				array_push($output["categories"], $category);
			}

		}else{
			array_push($output["errors"], "No categories.");
		}

		return $output;

	}

?>