<?php
//Configurações iniciais
require("config.php");

//Verifica se o login foi validado
checa_login();

$str_id_mapa = $_GET["mapaid"];
$str_link_mapa = $_GET["mapalinkid"];

$sql = "CALL exclui_mapa(:p_mapa_id, :p_mapa_linkid);";

require("conexao.php");

try {
	$stmt = $obj_bd->prepare($sql);
	$stmt->bindParam(":p_mapa_id", $str_id_mapa);
	$stmt->bindParam(":p_mapa_linkid", $str_link_mapa);
	
	$bol_sucesso = $stmt->execute();
	
	$stmt->closeCursor();
	
	if ($bol_sucesso == true) {
		
	    echo ("{\"ctrl\":0}");

	} else {
		echo "{\"ctrl\":2}";
	}
	$stmt = null;
	$obj_bd = null;
}
catch(PDOException $pdo_e) {

	$stmt = null;
	$obj_bd = null;

	//echo "{\"ctrl\":1, \"msg\": \" " . $pdo_e->getMessage() . " \"}";
	echo "{\"ctrl\":1}";
}

?>