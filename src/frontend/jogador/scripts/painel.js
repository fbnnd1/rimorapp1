var obj_jogador      = new Jogador();
var obj_mapa_jogo    = new Mapa("MeuMapa");
var obj_lugar_temp   = new Lugar(0,0);

var obj_mapa_div;

var ctrl_time1_pontosJogador;

//Variáveis para auxiliar o controle
var ctrl_opcao_marcar = false;
var arr_pub_xy = [];
var ponteiro_arr_xy = -1;
var arr_adversarios = [];
var int_pub_opc_saida = 1; //Opção de saída para desistência
var ctrl_data_hora;
var ctrl_int_dados_jogador = 0; //Atualiza apenas a duração
var ctrl_relogio;
var ctrl_at_dados_jogador;
var ctrl_int_at_jogador_erro = 0;
var ctrl_qtde_ultrapassagem = 0;
var ctrl_obtencao_prox_lugar_btn_dica;

//Funções
//Variável de controle: ctrl_time1_pontosJogador. Execução: A cada 5s
function atualiza_tela() {
    
    //Checando estado do mapa
    var bol_r = obj_mapa_jogo.obtem_estado();

    if (bol_r) { //Obteve com sucesso o estado do mapa
        if (obj_mapa_jogo.estado != "A") { //O mapa foi bloqueado

            //Desabilitando timers
            clearInterval(ctrl_at_dados_jogador);
            clearInterval(ctrl_time1_pontosJogador);
            clearInterval(ctrl_relogio);
            
            //Informando que não é desistência od usuário
            int_pub_opc_saida = 0;
            
            //Desabilitando botões
            $("#btn-marcar").attr("disabled", true);
            $("#btn-marcar").attr("disabled", true);
            //desabilitando funções de magia
            des_habilita_btns_f(true);

            //Avisando o usuário
            alert(msg_usuario("pj20"));
            
            return;
        }
    }

    //Checando ranking de jogadores
    var str_r = obtem_jogadores();

    //Ultrapassagem
    if ((str_r != "") && (str_r != undefined)) {
        var str_msg = msg_usuario("pj07") + str_r;
        var str_html_msg = $("#div_msg_ult_jogadores").html();
        $("#div_msg_ult_jogadores").html(str_html_msg + "<br />" + str_msg);
        ctrl_qtde_ultrapassagem++;
        if (ctrl_qtde_ultrapassagem > 9) {
            $("#btn_limpa_msg_ranking").show();    
        }
    }

    //Checando se foi enfeitiçado
    checagem_jogador_feiticado();

}

function obter_proximo_lugar()  {

    var var1 = obj_mapa_jogo.obtem_lugar_por_ordem(obj_lugar_temp.ordem + 1);

    if (var1 == false) {//Erro
        return false;
    }

    if (var1 == null) { //Não existe um próximo lugar
        return null;
    }

    return var1; //Retornando lugar

}

//Variável que conterá um ponteiro para a função que realiza a obtenção do próximo lugar
var chama_obter_proximo_lugar = function () {
    var var_r = obter_proximo_lugar();

    if (var_r == false) { //Erro na obtenção do próximo lugar
        //alert(msg_usuario("pj10"));
        $("#msg_usuario").html(msg_usuario("pj10"));
		$("#modal_msg").modal({backdrop: "static"});
        //setTimeout(chama_obter_proximo_lugar, 3000);
        return;
    }
    clearInterval(ctrl_obtencao_prox_lugar_btn_dica);

    if (var_r == null) { //Jogador terminou o jogo
        $("#div-dica").html(msg_usuario("pj03"));
        clearInterval(ctrl_time1_pontosJogador);
        clearInterval(ctrl_relogio);
        $("#div-dica").html("<h2>Fim de Jogo!</h2>");
        $("#div-dica").show();
        clearTimeout(ctrl_botoes_exb_info_lugares_dicas);
        exb_div_info_lugar_dica(false);
        $(".btn-magia").attr("disabled", true);
        ctrl_int_dados_jogador = 2;
        int_pub_opc_saida = 0;

        return;
    }

    obj_lugar_temp = var_r;

    $("#div-dica").html("Dica: " + obj_lugar_temp.dica + "<br /><br />");

    //Habilitando botões
    $("#btn-marcar").attr("disabled", false);
    
    des_habilita_btns_f(false);

}

