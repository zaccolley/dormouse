<?php

	$id = $_POST["id"];

	$path = "images/".$id;

	if(move_uploaded_file($_FILES["image"]["tmp_name"], $path)){
		$result = true;
	}else{
		$result = false;
	}

	echo json_encode($result);

?>