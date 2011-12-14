<?php

class Home extends F3instance {
	function show() {
		$this->set('pagetitle','Home');
		$this->set('template','home');
	}

	function afterroute() {
		echo Template::serve('layout.htm');
	}
}

?>
