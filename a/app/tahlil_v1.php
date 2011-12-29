<?php
	function tamamla($id, $len){
		return str_pad((string)$id, $len, "0", STR_PAD_LEFT);
	}

	function get_dps_id_helper($str)
	{
		/* dps (discipline, parent, survey) id degerlerini "dict" olarak döndürür.
		* $str boyutu 2-4-6 (veya 1-3-5 dir tamamlanir) olabilir.
		* len($str)==2 ise sadece $dict['did'] vardır.
		* len($str)==6 ise $dict['did'], $dict['pid'] ve $dict['sid'] vardır.
		*/
		$str = strval($str);

		$dict = array();

		$sz = strlen($str);

		if($sz < 1) 		{echo "ERROR: bos string geldi.";	return -1;}

		if($sz < 3) 		$str = tamamla($str, 2);
		elseif($sz < 5)		$str = tamamla($str, 4);
		elseif($sz < 7)		$str = tamamla($str, 6);
		else				{echo "ERROR: gecersiz string girdisi. strlen($str) in [1,6] olmaliydi";	return -1;}

			$sz = strlen($str);
		switch($sz) {
		case 2:
			$dict['did'] = substr($str, 0, 2);		// $dict['did'] = $str;
			break;
		case 4:
			$dict['did'] = substr($str, 0, 2);
			$dict['pid'] = substr($str, 2, 2);
			break;
		case 6:
			$dict['did'] = substr($str, 0, 2);
			$dict['pid'] = substr($str, 2, 2);
			$dict['sid'] = substr($str, 4, 2);
			break;
		}

		return $dict;
	}

	function get_dps_id($str, $idnm)
	{
		/* get_dps_id_helper i kullanarak idnm de istenen id yi geri dondurur.
		* Or. get_dps_id("010203", "pid") -> "02" dondurur.
		*
		* idnm: did, pid, sid degerlerini alabilir.
		*/

		$dict = get_dps_id_helper($str);

		return $dict[$idnm];
	}

class tahlil_v1 extends Home {
	function show($params=NULL) {
		if($this->get('dbg'))	print_pre($params, "[DEBUG] ".__CLASS__. ":".__FUNCTION__.":params");
	}

	function form($params=NULL, $preselected=array()) {
		$dbg = $this->get('dbg');
		$lang = '';
		if(F3::get('SESSION.lang') == 'en_US') $lang = 'EN';

		$discs = DB::sql("select * from discipline$lang");
		$parnt = DB::sql("select * from parent$lang");
		$survs = DB::sql("select * from survey$lang");

		$a = '<ul>';

		foreach($discs as $dval)
			$a .= "<li><a href='#tabs-$dval[id]'>$dval[name]</a></li>";

		$a .= '</ul>';

		foreach($discs as $dval) {
			$did = $dval['id'];

			$a .= "<div id='tabs-$dval[id]'>";

			foreach ($parnt as $pval){
				$pid = $pval['id'];

				$pdid = get_dps_id($pid, 'did');
				$ppid = get_dps_id($pid, 'pid');

				if($dbg)
					echo "DEBUG: pid=$pid,	pdid=$pdid ve ppid=$ppid <br>";
				/*if ($pdid == $did){
					$a .= '<p class="answer">' . $pval['name'] . '</p>';
					$a .= '<select multiple="multiple" size="5" name="response_'.$ppid.'[]" class="multi-select">';

					foreach ($survs as $sval){
						$sid = $sval['id'];

						$sdid = get_dps_id($sid, 'did');
						$spid = get_dps_id($sid, 'pid');
						$ssid = get_dps_id($sid, 'sid');

						if($dbg)
							echo "DEBUG: sid=$sid,	sdid=$sdid, spid=$spid ve ssid=$ssid<br>";

						if (($spid == $ppid) & ($sdid == $did)){
							if(array_key_exists($sid, $preselected))
								$a .= '<option value="'. $sid .'" selected="selected">'. $sval['name'] .'</option>';
							else
								$a .= '<option value="'. $sid .'" >'. $sval['name'] .'</option>';
						}
					}
					$a .= '</select>';
				}*/
			}
		}
		$this->set('tahlil_merkezi', $a);

		$this->hshow('Tahlil', 'tahlil_v1_form');
	}

}

?>
