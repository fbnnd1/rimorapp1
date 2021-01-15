<?php
//Configurações iniciais
require("config.php");

date_default_timezone_set("America/Sao_Paulo");

//Verifica se o login foi validado
checa_login();

$pg = $_GET['pg'];
$pg_int = (int)$pg;

//SQL
$str_sql = "SELECT id, nome, descricao, link_id FROM tbl_mapa WHERE educador_login = :educador LIMIT " . (string)$pg_int . ", 3;";

require("conexao.php");

//Obtendo mapas do educador
$stmt = null;
try {
 
	$stmt = $obj_bd->prepare($str_sql);
    $stmt->bindParam(":educador", $_SESSION["educador"] );
    
    $bol_sucesso = $stmt->execute();
    $resultado = $stmt->fetchAll();
	$stmt->closeCursor();
    
    if ($bol_sucesso == true) {
        
        if (count( $resultado) === 0) { //Sem dados
            $str_r = "{\"ctrl\":0, \"mapas\":[]}";
        
        } else { //Com dados - gerando lista
            $str_r = "[";
            $str_sep = "";
            for ($i = 0; $i < count( $resultado ); $i++ ) {

                $str_r = $str_r . $str_sep . "{\"id\":" . (string)$resultado[$i][0] . ",\"nome\":\"" . $resultado[$i][1] . "\",\"descricao\":\"" . $resultado[$i][2] . "\", \"linkid\":\"" . $resultado[$i][3] . "\"}";
                $str_sep = ",";
            }
            $str_r = $str_r . "]";
            //Json completo
            $str_r = "{\"ctrl\":0, \"mapas\":" . $str_r . "}";

        }
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

echo($str_r);
?>