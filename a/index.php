<?php
$main = require_once __DIR__.'/inc/lib.php';
require_once __DIR__.'/inc/etc.php';

$main->set('dbg', $main->get('dagitim') != 'stable');

$main->route('GET /', 'Home->hshow');
	$main->route('POST /', 'Home->hshow');

$main->route('GET /@proje', 'Home->route');
	$main->route('POST /@proje', 'Home->route');
$main->route('GET /@proje/@version', 'Home->route');
	$main->route('POST /@proje/@version', 'Home->route');
$main->route('GET /@proje/@version/*', 'Home->route');
	$main->route('POST /@proje/@version/*', 'Home->route');

$main->run();
?>
