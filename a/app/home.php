<?php
/*
 * B A N A  D O K U N M A
 *
 * bir seyleri degistirmen gerektigini dusunuyorsan
 * onerinle birlikte seyyah@ce.omu.edu.tr gonder.
 */

class Home extends F3instance {
	function hshow($title='Home', $template='home') {
		$this->set('pagetitle', $title);
		$this->set('template', $template);
	}

	function route() {
		/* PARAMS
		 * 	/@proje
		 * 	/@proje/@version
		 *	/@proje/@version/*	-> *=details: @method/, @method/@par, @method/@par/@epar
		 *
		 * Test URL
		 * - usim/foo			-> proje=foo, version=NULL
		 * - usim/foo/bar		-> proje=foo, version=bar
		 * - usim/foo/bar/zoo	-> proje=foo, version=bar => $foo_$bar->zoo()
		 * - usim/foo/bar/zoo/t	-> proje=foo, version=bar => $foo_$bar->zoo(t)
		 *
 		 * URL: http://localhost/a/soylesi/v1/@details
 		 * burada `details`, yontem (method) ve parametrelerinden (params) olusmaktadir.
 		 * 	mwthod <- $details[0] ve
 		 * 	params <- $details[1:]
 		 * 	$this->{$method}($params);		# ilgili method params ile cagrilir.
 		 *
 		 * Ornek:
 		 * 	http://localhost/a/soylesi/v1/list 			-> $details=['list']
 		 * 	http://localhost/a/soylesi/v1/show/1		-> $details=['show', '1']
 		 * 	http://localhost/a/soylesi/v1/foo/bar/t		-> $details=['foo','bar', 't']
 		 */
		$proje = $this->_getproje();
		$version = $this->_getversion();
		$details = $this->_getdetails();

		if(empty($details)) {
			if($version)
				$this->hshow("$proje-$version", $proje."_$version");
			else
				$this->hshow("$proje-GENEL", $proje);
		} else {
			$method = $details[0];
			$params = array_slice($details, 1);
			
			$class_name = $proje . "_$version";
			$cl = new $class_name();
			$cl->$method($params);
		}
	}
	
	function _getproje() {
		$proje = $this->get('PARAMS.proje');
		if($this->get('dbg'))	echo "[DEBUG] ".__CLASS__.":proje = '$proje'<br>";
		
		return $proje;
	}

	function _getversion() {
		$version = $this->get('PARAMS.version');
		if(empty($version)) $version = NULL;
		if($this->get('dbg'))	echo "[DEBUG] ".__CLASS__.":version = '$version'<br>";

		return $version;
	}

	function _getdetails() {
		$par = $this->get('PARAMS');
		$pars = preg_split('/\//', $par[0], -1, PREG_SPLIT_NO_EMPTY);
		if($this->get('dbg'))	print_pre($pars, "[DEBUG] ".__CLASS__.":_getdetails:pars");
		
		return array_slice($pars, 2);
	}

	function afterroute() {
		echo Template::serve('layout.htm');
	}
}

?>
