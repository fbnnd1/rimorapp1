<?php
//Configurações iniciais
require("config.php");

$str_dados = $_POST["dados"];

//Verifica se o login foi validado
checa_login();

//convertendo em objeto
$obj_dados = json_decode($str_dados);

$sql = "CALL checa_nome_jogador(:p_nomej, :p_mapa_id, @status);";

$url = $url_base . "jogador/index.html";

$bol_ok = false;

require("conexao.php");

//Verificando nome
try {
	$stmt = $obj_bd->prepare($sql);
    $stmt->bindParam(":p_nomej", $obj_dados->jogador);
    $stmt->bindParam(":p_mapa_id", $obj_dados->mapa);
	
	$bol_sucesso = $stmt->execute();
	
	$stmt->closeCursor();
	
	$stmt = $obj_bd->query("SELECT @status");
	
	$resultado = $stmt->fetchAll();
	
	if ($bol_sucesso == true) {
		
		if ($resultado[0][0] == 0) { //Sem nome cadastrado
			
			$bol_ok = true;

		} else {
			echo "{\"ctrl\":3}";
		}
	} else {
		echo "{\"ctrl\":2}";
	}
	$stmt = null;
}
catch(PDOException $pdo_e) {

	//echo "{\"ctrl\":1, \"msg\": \" " . $pdo_e->getMessage() . " \"}";
	echo "{\"ctrl\":1}";
	exit();

}

//Cadastro nome jogador
if ($bol_ok) {

	try {

		$stmt = $obj_bd->prepare("CALL cad_nome_jogador(:p_nomej, :p_mapa_id)");
    	$stmt->bindParam(":p_nomej", $obj_dados->jogador);
		$stmt->bindParam(":p_mapa_id", $obj_dados->mapa);
	
		$bol_sucesso = $stmt->execute();

		if ($bol_sucesso == true) {
			
			//Salvando login em variável de sessão
			$_SESSION["jogador"] =  $obj_dados->jogador;

			echo ("{\"ctrl\":0,\"url\":\"$url\"}");

		} else {
			echo "{\"ctrl\":12}";
		}
	} catch(PDOException $pdo_e) {

		//echo "{\"ctrl\":11, \"msg\": \" " . $pdo_e->getMessage() . " \"}";
		echo "{\"ctrl\":11}";
	}

}

?>