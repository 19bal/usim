<?php
require_once __DIR__.'/lib/base.php';

F3::set('GUI','gui/');
F3::set('INC','inc/');

F3::route("GET /",      function () { echo "Hello world <br>Burası SIM - UNSTABLE"; } );

F3::run();

?>

