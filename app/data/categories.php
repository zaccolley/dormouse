<?php

	// this file contains the categories functions


	// get categories
	function getCategories($catId = null){

		require('db.php');

		$output = array("categories" => array(), "errors" => array());

		$sql = "SELECT * FROM category";

		// if a category is specified here we filter
		if($catId){
			$sql .= " WHERE cat_id='".$catId."'";
		}

		$sql .= " ORDER BY cat_name ASC";

		$rows = $dbh->query($sql);

		$count = $rows->rowCount();

		// if there are no rows produce an error
		if(!$rows){
			array_push($output["result"], "Error");
			array_push($output["errors"], $dbh->errorInfo());
		}
		
		$dbh = null; // kill db connection

		if($count){ // if there was a result

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

	// add categories
	function addCategories($categories = null){

		require('db.php');

		$output = array("result" => array(), "errors" => array());

		if($categories){

			// loop through categories
			foreach($categories as $category){
				$category = addslashes($category);
				
				$sth = $dbh->query("INSERT INTO category (cat_name) VALUES ('".$category."')");
			}

			// if there is no result there is an error
			if(!$sth){
				array_push($output["result"], "Error");
				array_push($output["errors"], $dbh->errorInfo());
			}else{
				array_push($output["result"], "Successfully added ".$catId);
			}

			$dbh = null; // kill db connection

		}else{
			array_push($output["errors"], "No categories to add");
		}

		return $output;

	}

	// update categories
	function updateCategories($catId = null, $catName = null){

		require('db.php');

		$output = array("result" => array(), "errors" => array());

		// if both an id and name are supplied
		if($catId && $catName){
			$catName = addslashes($catName);

			$sth = $dbh->query("UPDATE category SET cat_name = '".$catName."' WHERE cat_id =".$catId);

			// handle errors
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

	// delete categories
	function deleteCategories($catId = null){

		require('db.php');

		$output = array("result" => array(), "errors" => array());

		if($catId){

			$sth = $dbh->query("DELETE FROM category WHERE cat_id =".$catId);

			// handle errors
			if(!$sth){
				array_push($output["result"], "Error");
				array_push($output["errors"], $dbh->errorInfo());
			}else{
				array_push($output["result"], "Successfully deleted ".$catId);
			}

			$dbh = null; // kill db connection

		}else{
			array_push($output["errors"], "No categories to delete");
		}

		return $output;

	}

?>