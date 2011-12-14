<?php

class soylesi extends Home {
	function show() {
		$version = $this->_getversion();

		$this->set("pagetitle", "Söyleşi-$version");
		$this->set("template",  "soylesi_$version");
	}
}

?>
