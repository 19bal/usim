<?php
	// add_node.php?cid=' + getCID() + '&id=' + node.getId() + '&ntype=' + node.getType() + '&title=' + node.getName()

	$cid = $_GET['cid'];
	$id  = $_GET['id'];
	$ntype = $_GET['ntype'];
	$title = $_GET['title'];
	
	/* - id == null ise ilk  defa oluşturuluyor demektir.
	 *   + id degerini node tablosundan maxId() + 1 yap
	 * - var olan ise değer güncelleme yapılacak.
	 */

	//echo "<b>TODO</b>: Node:Add <br>cid = $cid, ntype=$ntype, title=$title";
	echo ord($title[0]);
?>
