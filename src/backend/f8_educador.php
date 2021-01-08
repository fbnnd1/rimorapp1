<?php
//Configurações iniciais
require("config.php");

$str_dados = $_POST['dados'];

//convertendo em objeto
$obj_dados = json_decode($str_dados);

//Selecionado porcedimento SQL
if ($obj_dados->opcao == 1) {
	$sql = "CALL cadastra_educador(:p_login, :p_senha, :p_nome, :p_email)";
}
if ($obj_dados->opcao == 2) {
	$sql = "CALL ve_cad_educador(:p_login, @status)";
}
if ($obj_dados->opcao == 3) {
	$sql = "CALL altera_senha_educador(:p_login, :p_senha)";
}


require("conexao.php");
try {
	$stmt = $obj_bd->prepare($sql);
	$stmt->bindParam(":p_login", $obj_dados->login);

	if ($obj_dados->opcao != 2) { //cadastro do educador ou alteração de senha
		$str_senha = $obj_dados->senha;
		$str_senha = hash('sha256', $str_senha, false);
		$stmt->bindParam(":p_senha", $str_senha );
	}

	if ($obj_dados->opcao == 1) { //Cadastro do educador
		$stmt->bindParam(":p_nome", $obj_dados->nome);
		$stmt->bindParam(":p_email", $obj_dados->email);
	}
	
	$bol_sucesso = $stmt->execute();
	
	$stmt->closeCursor();

	if ($obj_dados->opcao == 2) { //Verifica cadastro do educador
		$stmt = $obj_bd->query("SELECT @status");
		$resultado = $stmt->fetchAll();
		$stmt->closeCursor();
	}
	

	if ($bol_sucesso == true) { //Executou procedimento

		if ($obj_dados->opcao == 2) { //Verifica cadastro do educador
			if ($resultado[0][0] != 1) { //Login não cadastrado
				echo "{\"ctrl\":3}";
			} else {
                               echo "{\"ctrl\":0}";
                        }
		} else {
                       echo "{\"ctrl\":0}";
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
