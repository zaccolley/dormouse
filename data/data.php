<?php 
	
	header('Content-type: application/json');

	// DATA

	$data = array(
		'title' => "Zac's Fun Shop - WOWEEE!",
		'name' => "Zac's Fun Shop",
		'desc' => "Where you can buy things"
	);

	echo json_encode($data);

?>