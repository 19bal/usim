<?php
$main = require_once __DIR__.'/inc/lib.php';

$main->set('dbg', $main->get('dagitim') != 'stable');

$main->route('GET /', 'Home->show');
$main->route('GET /soylesi', 'Soylesi->show');

$main->run();
?>
