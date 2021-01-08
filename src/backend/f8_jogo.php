<?php
//Configurações iniciais
require("config.php");

//Verifica se o login foi validado
checa_login();  

$str_dados = $_POST['dados'];

//convertendo em objeto
$obj_dados = json_decode($str_dados);



//Selecionado porcedimento SQL
if ($obj_dados->opcao == 1) {
	$sql = "CALL ve_feitico(:p_mapa, :p_jogador, @p_str_adversario)";
}
if ($obj_dados->opcao == 2) {
	$sql = "CALL aplica_feitico_alvo(:p_jogador, :p_mapa, :p_adv, @status)";
}
if ($obj_dados->opcao == 3) {
	$sql = "CALL desfaz_feitico(:p_jogador, :p_mapa)";
}


require("conexao.php");
try {
	$stmt = $obj_bd->prepare($sql);
	$stmt->bindParam(":p_jogador", $obj_dados->nome);
	$stmt->bindParam(":p_mapa", $obj_dados->mapa);


	if ($obj_dados->opcao == 2) { //cadastro do educador ou alteração de senha
		$stmt->bindParam(":p_adv", $obj_dados->adv );
	}
	
	$bol_sucesso = $stmt->execute();
	
	$stmt->closeCursor();

	if ($obj_dados->opcao == 2) { //Verifica aplicação feitiço
		$stmt = $obj_bd->query("SELECT @status"); // 1 - Feitiço aplicado
		$resultado = $stmt->fetchAll();
		$stmt->closeCursor();
	}

	if ($obj_dados->opcao == 1) { //Verifica se jogador foi enfeitiçado
		$stmt = $obj_bd->query("SELECT @p_str_adversario"); 
		$resultado = $stmt->fetchAll();
		$stmt->closeCursor();
	}
	
	if ($bol_sucesso == true) { //Executou procedimento

		if ($obj_dados->opcao == 1) { 
			if (count($resultado) == 0) { //Jogador não foi enfeiçado
				echo "{\"ctrl\":0}";
			} else {
                echo "{\"ctrl\":3, \"adversario\":\"" . $resultado[0][0] . "\"}";
			}
		}

		if ($obj_dados->opcao == 2) { 
			if ($resultado[0][0] != 1) { //Alvo já enfeitiçado
				echo "{\"ctrl\":3}";
			} else {
                echo "{\"ctrl\":0}";
			}
		}
		
		if ($obj_dados->opcao == 3) {  echo "{\"ctrl\":0}"; }

		
	
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
