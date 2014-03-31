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

	// remove trailing
	$uriParts = rtrim($uri, "/");

	// remove the ? data
	if(strpos($uriParts, "?")){
		$uriParts = strstr($uriParts, '?', true);
	}

	$uriParts = explode("/", $uriParts);

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

	$search = null;
	$filter = null;

	if($data && property_exists($data, "search")){
		$search = $data->search;
	}

	if($data && property_exists($data, "filter")){
		$filter = $data->filter;
	}

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
				$output["output"] = $expectedPathName($uriParts, $search, $filter);			
				break;
			}

		}
		
	}

	function categoryItemSingle($uriParts, $search, $filter){
		require('items.php');
		return getItems($uriParts[1], $uriParts[3], $search, $filter);
	}

	function categoryItem($uriParts, $search, $filter){
		require('items.php');
		return getItems(null, $uriParts[1], $search, $filter);
	}

	function itemSingle($uriParts, $search, $filter){
		require('items.php');
		return getItems($uriParts[1], $search, $filter);
	}

	function item($uriParts, $search, $filter){
		require('items.php');
		return getItems(null, null, $search, $filter);
	}

	function category($uriParts, $search, $filter){
		require('categories.php');
		return getCategories();
	}

	function categorySingle($uriParts, $search, $filter){
		require('categories.php');
		return getCategories($uriParts[1]);
	}

	echo json_encode($output);

?>