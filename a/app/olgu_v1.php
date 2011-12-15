<?php

class olgu_v1 extends Home {
	function show($params=NULL) {
		if($this->get('dbg'))	print_pre($params, "[DEBUG] ".__CLASS__. ":".__FUNCTION__.":params");
	}

	function edit($params=NULL) {
		if($this->get('dbg'))	print_pre($params, "[DEBUG] ".__CLASS__. ":".__FUNCTION__.":params");
	}
}

?>
