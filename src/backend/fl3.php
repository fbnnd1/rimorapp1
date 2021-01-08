<?php
//Esta página apenas limpa variáveis de sessão

require("config.php");

$str_r = "{\"ctrl\":0}";

//Uso não recomendado
//session_unset();

unset($_SESSION["educador"]);
unset($_SESSION["jogador"]);

session_destroy();

echo $str_r;

?>