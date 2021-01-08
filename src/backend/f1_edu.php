<?php
//Configurações iniciais
require("config.php");

date_default_timezone_set("America/Sao_Paulo");

//Verifica se o login foi validado
checa_login();

$str_dados = $_POST['dados'];

//convertendo em objeto
$obj_dados = json_decode($str_dados);

//SQL
$str_sql1 = "CALL insere_mapa('" . $_SESSION["educador"] . "', :nome, :desc);";
$str_sql2 = "CALL obtem_id_ult_mapa('" . $_SESSION["educador"] . "', @id_mapa);"; //Procedimento com saída
$str_sql3 = "CALL insere_lugar(:id_mapa, :lat, :lon, :nome, :dica1, :desc, :pontos, :ordem, :dica2 );";
$str_sql4 = "CALL cad_link_at_mapa(:id_mapa, :link_at_mapa);";

require("conexao.php");

//Cadastrando mapa
try {
     
    $stmt = $obj_bd->prepare($str_sql1);

    $stmt->bindParam(":nome", $obj_dados->nome);
    $stmt->bindParam(":desc", $obj_dados->descricao);
    
	$bol_sucesso = $stmt->execute();
	
	if (!$bol_sucesso) {
		$stmt = null;
		$obj_bd = null;
		echo "{\"ctrl\":2}";
		exit();
	}

} catch (PDOException $pdo_e) { //Erro de cadastro
	$obj_bd = null;
	//echo "{\"ctrl\":1, \"msg\": \" "  . $pdo_e->getMessage() . " \"}";
	echo "{\"ctrl\":1}";
	exit();
}

//Obtendo Id do mapa cadastrado
$stmt = null;
try {
 
	$stmt = $obj_bd->prepare($str_sql2);
    
	$bol_sucesso = $stmt->execute();
	$stmt->closeCursor();

	$stmt = $obj_bd->query("select @id_mapa;");

	//$resultado = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);
	$resultado = $stmt->fetchAll();
    
    if ($bol_sucesso == true) {
		if (count($resultado) == 1) {
            $int_id_ult_mapa = $resultado[0][0];
		} else {
			$stmt1 = null;
			$obj_bd = null;
			echo "{\"ctrl\":13}";
			exit(0);
		}
	} else {
		$stmt1 = null;
		$obj_bd = null;
		echo "{\"ctrl\":12}";
		exit(0);
	}
    
    $stmt1 = null;
	
} catch(PDOException $pdo_e) { //Erro de obtenção de Id
    
	$obj_bd = null;
	//echo "{\"ctrl\":11, \"msg\": \" " . $pdo_e->getMessage() . " \"}";
	echo "{\"ctrl\":11}";
	exit();
}

//Cadastrando lugares do mapa
try{
	//Para cada lugar
	for($i = 0; $i < count($obj_dados->pontos); $i++) {

		$stmt = $obj_bd->prepare($str_sql3);

		$stmt->bindParam(":nome", $obj_dados->pontos[$i]->nome);
		$stmt->bindParam(":desc", $obj_dados->pontos[$i]->descricao);
		$stmt->bindParam(":lat", $obj_dados->pontos[$i]->latitude);
		$stmt->bindParam(":lon", $obj_dados->pontos[$i]->longitude);
		$stmt->bindParam(":dica1", $obj_dados->pontos[$i]->dica);
		$stmt->bindParam(":dica2", $obj_dados->pontos[$i]->dicaExtra);
		$stmt->bindParam(":pontos", $obj_dados->pontos[$i]->pontos);
		$stmt->bindParam(":ordem", $obj_dados->pontos[$i]->ordem);
		$stmt->bindParam(":id_mapa", $int_id_ult_mapa);

		$bol_sucesso = $stmt->execute();

		if (!$bol_sucesso) { //Falha no cdastro do lugar
			$stmt = null;
			$obj_bd = null;
			echo "{\"ctrl\":22}";
			exit();
		}

	}

} catch (PDOException $pdo_e) {
	$obj_bd = null;
	//echo "{\"ctrl\":21, \"msg\": \" " . $pdo_e->getMessage() . " \"}";
	"{\"ctrl\":21}";
	exit();
}


//Obtendo link de ativacao
$str_link_at = base64_encode($_SESSION["educador"] . (string) $int_id_ult_mapa . date("Ymd") );

//Cadastrando link ativação do mapa
try {
     
    $stmt = $obj_bd->prepare($str_sql4);

    $stmt->bindParam(":id_mapa", $int_id_ult_mapa);
    $stmt->bindParam(":link_at_mapa", $str_link_at);
    
	$bol_sucesso = $stmt->execute();
	
	if (!$bol_sucesso) {
		$stmt = null;
		$obj_bd = null;
		echo "{\"ctrl\":32}";
		exit();
	}

} catch (PDOException $pdo_e) { //Erro de cadastro
	$stmt = null;
	$obj_bd = null;
	//echo "{\"ctrl\":31, \"msg\": \" " . $pdo_e->getMessage() . " \"}";
	echo "{\"ctrl\":31}";
	exit();
}

$stmt = null;
$obj_bd = null;

echo "{\"ctrl\":0}";

?>