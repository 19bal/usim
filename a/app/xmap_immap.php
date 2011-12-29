<?php

class xmap_immap extends Home {
	function select($params=NULL) {
		if($this->get('dbg'))	print_pre($params, "[DEBUG] ".__CLASS__. ":".__FUNCTION__.":params");
		$this->hshow("Seçim Yap", "xmap_immap_select");
	}

	function result($params=NULL) {
		if($this->get('dbg'))	print_pre($params, "[DEBUG] ".__CLASS__. ":".__FUNCTION__.":params");

		$imname = "/a/public/img/xmap_immap.jpg";
		$iminfo = getimagesize(getcwd() . "/../$imname");
		F3::set("SESSION.imwidth",  $iminfo[0]);
		F3::set("SESSION.imheight", $iminfo[1]);

		F3::set("SESSION.imname",  $imname);

		F3::set('SESSION.ogrenci', array("left" => $_POST['x'], "right"  => ($iminfo[0] - ($_POST['x'] + $_POST['w'])),
					"top"  => $_POST['y'], "bottom" => ($iminfo[1] - ($_POST['y'] + $_POST['h'])),
					"yorum"=> $_POST['response']) );

		F3::set('SESSION.hoca', array("left" => 50, "right"  => 50,
					"top"  => 50, "bottom" => 50,
					"yorum"=> "Foo Bar") );
		

		$this->hshow("Sonuçları Görüntüle", "xmap_immap_result");
	}
}

?>