//função que realiza a obtenção dos jogadores (Atualiza o ranking)
function obtem_jogadores () {

    var var_r = obj_mapa_jogo.obtem_jogadores();
    var str_r = "";

    if ((var_r != false) && (var_r != null)){

        var obj_jogador_temp, int_contador = 1;
       
        var str_molde = $("#tabela_jogadores_dados_modelo").html();
        var str_dados_temp = "";
        var str_dados_exb = "";

        for (obj_jogador_temp of var_r) {
            str_dados_temp = str_molde; //Copiando molde
           
            //Personalizando molde
            str_dados_temp = str_dados_temp.replace("@@nome@@", obj_jogador_temp.nome);
            str_dados_temp = str_dados_temp.replace("@@pontos@@", obj_jogador_temp.pontos);
            str_dados_temp = str_dados_temp.replace("@@lugares@@", obj_jogador_temp.lugares);
            str_dados_temp = str_dados_temp.replace("@@posicao@@", obj_jogador_temp.posicao);

            //Checando mudança de posição
            if (obj_jogador_temp.nome == obj_jogador.nome) { //É o Jogador

                //Desataque linha jogador

                str_dados_temp = str_dados_temp.replace(/dados_ranking/g, "destaque-ranking");
                
                //O Jogador caiu de posição
                if ((obj_jogador.posicao < obj_jogador_temp.posicao) && (obj_jogador.posicao != 0)) { //A ordem atual do jogador é menor que a anterior
                    var int_q = obj_jogador.posicao - 1;
                    str_r = var_r[int_q].nome;
                } else {
                    str_r = "";
                }

                //Atualizando dados do jogador
                obj_jogador.posicao = obj_jogador_temp.posicao;

            } else {
                if ( arr_adversarios.indexOf(obj_jogador_temp.nome) == -1 ) {
                    arr_adversarios.push(obj_jogador_temp.nome);
                    adiciona_botao_magia4(obj_jogador_temp.nome);
                }
            }

            //Salvando personalização
            str_dados_exb += str_dados_temp;

            int_contador++; //Apagar se não usar
        }
        
        $("#tabela_jogadores_dados").html(str_dados_exb); //mostrando na tela
        

        return str_r;

    } else {
        $("#tabela_jogadores_dados").html("<tr><td colpan\"4\">" + msg_usuario("pj08") + "</td></tr>");
    }

}

//Ponteiro para função que atualiza relógio
//Variável de controle: ctrl_relogio. Execução: A cada 1 segundo
var atualiza_relogio = function () {
    //Obtendo tempo de duração
    var obj_datahora = new Date();
    var int_s, int_m, int_h, str_h = "", str_m = "", str_s = "";

    var int_msegs_atual = obj_datahora.getTime();
    var int_msegs_inicio = ctrl_data_hora.getTime();

    var int_r = int_msegs_atual - int_msegs_inicio;

    int_s = Math.round(int_r / 1000);

    int_h = Math.floor(int_s / 3600);
    int_s = int_s % 3600;
    if (int_h < 10) { str_h = "0" }
    str_h += int_h.toString();

    int_m = Math.floor(int_s / 60);
    int_s = int_s % 60;
    if (int_m < 10) { str_m = "0" }
    str_m += int_m.toString();

    if (int_s < 10) { str_s = "0" }
    str_s += int_s.toString();

    str_h = str_h + ":" + str_m + ":" + str_s;
    str_h = str_h.replace(" ", "");

    obj_jogador.tempoJogo = str_h;

    //Atualizando tela com tempo do jogo
    $("#div_tempo").html(obj_jogador.tempoJogo);

}

//Ponteiro p/ função que atualiza dados do jogador no BD
//Variável de controle: ctrl_at_dados_jogador. Execução: A cada 10s
var atualiza_dados_jogador_bd = function() {
    
    var int_r;
    if (ctrl_int_dados_jogador > 0) { //At. BD com todos os dados
        int_r = obj_jogador.atualiza_dados_bd(obj_mapa_jogo.linkId, 1);
        if (ctrl_int_dados_jogador == 1) { //O Jogador ainda não terminou o jogo
            ctrl_int_dados_jogador = 0;
        } else { //O jogador terminou o jogo
            
            if (obj_jogador.altera_estado(3, obj_mapa_jogo.linkId) == false) {  //At. estado
                alert(msg_usuario("pj11"));
                obj_jogador.estado = "F";
            }

            clearInterval(ctrl_at_dados_jogador); //Encerrando a execução da rotina de atualização do jogador

            atualiza_tela(); //At. Tela pela última vez
        }
    } else {
        int_r = obj_jogador.atualiza_dados_bd(obj_mapa_jogo.linkId, 2);
    }

    if (int_r == 0){
        ctrl_int_at_jogador_erro = 0;
    } else {
        ctrl_int_at_jogador_erro++;
    }

    if (ctrl_int_at_jogador_erro > 60) {
        $("#msg_usuario").html(msg_usuario("pj09"));
		$("#modal_msg").modal({backdrop: "static"});
        ctrl_int_at_jogador_erro = 0;
    }

}

