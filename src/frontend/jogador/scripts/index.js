//Variáveis necessárias
var obj_jogador = new Jogador();
var obj_mapa = new Mapa("MeuMapa");
var obj_timer;
var int_pub_opc_saida = 0; //Variável que define a opção de saída
var int_ctrl_contador = 0; //Contador que ajudará indicar se houve falha no acesso ao servidor

//Para chamar função com setInterval com uso de Jquery. Executada a cada 5 segundos.
var f_checa_mapa = function() {
    //var bol_r = obj_mapa.checa_mapa_liberado();
    var bol_r = obj_mapa.obtem_estado();
    if (bol_r) {
        //clearInterval(obj_timer);

        if (obj_mapa.estado == "A") {  //Mapa habilitado para jogo
            $("#btn_painel").show();
        }
       
        if (obj_mapa.estado == "I") { //Mapa bloqueado
            int_pub_opc_saida = 0;
            $("#btn_painel").hide();
            $("#frm_nome").val("");
            $("#frm_mapa").attr("disabled", false);
            clearInterval(obj_timer);
            alert(msg_usuario("nj09"));
        }

        /*
        if (obj_mapa.estado == "L") { //Mapa liberado para cadastro de jogadores
            int_pub_opc_saida = 0;
            $("#btn_painel").hide();
            alert(msg_usuario("nj10"));
            $("#frm_login_jogdor").hide();
            $("#frm_mapa").attr("disabled", false);
        }
        */


    } else {

        if ((obj_mapa.sinalErro < 0) || ((obj_mapa.sinalErro != 0 ) && (obj_mapa.sinalErro != 3))) {
            int_ctrl_contador = int_ctrl_contador + 1;
        }

        if (int_ctrl_contador > 12) { // Mais de 60 segundos com erro de acesso ao servidor
            if (obj_mapa.sinalErro < 0) { alert(msg_usuario("gm2")); } //Servidor inacessível

            if ((obj_mapa.sinalErro != 0 ) && (obj_mapa.sinalErro != 3)) { //Erro na obtenção dos dados
                alert(msg_usuario("gm1"));
            }

            int_ctrl_contador = 0;

        }
    }
}

//Realiza Saída
function realiza_saida() {
    if (int_pub_opc_saida == 1) { //Jogador já registrou nome e está desistindo
        var bol_r = obj_jogador.altera_estado(1, obj_mapa.linkId);

        if (!bol_r) {
            alert(msg_usuario("nj05"));
        }

    } 

    efetua_saida(obj_jogador ,true);
}

//Documento carregado 
$(document).ready(function () {

    //Links sair
    $("#link_sair").click(function () {
        realiza_saida();
    });

    $("#link_sair_menu").click(function () {
        realiza_saida();
    } );

	
    //Botão verificar apelido jogador
    $("#btn_checar_mapa").click(function (e) {
        var str_id_mapa = $("#frm_mapa").val();

        if (str_id_mapa == "") {
            alert(msg_usuario("nj06"));
            return;

        }

        obj_mapa.linkId = str_id_mapa;

        var str_m = obj_jogador.entrar_jogo(obj_mapa);

        if (str_m == "m1") {
            alert(msg_usuario("nj07"));
            //e.preventDefault();
            return false;
        }

        if (str_m == "m2") {
            alert(msg_usuario("nj08"));
            //e.preventDefault();
            return false;
        }

        //Registra Id do mapa em cookie
        cria_cookie("mapaId", str_id_mapa);

        //Desabilitando controles
        $(this).attr("disabled", true);
        $("#frm_mapa").attr("disabled", true);

        //Mostrando formulário de cadastro de apelido
        $("#frm_login_jogador").show(1000);

        //Mostrando botão de sair no menu
        $("#link_sair_menu").css("visibility", "visible");
 
    });

	//Botão verificar apelido jogador
	$("#btn_checar_nome").click(function (e) {
        var str_n = $("#frm_nome").val();

        if (str_n == "") {
            alert(msg_usuario("nj01"));
            e.preventDefault();
            return;
        }

        obj_jogador.nome = str_n;

        var int_r = obj_jogador.checa_nome(obj_mapa.linkId);

        if (int_r == -1) {

            if (obj_jogador.sinalErro > 0) { //Erro inesperado
                alert(msg_usuario("gm1"));
            }
            if (obj_jogador.sinalErro < 0) { //Sem acesso aos recursos
                alert(msg_usuario("gm2"));
            }
            e.preventDefault();
            return;
        }

        if (int_r == 1) { //Nome cadastrado
            alert(msg_usuario("nj02"));
            e.preventDefault();
            return;

        } else {
            $("#div_msg_usuario").show();
            $("#span_nome").html( obj_jogador.nome);
            cria_cookie("jogador", obj_jogador.nome );
            obj_timer = setInterval(f_checa_mapa, 5000);//A cada 5 segundos
            $(this).attr("disabled", true);

            int_pub_opc_saida = 1; //Modo de saída que indica desistência
        }

        

    });

    //Botão que mostra painel do jogador
    $("#btn_painel").click(function () {

        //Atualizando estado do jogador
        if (obj_jogador.altera_estado(2, obj_mapa.linkId) == false) {
            alert(msg_usuario("nj04"));
        }

        var str_end = window.location.href;
        str_end = str_end.substr(0, str_end.lastIndexOf("/") + 1) ;
        str_end = str_end + "painel.html";
        window.location.href = str_end;
    });

    //Após carregamento de documento - Obtém linkId do mapa
    //obj_mapa.linkId = obtem_cookie("mapaId");
    
});
