<?php
//Configurações iniciais
require("config.php");

date_default_timezone_set("America/Sao_Paulo");

//Verifica se o login foi validado
checa_login();

$str_dados = $_POST['dados'];

//SQL
$str_sql = "CALL checa_nome_mapa('" . $str_dados . "', '" . $_SESSION["educador"] .  "', @tot_mapa);"; //Procedimento com saída

require("conexao.php");

//Verificando se o nome do mapa já está cadastrado para este usuário
$stmt = null;
try {
 
	$stmt = $obj_bd->prepare($str_sql);
	
	$bol_sucesso = $stmt->execute();
	$stmt->closeCursor();

	$stmt = $obj_bd->query("select @tot_mapa;");

	$resultado = $stmt->fetchAll();
    
    if ($bol_sucesso == true) {
		$int_r = $resultado[0][0];
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

echo "{\"ctrl\":0, \"resultado\":" . (string) $int_r .  "}";

?>