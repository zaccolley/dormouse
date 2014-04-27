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

		$count = $rows->rowCount();

		if(!$rows){
			array_push($output["result"], "Error");
			array_push($output["errors"], $dbh->errorInfo());
		}
		
		$dbh = null;

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

	function addCategories($categories = null){

		require('db.php');

		$output = array("result" => array(), "errors" => array());

		if($categories){

			foreach($categories as $category){
				$sth = $dbh->query("INSERT INTO category (cat_name) VALUES ('".$category."')");
			}

			if(!$sth){
				array_push($output["result"], "Error");
				array_push($output["errors"], $dbh->errorInfo());
			}else{
				array_push($output["result"], "Successfully added ".$catId);
			}

			$dbh = null;

		}else{
			array_push($output["errors"], "No categories to add");
		}

		return $output;

	}

	function updateCategories($catId = null, $catName = null){

		require('db.php');

		$output = array("result" => array(), "errors" => array());

		if($catId && $catName){

			$sth = $dbh->query("UPDATE category SET cat_name = '".$catName."' WHERE cat_id =".$catId);

			if(!$sth){
				array_push($output["result"], "Error");
				array_push($output["errors"], $dbh->errorInfo());
			}else{
				array_push($output["result"], "Successfully updated ".$catId);
			}

			$dbh = null;

		}else{
			array_push($output["errors"], "No id or name given to update");
		}

		return $output;

	}

	function deleteCategories($catId = null){

		require('db.php');

		$output = array("result" => array(), "errors" => array());

		if($catId){

			$sth = $dbh->query("DELETE FROM category WHERE cat_id =".$catId);

			if(!$sth){
				array_push($output["result"], "Error");
				array_push($output["errors"], $dbh->errorInfo());
			}else{
				array_push($output["result"], "Successfully deleted ".$catId);
			}

			$dbh = null;

		}else{
			array_push($output["errors"], "No categories to delete");
		}

		return $output;

	}

?>