<?php 
	
	header('Content-type: application/json');

	require('db.php');

	$uri = $_SERVER['REQUEST_URI'];
	$method = $_SERVER['REQUEST_METHOD'];

	$data = json_decode(isset($_REQUEST['data']) ? $_REQUEST['data'] : null);
	
	$output = array("items" => array(),
					"request" => array(),
					"output" => array(),
					"errors" => array());

	$output["request"]["input"] = $data;
	$output["request"]["uri"] = $uri;
	$output["request"]["method"] = $method;





	$uriParts = explode("/", rtrim($uri, "/"));

	if(in_array("data", $uriParts)){
		$uriParts = array_slice($uriParts, array_search("data", $uriParts) + 1);
	}

	$output["request"]["uriParts"] = $uriParts;

	$expectedPaths = array(

		"categoryItemSingle" => array("category", "[0-9]+", "item", "[0-9]+"),
		"categoryItem" => array("category", "[0-9]+", "item"),
		
		"itemSingle" => array("item", "[0-9]+"),
		"item" => array("item"),
		
		"categorySingle" => array("category", "[0-9]+"),
		"category" => array("category")

	);

	foreach($expectedPaths as $expectedPathName => $expectedPath){

		if(sizeof($uriParts) == sizeof($expectedPath)){

			$correct = true;

			for($i = 0; $i < sizeof($uriParts); $i++){
				$match = preg_match("/".$expectedPath[$i]."/i", $uriParts[$i]);
				if(!$match){
					$correct = false;
					break;
				}
			}

			if($correct){
				$output["output"] = $expectedPathName($uriParts);			
				break;
			}

		}
		
	}

	function categoryItemSingle($uriParts){
		require('items.php');
		return getItems($uriParts[1], $uriParts[3]);
	}

	function categoryItem($uriParts){
		require('items.php');
		return getItems(null, $uriParts[1]);
	}

	function category($uriParts){
		require('categories.php');
		return getCategories();
	}

	function categorySingle($uriParts){
		require('categories.php');
		return getCategories($uriParts[1]);
	}

	function itemSingle($uriParts){
		require('items.php');
		return getItems($uriParts[1]);
	}

	function item($uriParts){
		require('items.php');
		return getItems();
	}

	if($data && property_exists($data, "search")){
		// there is a search
	}

	if($data && property_exists($data, "filter")){
		// there is a filter
	}

	echo json_encode($output);

?>