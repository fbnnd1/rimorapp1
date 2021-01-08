<?php
//Configurações iniciais
require("config.php");

//Verifica se o login foi validado
checa_login();

//LinkID
$str_id_mapa = $_GET["mapa"];

$sql = "CALL checa_liberacao_mapa(:p_mapa_id, @status);";

require("conexao.php");

try {
	$stmt = $obj_bd->prepare($sql);
    $stmt->bindParam(":p_mapa_id", $str_id_mapa);
	
	$bol_sucesso = $stmt->execute();
	
	$stmt->closeCursor();
	
	$stmt = $obj_bd->query("SELECT @status");
	
	$resultado = $stmt->fetchAll();
	
	if ($bol_sucesso == true) {
		
		if ($resultado[0][0] == 1) { //Mapa liberado
			
            echo ("{\"ctrl\":0}");

		} else { //Mapa não liberado
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