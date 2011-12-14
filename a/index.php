<?php
$main = require_once __DIR__.'/inc/lib.php';

$main->set('dbg', $main->get('dagitim') != 'stable');

$main->route('GET /', 'Home->show');
	$main->route('POST /', 'Home->show');

$main->route('GET /@proje/@version', 'Home->route');
	$main->route('POST /@proje/@version', 'Home->route');
$main->route('GET /@proje', 'Home->route');
	$main->route('POST /@proje', 'Home->route');
//$main->route('GET /soylesi/@version', 'Soylesi->show');
//$main->route('GET /soylesi', 'Soylesi->show');


$main->run();
?>
