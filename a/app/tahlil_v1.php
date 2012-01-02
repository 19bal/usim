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

	function form($params=NULL, $preselected=array('010101' => true)) {
		$dbg = $this->get('dbg');
		$lang = '';
		if(F3::get('SESSION.lang') == 'en_US') $lang = 'EN';

		$discs = DB::sql("select * from discipline$lang");
		$parnt = DB::sql("select * from parent$lang");
		$survs = DB::sql("select * from survey$lang");

		// < jquery-tabs function
		$a = '<script type="text/javascript">';
		$a .= '$(function(){';
		$a .= '		$("#tabs").tabs();';
		
		foreach($discs as $dval)
			$a .= "$('#tabs-$dval[id]').tabs();";

		$a .= '});';
		$a .= "</script>\n\n";
		// >

		$a .= "<form action='/a/tahlil/v1/slist' method='post'>\n";

		$a .= "<div id='tabs'>\n";

		$a .= "\t<ul>\n";

		foreach($discs as $dval)
			$a .= "\t\t<li><a href='#sekme-$dval[id]'>$dval[name]</a></li>\n";

		$a .= "\t</ul>\n\n";

		foreach($discs as $dval) {
			$did = $dval['id'];

			$a .= "\t<div id='sekme-$dval[id]'>\n";
			
			$a .= "\t\t<div id='tabs-$did'>\n";
			$a .= "\t\t\t<ul>\n";
			foreach ($parnt as $pval){
				$pid = $pval['id'];

				$pdid = get_dps_id($pid, 'did');

				if ($pdid == $did)
					$a .= "\t\t\t\t<li><a href='#sekme-$pval[id]'>$pval[name]</a></li>\n";
			}
			$a .= "\t\t\t</ul>\n\n";

			foreach ($parnt as $pval){
				$pid = $pval['id'];

				$pdid = get_dps_id($pid, 'did');
				$ppid = get_dps_id($pid, 'pid');

				if($dbg) echo "DEBUG: pid=$pid,	pdid=$pdid ve ppid=$ppid <br>";

				if ($pdid == $did)
				{
					$a .= "\t\t\t<div id='sekme-$pid'>\n";

					$a .= "\t\t\t\t<table border=1>\n";
					$ss = 0;

					foreach ($survs as $sval){
						$sid = $sval['id'];

						$sdid = get_dps_id($sid, 'did');
						$spid = get_dps_id($sid, 'pid');
						$ssid = get_dps_id($sid, 'sid');

						if($dbg)
							echo "DEBUG: sid=$sid,	sdid=$sdid, spid=$spid ve ssid=$ssid<br>";


						if (($spid == $ppid) & ($sdid == $did)){
							if($ss % 4 == 0)	$a .= "\t\t\t\t <tr>\n";
							
							$a .= "\t\t\t\t\t<td><input type='checkbox' value='$sid' name='tahlil[]' ";
							if(array_key_exists($sid, $preselected))
								$a .= "checked='yes'";
							$a .= ">$sval[name]</td>\n";
							
							if($ss % 4 == (4-1))	$a .= "\t\t\t\t </tr>\n";
							$ss ++;
						}

					}
					$a .= "\t\t\t\t</table>\n";
					$a .= "\t\t\t</div>\n";
				}
			}
			$a .= "\t\t</div>\n";
			$a .= "\t</div>\n";
		}
		$a .= "</div>";
		
		$a .= "\t<input type='submit' value='Tahlilleri Listele'>\n";
		$a .= "</form>\n";

		$this->set('tahlil_merkezi', $a);

		$this->hshow('Tahlil', 'tahlil_v1_form');
	}

	function slist($params=NULL) {
		if($this->get('dbg'))	print_pre($params, "[DEBUG] ".__CLASS__. ":".__FUNCTION__.":params");
		$tahlil = $this->get('POST.tahlil');
		print_pre($tahlil, 'TAHLIL');

	}
}

?>
