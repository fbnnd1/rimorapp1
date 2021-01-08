<?php
//Configurações iniciais
require("config.php");

date_default_timezone_set("America/Sao_Paulo");

//Verifica se o login foi validado
checa_login();

$str_mapa_linkid = $_GET['mapa'];

//SQL
$str_sql = "SELECT jogador, pontos, qtde_lugates, duracao, estado FROM tbl_jogo WHERE mapa_id = '" . $str_mapa_linkid . "' ORDER BY qtde_lugates DESC, pontos DESC, duracao ASC ;"; 

require("conexao.php");

//Obtendo mapas do educador
$stmt = null;
try {
 
	$stmt = $obj_bd->prepare($str_sql);
	
    $bol_sucesso = $stmt->execute();
    $resultado = $stmt->fetchAll();
	$stmt->closeCursor();
    
    if ($bol_sucesso == true) {
        
        if (count( $resultado) === 0) { //Sem dados
            $str_r = "{\"ctrl\":0, \"jogadores\":[]}";
        
        } else { //Com dados - gerando lista
            $str_jogadores = "";
            $str_sep = "";
            for ($i = 0; $i < count( $resultado ); $i++ ) {

                //$str_r = $str_r . $str_sep . "\"" . $resultado[$i][0] . "\"";
                $str_jogadores = $str_jogadores . $str_sep . "{ \"nome\":\"" . $resultado[$i][0] . "\",";
                $str_jogadores = $str_jogadores . "\"pontos\":" . $resultado[$i][1] . ",";
                $str_jogadores = $str_jogadores . "\"lugares\":" . $resultado[$i][2] . ",";
                $str_jogadores = $str_jogadores . "\"duracao\":\"" . $resultado[$i][3] . "\",";
                $str_jogadores = $str_jogadores . "\"estado\":\"" . $resultado[$i][4] . "\",";
                $str_jogadores = $str_jogadores . "\"posicao\":" . (string)($i+1) . "}";

                $str_sep = ",";
            }
            
            //Json completo
            $str_r = "{\"ctrl\":0, \"jogadores\":[" . $str_jogadores . "]}";

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