<?php

class Soylesi extends F3instance {
	function show() {
		$this->set('pagetitle','Söyleşi');
		$this->set('template','soylesi');
	}

	function afterroute() {
		echo Template::serve('layout.htm');
	}
}

?>