//Atualiza painel 1 com as informações do jogador
function at_pontuacao_jogador_painel1() {
    $("#div_pontos").html(obj_jogador.pontos);
    $("#div_lugares").html(obj_jogador.lugares);
}

//Funções de controle de exibição das dicas e Lugares
function exb_div_info_lugar_dica(bol_exibe) {

    if (bol_exibe) {
        $("#btn_mostra_dica").show();
        $("#btn_exb_lugares").show();
    } else {
        $("#btn_mostra_dica").hide();
        $("#btn_exb_lugares").hide();
    }
}

var ctrl_botoes_exb_info_lugares_dicas = function() {
    exb_div_info_lugar_dica(true);
}

//1 - ocultar a dica e exibir info lugar
//2 - exibe a dica e oculta botão
function ctrl_exb_info_lugares_dicas(int_opc) {
    
    if (int_opc == 1) {
        $("#div-dica").hide();
        $("#div-info-lugar").show();
    }

    if (int_opc == 2) {
        $("#div-dica").show();
        $("#btn_mostra_dica").hide();
    }

}

//Função para carregar e mostrar os dados iniciais
function carrega_dados_iniciais() {
    obj_mapa_jogo.linkId = obtem_cookie("mapaId");

    //Marcação do ponto inicial
    var var1 = obj_mapa_jogo.obtem_lugar_inicial();
   
    if (var1 === false) {
        alert(msg_usuario("pj01"));
        return false;
    }
    
    obj_lugar_temp = var1; //Obtendo lugar inicial
    
    //Desenhando no mapa
    var arr1 = [obj_lugar_temp.longitude, obj_lugar_temp.latitude];
    desenha_mapa(arr1);
    $("#div-dica").html("");


    var1 = obter_proximo_lugar();

    if ((var1 === false) || (var1 === null)) { //Erro na obtenção do 1º lugar a descobrir
        alert(msg_usuario("pj02"));
        return false;
    }
    
    //Exibindo dica
    $("#div-dica").html("Dica: " + var1.dica + "<br /><br />");
    //Obtendo descricao do mapa
    obj_mapa_jogo.descricao = "";
    obj_mapa_jogo.obtem_descricao();
    $("#div_desc_mapa").html( obj_mapa_jogo.descricao );
    //habilitando botão de marcar
    $("#btn-marcar").attr("disabled", false);
    //habilitando funções de magia
    des_habilita_btns_f(false);

    //Salvando lugar
    obj_lugar_temp = var1;

    obj_jogador.pontos = 0;
    obj_jogador.lugares = 0;
    obj_jogador.posicao = 0;
    obj_jogador.tempoJogo = "00:00:00";
    obj_jogador.estado = "A";
    obj_jogador.nome = obtem_cookie("jogador");

    //Atualizando painel do jogador
    at_pontuacao_jogador_painel1();

    ctrl_data_hora = new Date(); //Obtendo datahora atual

    $("#span_logo").html("<span class=\"glyphicon glyphicon-user\"></span> " +   obj_jogador.nome  );

    ctrl_relogio = setInterval(atualiza_relogio, 1000); //A cada segundo
    ctrl_at_dados_jogador = setInterval(atualiza_dados_jogador_bd, 10000); //A cada 10 segundos

}

//Funções de mágia
function des_habilita_btns_f(bol_p) {
    $(".btn-magia").attr("disabled", bol_p);
}

//Função que verifica se o jogador tem pontos suficentes para usar magia.
//Caso sim, subtrair os pontos e retorna true, senão retorna false.
function troca_pontos_p_magica(int_pontos) {
    if (obj_jogador.pontos < int_pontos) {
        return false
    } else {
        obj_jogador.pontos = obj_jogador.pontos - int_pontos;
        at_pontuacao_jogador_painel1();
    }
    return true;
}

