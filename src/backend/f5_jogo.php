<?php
require("config.php");

$str_r = "{\"ctrl\":0}";

$str_dados = $_POST['dados'];

//Verifica se o login foi validado
checa_login();

//convertendo em objeto
$obj_dados = json_decode($str_dados);


if ($obj_dados->opcao == 1) {
	$sql = "CALL atualiza_dados_jogador1(:p_jogador, :p_mapa, :p_pontos, :p_lugares, :p_duracao);";
} else {
	$sql = "CALL atualiza_dados_jogador2(:p_jogador, :p_mapa, :p_duracao);";
}

require("conexao.php");

try {
	$stmt = $obj_bd->prepare($sql);
	$stmt->bindParam(":p_jogador", $obj_dados->jogador);
	$stmt->bindParam(":p_mapa", $obj_dados->mapa);
	$stmt->bindParam(":p_duracao", $obj_dados->duracao);

	if ($obj_dados->opcao == 1) {
		$stmt->bindParam(":p_pontos", $obj_dados->pontos);
		$stmt->bindParam(":p_lugares", $obj_dados->lugares);
	}
	
	$bol_sucesso = $stmt->execute();
	
	if ($bol_sucesso) {
		$str_r = "{\"ctrl\":0}";
	} else {
		$str_r = "{\"ctrl\":2}";
	} 

}
catch(PDOException $pdo_e) {

	//echo "{\"ctrl\":1, \"msg\": \" " . $pdo_e->getMessage() . " \"}";
	echo "{\"ctrl\":1}";
	exit();
}

$stmt = null;
$obj_bd = null;

echo $str_r;

?>