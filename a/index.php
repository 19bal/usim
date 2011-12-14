<?php
$main = require_once __DIR__.'/inc/lib.php';

$main->route('GET /', 'Home->show');

$main->route('GET /soylesi', 'Soylesi->show');

$main->run();
?>
