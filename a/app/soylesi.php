<?php

class soylesi extends Home {
	function show() {
		$version = $this->_getversion();

		if($version) {
			$this->set("pagetitle", "Söyleşi-$version");
			$this->set("template",  "soylesi_$version");
		} else {
			$this->set("pagetitle", "Söyleşi-GENEL");
			$this->set("template",  "soylesi");
		}
	}
}

?>
