<?php
//Configurações iniciais
require("config.php");

$mapa_id = $_GET["mapa_id"];

//SQL
$sql = "CALL login_jogador(:p_mapa_id, @status);";

$url = $url_base . "jogador/index.html";

require("conexao.php");
try {
	$stmt = $obj_bd->prepare($sql);
	$stmt->bindParam(":p_mapa_id", $mapa_id);
	
	$bol_sucesso = $stmt->execute();
	
	$stmt->closeCursor();
	
	$stmt = $obj_bd->query("SELECT @status");
	
	$resultado = $stmt->fetchAll();
	
	if ($bol_sucesso == true) {
		
		if ($resultado[0][0] == 1) {
			
			echo ("{\"ctrl\":0,\"url\":\"$url\"}");
			$_SESSION["jogador"] = $mapa_id;

		} else {
			echo "{\"ctrl\":3}";
		}
	} else {
		echo "{\"ctrl\":2}";
	}
	$stmt = null;
	$obj_bd = null;
}
catch(PDOException $pdo_e) {

	//echo "{\"ctrl\":1, \"msg\": \" " . $pdo_e->getMessage() . " \"}";
	echo "{\"ctrl\":1}";
}
?>