//Magia 1 - Distância

var f_ctrl_magia1 = function() {
    $("#div-texto-magia").html("");
    //$("#btn-f1").attr("disabled", false); 
}

//Magia 2 - Aparece lugar
var ctrl_magia2 = false;

//Passou os 30s
var f_ctrl_magia2 = function() {
    if (ctrl_magia2) { //Ponto está aparecendo no mapa
        ctrl_magia2 = false;
        remove_ultimo_ponto_mapa();
        //$("#btn-f2").attr("disabled", false); 
    }
}

//Magia 4


ctrl_aux1 = true;

function enfeiticar_adversario(str_adv, objBotao) {

    var var_r = obj_jogador.enfeiticar(str_adv, obj_mapa_jogo.linkId);

    if (var_r == null) {
        alert(msg_usuario("pj30"));
        return;
    }

    if (var_r) {
        alert(msg_usuario("pj32"));
        objBotao.disabled = true;
        obj_jogador.pontos = obj_jogador.pontos - 10;
    } else {
        alert(msg_usuario("pj31"));
    }

}

var ctrt_desativar_feitico_magia4 = function () {

    var bol_r = obj_jogador.desenfeiticar(obj_mapa_jogo.linkId);

    $("#modal_msg_magia4").modal("hide");

}

function checagem_jogador_feiticado() {
    
    var var_r = obj_jogador.fui_enfeitcado(obj_mapa_jogo.linkId);

    if (!var_r) { //Não foi enfeitiçado ou erro
        return;
    }

    $("#div_msg_jogador_magia4").html( var_r + msg_usuario("pj33")  )

    $("#modal_msg_magia4").modal({keyboard: false, backdrop: "static"});

    setTimeout(ctrt_desativar_feitico_magia4, 30000);    
}

function adiciona_botao_magia4(str_adversario) {
    var str_html_botoes_magia4 = $("#div_botes_magia4").html();
    var str_molde_btn_magia4 = $("#div_btn_magia4_modelo").html();
    str_molde_btn_magia4 = str_molde_btn_magia4.replace(/@@Nome@@/g,str_adversario);
    
    str_html_botoes_magia4 += str_molde_btn_magia4;

    $("#div_botes_magia4").html(str_html_botoes_magia4);
}

