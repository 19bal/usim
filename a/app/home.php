<?php

class Home extends F3instance {
	function show($title='Home', $template='home') {
		$this->set('pagetitle', $title);
		$this->set('template', $template);
	}

	function route() {
		/* PARAMS
		 * - /@proje/@version veya 
		 * - /@proje
		 *
		 * Test URL
		 * - usim/foo		-> proje=foo, version=NULL
		 * - usim/foo/bar	-> proje=foo, version=bar
		 */

		$proje = $this->_getproje();
		$version = $this->_getversion();

		if($version)
			$this->show("$proje-$version", $proje."_$version");
		else
			$this->show("$proje-GENEL", $proje);
	}
	
	function _getproje() {
		$proje = $this->get('PARAMS.proje');
		if($this->get('dbg'))	echo "[DEBUG] Home:proje = '$proje'<br>";
		
		return $proje;
	}

	function _getversion() {
		$version = $this->get('PARAMS.version');
		if(empty($version)) $version = NULL;
		if($this->get('dbg'))	echo "[DEBUG] Home:version = '$version'<br>";

		return $version;
	}

	function afterroute() {
		echo Template::serve('layout.htm');
	}
}

?>
