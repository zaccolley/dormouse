<?php 
	
	header('Content-type: application/json');

	require('db.php');

	$uri = $_SERVER['REQUEST_URI'];
	$method = $_SERVER['REQUEST_METHOD'];

	$data = json_decode(isset($_REQUEST['data']) ? $_REQUEST['data'] : null);

	$output = array("items" => array(),
					"request" => array(),
					"output" => array());

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
	$category = null;
	$item = null;

	if($data && property_exists($data, "search")){
		$search = $data->search;
	}

	if($data && property_exists($data, "filter")){
		$filter = $data->filter;
	}

	if($data && property_exists($data, "category")){
		$category = $data->category;
	}

	if($data && property_exists($data, "item")){
		$item = $data->item;
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
				$function = $method.$expectedPathName;
				$output["output"] = $function($uriParts, $search, $filter, $category, $item);			
				break;
			}

		}
		
	}

// data/item

	// POST - Create
	function POSTitem($uriParts, $search, $filter, $category, $item){
		// create new item
		require('items.php');
		return addItems($item);
	}

	// GET - Read
	function GETitem($uriParts, $search, $filter, $category, $item){
		// list items
		require('items.php');
		return getItems(null, null, $search, $filter);
	}

	// PATCH - Update
	function PATCHitem(){
		// error
		return array("error" => "Can't bulk update all items use: data/item/001");
	}

	// DELETE - Delete
	function DELETEitem(){
		// error
		return array("error" => "Can't bulk delete all items use: data/item/001");
	}

// data/item/001

	// POST - Create
	function POSTitemSingle(){
		// error
		return array("error" => "Use: data/item");
	}

	// GET - Read
	function GETitemSingle($uriParts, $search, $filter, $category, $item){
		// info on item
		require('items.php');
		return getItems($uriParts[1], $search, $filter);
	}

	// PATCH - Update
	function PATCHitemSingle($uriParts, $search, $filter, $category, $item){
		// update if exists or error
		require('items.php');
		return updateItems($uriParts[1], $item[0]);
	}

	// DELETE - Delete
	function DELETEitemSingle($uriParts, $search, $filter, $category, $item){
		// delete item
		require('items.php');
		return deleteItems($uriParts[1]);
	}

// data/category

	// POST - Create
	function POSTcategory($uriParts, $search, $filter, $category, $item){
		// create new category
		require('categories.php');
		return addCategories($category);
	}

	// GET - Read
	function GETcategory($uriParts, $search, $filter, $category, $item){
		// list categories
		require('categories.php');
		return getCategories();
	}

	// PATCH - Update
	function PATCHcategory(){
		// error
		return array("error" => "Can't bulk update all categories use: data/category/001");
	}

	// DELETE - Delete
	function DELETEcategory(){
		// error
		return array("error" => "Can't delete all categories use: data/category/001");
	}

// data/category/001

	// POST - Create
	function POSTcategorySingle(){
		// error
		return array("error" => "Use: data/category");
	}

	// GET - Read
	function GETcategorySingle($uriParts, $search, $filter, $category, $item){
		// info on category
		require('categories.php');
		return getCategories($uriParts[1]);
	}

	// PATCH - Update
	function PATCHcategorySingle($uriParts, $search, $filter, $category, $item){
		// update if exists or error
		require('categories.php');
		return updateCategories($uriParts[1], $category);
	}

	// DELETE - Delete
	function DELETEcategorySingle($uriParts, $search, $filter, $category, $item){
		// delete category
		require('categories.php');
		return deleteCategories($uriParts[1]);
	}

// data/category/item

	// POST - Create
	function POSTcategoryItem(){
		// error
		return array("error" => "Use: data/item");
	}

	// GET - Read
	function GETcategoryItem($uriParts, $search, $filter, $category, $item){
		// list items in category
		require('items.php');
		return getItems(null, $uriParts[1], $search, $filter);
	}

	// PATCH - Update
	function PATCHcategoryItem(){
		// error
		return array("error" => "Use: data/item");
	}

	// DELETE - Delete
	function DELETEcategoryItem(){
		// error
		return array("error" => "Use: data/item");
	}

	echo json_encode($output);

?>