//Quando o documento estiver completamente carregado
$(document).ready(function () {

    //Link sair
    $("#link_sair").click(function () {
        
        if (int_pub_opc_saida == 1) { //Jogador está desistindo
            var bol_r = obj_jogador.altera_estado(1, obj_mapa_jogo.linkId);

            if (!bol_r) {
                alert(msg_usuario("pj12"));
            }

        }

        efetua_saida(obj_jogador, true);

    });

    //botão que marca lugar
    $("#btn-marcar").click(function () {

        if (ctrl_magia2) {  //Magia ativa que revela lugar
            remove_ultimo_ponto_mapa();
            ctrl_magia2 = false;
        }

        $("#btn-palpitar").attr("disabled", false);
        $(this).attr("disabled", true);
        adiciona_interacao();
        $("#div_mapa").addClass("marca-lugar");
        
        /*
        if (ctrl_opcao_marcar == false) {
            ctrl_opcao_marcar = true;
            adiciona_interacao();
            
        }
        */
    });

    //Botão palpitar
    $("#btn-palpitar").click(function () {

        $(this).attr("disabled", true);
        //Desabilitnado funções de mágia
        des_habilita_btns_f(true);

        var arr_coords = [parseFloat(obj_lugar_temp.longitude), parseFloat(obj_lugar_temp.latitude)];

        var flt_d = obtem_distancia(ol.proj.fromLonLat(arr_pub_xy[ponteiro_arr_xy]), ol.proj.fromLonLat(arr_coords));
        //flt_d = flt_d / 1000;

        if (flt_d <= 100.00) {
            alert(msg_usuario("pj04"));
            $("#div-dica").html(""); //Limpando dica
            
            obj_jogador.pontos =  obj_jogador.pontos + obj_lugar_temp.pontos;
            obj_jogador.lugares = obj_jogador.lugares + 1;

            //Atualizando painel do jogador
            at_pontuacao_jogador_painel1();

            atualiza_tela();
            //setTimeout(chama_obter_proximo_lugar, 3000);
            ctrl_obtencao_prox_lugar_btn_dica = setInterval(chama_obter_proximo_lugar, 3000);
            
            ctrl_int_dados_jogador = 1;//habilitando salvamento dos dados completos do jogador
            
            //Exibindo descrição e iniciando espera para leitura
            //var str_descs = $("#div-info-lugar").html();
            //str_descs = str_descs + "<b>Lugar<b><br />" + obj_lugar_temp.descricao;
            $("#div-info-lugar").html("<b>" + obj_lugar_temp.nome + "</b><br />" + obj_lugar_temp.descricao);
            exb_div_info_lugar_dica(false);
            setTimeout(ctrl_botoes_exb_info_lugares_dicas, 30000);
            ctrl_exb_info_lugares_dicas(1);
            
            altera_cor_ponto_vermelho(); //Altera a cor do último ponto para vermelho

        } else {
            remove_ultimo_ponto_mapa(); 
            alert(msg_usuario("pj05"));
            $("#btn-marcar").attr("disabled", false);
            //Habilitnado funções de mágia
            des_habilita_btns_f(false);
        }

        //Faz o mapa não apresentar cursor de marcação
        $("#div_mapa").removeClass("marca-lugar");
        
    });

    //Botão controla exibição do ranking
    $("#btn_tabela_ranking").click(function () {
        $("#div_jogadores").fadeToggle();
    });

    //Exibe dica
    $("#btn_mostra_dica").click(function () {
        ctrl_exb_info_lugares_dicas(2);
    });

    //Exibe oculta informações lugar
    $("#btn_exb_lugares").click(function () {
        $("#div-info-lugar").fadeToggle();
    });

    //Botão que limpa as mensagens de ultrapassagem
    $("#btn_limpa_msg_ranking").click(function () {
        $("#div_msg_ult_jogadores").html("");
        $(this).hide();
    });

    //Botões de mágicas

    //Obtém distância do próximo ponto
    $("#btn-f1").click(function () {
        
        //Checando pontuação suficiente
        if (troca_pontos_p_magica(2) == false) {
            alert(msg_usuario("pj13"));
            return false;
        }
        
        var arr1 = [parseFloat(obj_lugar_temp.longitude), parseFloat(obj_lugar_temp.latitude)];
        var arr2 = [parseFloat(obj_mapa_jogo.pontos[0].longitude), parseFloat(obj_mapa_jogo.pontos[0].latitude)];
        var flt_d = obtem_distancia(ol.proj.fromLonLat(arr1),ol.proj.fromLonLat(arr2));
        flt_d = flt_d / 1000;
        //var str_a1 = $("#div-texto-magia").html() + "<br />";
        $("#div-texto-magia").html(flt_d.toString().replace(".", ",")  + " Km de distância do início aproximadamente.");
        
        //Definindo tempo de expiração da magia
        setTimeout(f_ctrl_magia1, 30000);

        ctrl_int_dados_jogador = 1;//habilitando salvamento dos dados completos do jogador

        $(this).attr("disabled", true);
    });

    //mostra próximo ponto
    $("#btn-f2").click(function () {
        //Checando pontuação suficiente
        if (troca_pontos_p_magica(5) == false) {
            alert(msg_usuario("pj13"));
            return false;
        }

        //var arr1 = [obj_lugar_temp.latitude, obj_lugar_temp.longitude];
        var arr1 = [obj_lugar_temp.longitude, obj_lugar_temp.latitude];
        desenha_ponto_temporario(arr1);
        ctrl_magia2 = true;
        setTimeout(f_ctrl_magia2, 30000);

        ctrl_int_dados_jogador = 1;//habilitando salvamento dos dados completos do jogador

        $(this).attr("disabled", true);
    });

    $("#btn-f3").click(function () {

        //Checando pontuação suficiente
        if (troca_pontos_p_magica(5) == false) {
            alert(msg_usuario("pj13"));
            return false;
        }

        var str_dica =  $("#div-dica").html();
        str_dica = str_dica + "<br />" + obj_lugar_temp.dicaExtra;
        $("#div-dica").html(str_dica);

        $(this).attr("disabled", true);

    });

    //Configurações iniciais
    ctrl_time1_pontosJogador = setInterval(atualiza_tela, 5000);

    carrega_dados_iniciais();

});
