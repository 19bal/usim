<?php
	// get_nodes.php?cid=

	$cid = $_GET['cid'];

	//$nodes = array("a"=>99, "b"=>2, "c"=>3);
	$nodes = array(array("id" => 1, "name" => "nodeismi", "type" => "ilaç"),
				   array("id" => 2, "name" => "bazı",     "type" => "dal"),
				   array("id" => 4, "name" => "garip",    "type" => "ilaç"),
				   array("id" => 8, "name" => "binode",   "type" => "tahlil"));				   

	echo json_encode($nodes);
?>
