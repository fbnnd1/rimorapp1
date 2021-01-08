<?php
//Configurações iniciais
require("config.php");

date_default_timezone_set("America/Sao_Paulo");

//Verifica se o login foi validado
checa_login();

//Id do mapa
$str_id= $_GET['mapa'];

//SQL
$str_sql = "CALL obtem_info1_mapa(:p_id, @p_nome, @p_desc, @p_link, @p_estado);";

require("conexao.php");

//Obtendo informações gerais sobre o mapa
try {
 
	$stmt = $obj_bd->prepare($str_sql);
	$stmt->bindParam(":p_id", $str_id );
	
	$bol_sucesso = $stmt->execute();

	$stmt->closeCursor();
	
	if ($bol_sucesso == false) {
		$stmt = null;
		$obj_bd = null;
		echo "{\"ctrl\":2}";
		exit(0);
	}

	$stmt = $obj_bd->prepare("SELECT @p_nome, @p_desc, @p_link, @p_estado");
	
	$bol_sucesso = $stmt->execute();

    $resultado = $stmt->fetchAll();

    if ($bol_sucesso == true) {
        
        if (count( $resultado) === 0) { //Sem dados
            $str_r = "{\"ctrl\":3}";
        
        } else { //Com dados
           
            $str_r = "{\"ctrl\":0, \"nome\":\"" . $resultado[0][0] . "\",\"descricao\":\"" . $resultado[0][1] . "\", \"linkid\":\"" . $resultado[0][2] .  "\", \"estado\":\"" . $resultado[0][3] . "\", \"lugares\":[";

        }
	} else {
		$stmt = null;
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

//Obtendo lugares do mapa
$str_sql = "SELECT nome, latitude, longitude, pontos, dica1, dica2 FROM tbl_lugar WHERE mapa_id = :p_id ORDER BY ordem ASC";

try {

	$stmt = $obj_bd->prepare($str_sql);
	$stmt->bindParam(":p_id", $str_id );
	
	$bol_sucesso = $stmt->execute();
	
	if ($bol_sucesso == false) { //Falha execução consulta
		$stmt = null;
		$obj_bd = null;
		echo "{\"ctrl\":12}";
		exit(0);
	}

	$resultado = $stmt->fetchAll();

	$stmt->closeCursor();

	if (count($resultado) == 0) { //Nenhum dado retornado
		$stmt = null;
		$obj_bd = null;
		echo "{\"ctrl\":13}";
		exit(0);
	}

    $str_sep = "";
    for ($i = 0; $i < count( $resultado ); $i++ ) {

		$str_r = $str_r . $str_sep . "{\"nome\":\"" . $resultado[$i][0] . "\"";
		$str_r = $str_r . ",\"latitude\":\"" . $resultado[$i][1] . "\"";
		$str_r = $str_r . ",\"longitude\":\"" . $resultado[$i][2] . "\"";
		$str_r = $str_r . ",\"pontos\":" .  (string)$resultado[$i][3];
		$str_r = $str_r . ",\"dica\":\"" .  $resultado[$i][4] . "\"";
		$str_r = $str_r . ",\"dicaExtra\":\"" . $resultado[$i][5] . "\"}";
        $str_sep = ",";
    }
	$str_r = $str_r . "] }";
	
} catch (PDOException $pdo_e) { //Erro
	$obj_bd = null;
	//echo "{\"ctrl\":11, \"msg\": \" " . $pdo_e->getMessage() . " \"}";
	echo "{\"ctrl\":11}";
	exit();
}

$stmt = null;
$obj_bd = null;

echo($str_r);
?>