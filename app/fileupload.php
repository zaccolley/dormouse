<?php

	// this file is for uploading images

	include('data/db.php');

	$sql = "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'hedgerows' AND TABLE_NAME = 'item';";

	$res = $dbh->query($sql);

	$id = $res->fetch()[0];

	$path = "images/".$id;

	echo $path;

	if(move_uploaded_file($_FILES["image"]["tmp_name"], $path)){
		$result = true;
	}else{
		$result = false;
	}

	echo json_encode($result);

?>