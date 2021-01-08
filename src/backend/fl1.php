<?php
//Configurações iniciais
require("config.php");

$str_dados = $_POST['dados'];

//convertendo em objeto
$obj_dados = json_decode($str_dados);

//Gerando hash para validação no BD
$str_senha = $obj_dados->senha;
$str_senha = hash('sha256', $str_senha, false);

//SQL
$sql = "CALL login_educador(:login, :senha, @status);";

$url = $url_base . "professor/pag01.html";

require("conexao.php");
try {
	$stmt = $obj_bd->prepare($sql);
	$stmt->bindParam(":login", $obj_dados->usuario);
	$stmt->bindParam(":senha", $str_senha);
	
	$bol_sucesso = $stmt->execute();
	
	$stmt->closeCursor();
	
	$stmt = $obj_bd->query("SELECT @status");
	
	$resultado = $stmt->fetchAll();
	
	if ($bol_sucesso == true) {
		
		if ($resultado[0][0] == 1) {
			//Salvando login em uma sessão
			$_SESSION["educador"] = $obj_dados->usuario;
			
			echo ("{\"ctrl\":0,\"url\":\"$url\"}");
		} else {
			echo "{\"ctrl\":3}";
			//echo $str_dados;
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