<?php
//Configurações iniciais
require("config.php");

$str_id_mapa = $_GET["mapa"];
$str_ordem = $_GET["ordem"];

//Verifica se o login foi validado
checa_login();

$bol_erro = false;

$sql = "CALL obtem_id_mapa(:p_mapa_link_id, @p_id_mapa);";

require("conexao.php");

//Obtém ID do mpapa
try {
	$stmt = $obj_bd->prepare($sql);
    $stmt->bindParam(":p_mapa_link_id", $str_id_mapa);
	
	$bol_sucesso = $stmt->execute();
	
	$stmt->closeCursor();
	
	$stmt = $obj_bd->query("SELECT @p_id_mapa");
	
	$resultado = $stmt->fetchAll();
	
	if ($bol_sucesso == true) {
		
		if (count($resultado) == 1) { //Obtemdo iD mapa
			
			$id_bd_mapa = $resultado[0][0];

		} else {
			echo "{\"ctrl\":3}";
			$bol_erro = true;
			
		}
	} else {
		echo "{\"ctrl\":2}";
		$bol_erro = true;
	}
	$stmt = null;

}
catch(PDOException $pdo_e) {

	//echo "{\"ctrl\":1, \"msg\": \" " . $pdo_e->getMessage() . " \"}";
	echo "{\"ctrl\":1}";
	$bol_erro = true;
}

if ($bol_erro) { //Houve erro
	exit(0);
}

//Obtendo lugar do mapa
$sql = "CALL obtem_lugar_jogo(:p_mapa_id, :p_ordem, @p_lat, @p_lon, @p_dica, @p_pontos, @p_desc, @p_dica_extra, @p_nome);";

try {
	$stmt = $obj_bd->prepare($sql);
    $stmt->bindParam(":p_mapa_id", $id_bd_mapa);
	$stmt->bindParam(":p_ordem", $str_ordem);
	
	$bol_sucesso = $stmt->execute();
	
	$stmt->closeCursor();
	
	$stmt = $obj_bd->query("SELECT @p_lat, @p_lon, @p_dica, @p_pontos, @p_desc, @p_dica_extra, @p_nome;");
	
	$resultado = $stmt->fetchAll();
	
	if ($bol_sucesso == true) {
		
		if ((count($resultado) == 1) && (is_null($resultado[0][0]) == false)) { //Obtemdo informações do lugar
			
			echo "{\"ctrl\":0, \"id\": $id_bd_mapa, \"dica\": \" " . $resultado[0][2] . " \", \"pontos\": " . $resultado[0][3] . ", \"latitude\":\"" . $resultado[0][0] . "\", \"longitude\": \"" . $resultado[0][1] . "\", \"descricao\": \" " . $resultado[0][4] .  "\", \"dicaExtra\":\"" . $resultado[0][5] . "\", \"nome\": \"" . $resultado[0][6] ."\"}";

		} else {
			echo "{\"ctrl\":13}";
		}
	} else {
		echo "{\"ctrl\":12}";
	}
	$stmt = null;
	$obj_bd = null;
}
catch(PDOException $pdo_e) {

	//echo "{\"ctrl\":11, \"msg\": \" " . $pdo_e->getMessage() . " \"}";
	echo "{\"ctrl\":11}";
}
?>