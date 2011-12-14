<?php

$main = require_once 'lib/base.php';

$main->config(".f3.ini");
$main->set('DB', new DB('mysql:host=localhost;port=3306;dbname=' . $main->get('dbname'), $main->get('dbuser'), $main->get('dbpass')));
$main->set('SR', '/' . strtok($_SERVER["SCRIPT_NAME"], '/'));

return $main;
?>
