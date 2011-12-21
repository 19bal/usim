<?php
	require_once  '../lib/base.php';
	require_once  '../inc/depo.php';
	require_once  '../inc/mylib.php';

	F3::set('DB', new DB("mysql:host=localhost;port=3306;dbname=$db_name", $db_user, $db_pass));

	// params to session
	$cid 	= $_GET['cid'];
	$ntype 	= $_GET['ntype'];
	$parent = isset($_GET['parent']) ? $_GET['parent'] : null;
	$id 	= isset($_GET['id']) ? $_GET['id'] : null;

	$nid = create_new_node($cid, $ntype, $parent, $id);

	echo $nid;
?>
