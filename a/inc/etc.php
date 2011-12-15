<?php
function print_pre($code, $msj="array") 
{
	echo "$msj = ";
	echo "<pre>";
	print_r($code);
	echo "</pre>";
}
?>
