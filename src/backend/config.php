<?php
//ARQUIVO DE CONFIGURAÇÃO

$url_base = "";

//Cabeçalhos de resposta
header("Content-type: text/plain; charset=utf-8");
header("Access-Control-Allow-Origin: *"); // Permitir acesso de quaisquer lugares
//header("location:$url_base");

//Iniciando sessão
$var_sessao = session_start();

if ($var_sessao == false) {
   echo("{\"ctrl\": -10}");
   exit();
}

//Função que checa se foi feito o login
function checa_login() {

   //Se foi feito o login
   if ((isset($_SESSION["educador"]) == true) || (isset($_SESSION["jogador"]) == true)) {
       return true;
   } else {
       //return false;
       echo("{\"ctrl\": -11}");
       exit();
   }
}

?>