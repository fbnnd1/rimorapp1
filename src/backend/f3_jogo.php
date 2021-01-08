<?php
//Configurações iniciais
require("config.php");

date_default_timezone_set("America/Sao_Paulo");

//Verifica se o login foi validado
checa_login();

$str_id_mapa = $_GET["mapa"];

//SQL
$str_sql = "CALL obtem_descricao_mapa(:p_mapa_id, @p_descricao);"; //Procedimento com 1 saída

require("conexao.php");

//Verificando se o nome do mapa já está cadastrado para este usuário
$stmt = null;
try {
 
	$stmt = $obj_bd->prepare($str_sql);
	$stmt->bindParam(":p_mapa_id", $str_id_mapa);
	
	$bol_sucesso = $stmt->execute();
	$stmt->closeCursor();

	$stmt = $obj_bd->query("select @p_descricao;");

	$resultado = $stmt->fetchAll();

    
    if ($bol_sucesso == true) {
		$str_desc = $resultado[0][0];
	} else {
		$stmt1 = null;
		$obj_bd = null;
		echo "{\"ctrl\":2}";
		exit(0);
	}
    
    $stmt1 = null;
	
} catch(PDOException $pdo_e) { //Erro
    
	$obj_bd = null;
	//echo "{\"ctrl\":1, \"msg\": \" " . $pdo_e->getMessage() . " \"}";
	echo "{\"ctrl\":1}";
	exit();
}

$stmt = null;
$obj_bd = null;

echo "{\"ctrl\":0, \"descricao\":\"" . $str_desc .  "\"}";

?>