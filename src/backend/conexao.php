<?php
$usuario = "";
$senha   = "";
$url     = "";
$porta   = "";
$bd      = "";

try {
    $obj_bd = new PDO("mysql:host=$url:$porta;dbname=$bd", $usuario , $senha);
	$obj_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e) {
	//echo "Connection failed: " . $e->getMessage();
	echo "{\"ctrl\":-12}";
	exit();
}
?>