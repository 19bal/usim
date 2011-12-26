<?php
	// add_edge.php?from=' + from.getId() + '&to=' + to.getId() + '&value=' + value

	$from_id = $_GET['from'];
	$to_id   = $_GET['to'];
	$link_text = $_GET['value'];

	echo "Edge:Add <br>from: $from_id, to: $to_id, value: $value";
?>
