<?php
//Configurações iniciais
require("config.php");

date_default_timezone_set("America/Sao_Paulo");

//Verifica se o login foi validado
checa_login();

//LinkID do mapa com a opção que indicará o estado
$str_id= $_GET['mapa'];
$str_op = $_GET['opcao'];

$str_sql = "CALL altera_estado_jogador(:p_jogador, :p_mapa, :p_estado);";

if ($str_op == "1") { $str_e = "D"; }
if ($str_op == "2") { $str_e = "A"; }
if ($str_op == "3") { $str_e = "C"; }


require("conexao.php");

//Obtendo mapas do educador
$stmt = null;
try {
 
    $stmt = $obj_bd->prepare($str_sql);
    $stmt->bindParam(":p_jogador",$_SESSION["jogador"]);
    $stmt->bindParam(":p_mapa", $str_id);
    $stmt->bindParam(":p_estado", $str_e);
	
    $bol_sucesso = $stmt->execute();
   
	$stmt->closeCursor();
    
    if ($bol_sucesso == true) {
        $str_r = "{\"ctrl\":0}";
    } else {
        $str_r = "{\"ctrl\":2}";
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