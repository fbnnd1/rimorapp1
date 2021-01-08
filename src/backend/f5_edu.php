<?php
//Configurações iniciais
require("config.php");

date_default_timezone_set("America/Sao_Paulo");

//Verifica se o login foi validado
checa_login();

$str_id= $_GET['mapa'];
$str_op = $_GET['opcao'];

$str_sql = "CALL altera_estado_mapa(:p_id, :p_estado);";
$bol_ok = false;

if ($str_op == "1") { $str_e = "L"; }
if ($str_op == "2") { $str_e = "A"; }
if ($str_op == "3") { $str_e = "I"; }


require("conexao.php");

//Alterando estado do mapa
try {
 
    $stmt = $obj_bd->prepare($str_sql);
    $stmt->bindParam(":p_id", $str_id);
    $stmt->bindParam(":p_estado", $str_e);
	
    $bol_sucesso = $stmt->execute();
   
	$stmt->closeCursor();
    
    if ($bol_sucesso == true) {
        $bol_ok = true;
        $str_r = "{\"ctrl\":0}";
    } else {
        $str_r = "{\"ctrl\":2}";
    }
    
    $stmt = null;
	
} catch(PDOException $pdo_e) { //Erro
    
	$obj_bd = null;
    //echo "{\"ctrl\":1, \"msg\": \" " . $pdo_e->getMessage() . " \"}";
    echo "{\"ctrl\":1}";
	exit();
}

if (($str_op == "1") && ($bol_ok)) {
    
    $str_link_id = $_GET['linkmapa'];
    $str_sql = "CALL deleta_jogadores(:p_id);";
    
    try {
 
        $stmt = $obj_bd->prepare($str_sql);
        $stmt->bindParam(":p_id", $str_link_id);
        
        $bol_sucesso = $stmt->execute();
       
        $stmt->closeCursor();
        
        if ($bol_sucesso == true) {
            $str_r = "{\"ctrl\":0}";
        } else {
            $str_r = "{\"ctrl\":12}";
        }
        
        $stmt = null;
        
    } catch(PDOException $pdo_e) { //Erro
        
        $obj_bd = null;
        //echo "{\"ctrl\":11, \"msg\": \" " . $pdo_e->getMessage() . " \"}";
        echo "{\"ctrl\":11}";
        exit();
    }
    
}

$stmt = null;
$obj_bd = null;

echo($str_r);
?>