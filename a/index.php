<?php
$main=require_once __DIR__.'/inc/lib.php';

$main->route('GET /','Test->show');

$main->run();
?>
