var obj_mapa = new Mapa("MeuMapa");
var obj_jogador = new Jogador();
var obj_educador = new Educador();


var obtem_jogadores = function () {

    var var_r = obj_mapa.obtem_jogadores();

    if (typeof(var_r) == "object") {

        var i;
       
        var str_molde = $("#tabela_jogadores_dados_modelo").html();
        var str_dados_temp = "";
        var str_dados_exb = "";

        for (i in var_r) {
            str_dados_temp = str_molde; //Copiando molde
           
            //Personalizando molde
            str_dados_temp = str_dados_temp.replace("@@nome@@", var_r[i].nome);
            str_dados_temp = str_dados_temp.replace("@@pontos@@", var_r[i].pontos);
            str_dados_temp = str_dados_temp.replace("@@lugares@@", var_r[i].lugares);
            str_dados_temp = str_dados_temp.replace("@@duracao@@", var_r[i].duracao);
            str_dados_temp = str_dados_temp.replace("@@estado@@", var_r[i].estado);
            
            //Salvando personalização
            str_dados_exb += str_dados_temp;
        }

        if (str_dados_exb == "") { //Mapa sem jogadores
            str_dados_exb = "<tr><td colpan\"5\">Mapa sem jogadores.</td></tr>"
        }
        
        $("#tabela_jogadores_dados").html(str_dados_exb); //mostrando na tela

    } else {
        $("#tabela_jogadores_dados").html("<tr><td colpan\"5\">" + msg_usuario("mm03") + "</td></tr>");
    }

}

function gera_html_lugar (obj_lugar) {

    //Obtendo molde
    var str_molde = $("#tabela_lugares_dados_modelo").html();
    
    var str_dados_exb = str_molde; //Copiando molde
           
    //Personalizando molde
    str_dados_exb = str_dados_exb.replace("@@lugar@@", obj_lugar.nome);
    str_dados_exb = str_dados_exb.replace("@@pontos@@", obj_lugar.pontos);
    str_dados_exb = str_dados_exb.replace("@@dica1@@", obj_lugar.dica);
            
    return str_dados_exb;
    
}

var f_habilita_btn_liberar_mapa = function () {
    $("#frm1_btn_libera_sim").attr("disabled", false);
}

function controla_botoes_acesso_mapa(bol_espera_liberacao_mapa = false) {
    if (obj_mapa.estado == "I") { //Mapa inativo (bloqueado)
       if (!bol_espera_liberacao_mapa) {
           $("#frm1_btn_libera_sim").attr("disabled", false);
       } else {
           setTimeout(f_habilita_btn_liberar_mapa, 10000); //Libera o botão de liberação após 10 segundos para evitar erros
       }

        $("#frm1_btn_libera_nao").attr("disabled", true);
        $("#frm1_btn_jogar_sim").attr("disabled", true);
        $("#p_msg1").show();
    }

    if (obj_mapa.estado == "A") { //Mapa ativo (disputa em andamento)
        $("#frm1_btn_libera_sim").attr("disabled", true);
        $("#frm1_btn_libera_nao").attr("disabled", false);
        $("#frm1_btn_jogar_sim").attr("disabled", true);
        $("#p_msg1").hide();
    }

    if (obj_mapa.estado == "L") { //Mapa liberado (cadastro jogadores)
        $("#frm1_btn_libera_sim").attr("disabled", true);
        $("#frm1_btn_libera_nao").attr("disabled", false);
        $("#frm1_btn_jogar_sim").attr("disabled", false);
        $("#p_msg1").hide();
    }
}

function carrega_info_mapa() {

    //Obtendo id do mapa
    var str_end = window.location.href;

    var int_a = str_end.indexOf("=");

    var str_id = str_end.substring(int_a + 1);

    obj_mapa.idBd = str_id;

    obj_mapa.obtem_info();

    if (obj_mapa.sinalErro == -1){ //Falha no cesso a página
        $(".form-control").attr("disabled", true);
        alert(msg_usuario("gm2"));
        return;
    }

    if (obj_mapa.sinalErro != 0){ //Falha no cesso a página
        $(".form-control").attr("disabled", true);
        alert(msg_usuario("mm02"));
        return;
    }

    $("#frm1_nome").val(obj_mapa.nome);

    $("#frm1_link").val(obj_mapa.linkId);

    $("#frm1_btn_libera_sim").attr("disabled", true);
    $("#frm1_btn_libera_nao").attr("disabled", true);
    $("#frm1_btn_jogar_sim").attr("disabled", true);

    controla_botoes_acesso_mapa();

    var i;
    var arr_coords = [];
    var str_texto_html = "";
    var obj_ponto_geo;
    var obj_feature;
    var arr_objs_features = [];

    for (i in obj_mapa.pontos) {
        arr_coords = [obj_mapa.pontos[i].longitude, obj_mapa.pontos[i].latitude];
        //Dados do lugar para exibição
        str_texto_html += gera_html_lugar(obj_mapa.pontos[i]);

        obj_ponto_geo = new ol.geom.Point(ol.proj.fromLonLat(arr_coords) );
        //obj_ponto_geo = new ol.geom.Point( arr_coords );
        obj_feature   = new ol.Feature(obj_ponto_geo);

        if (i == 0) {
            obj_feature.setStyle(obj_estilo_verde);
        }

        arr_objs_features.push(obj_feature);

        obj_ponto_geo = null;
        obj_feature   = null;
    }
    
    //Carregamentos dos dados dos lugares p/ exibição na tela
    $("#tabela_lugares_dados").html(str_texto_html);

    desenha_mapa(arr_objs_features, [obj_mapa.pontos[0].longitude, obj_mapa.pontos[0].latitude]);

    $("#span_msg_usuario").hide();

}

$(document).ready(function () {

    $("#link_sair").click(function () {
        efetua_saida(obj_educador, false);
    });

    //Botão que libera o mapa
    $("#frm1_btn_libera_sim").click(function () {

        if (obj_mapa.altera_estado(1) == false) {
            alert(msg_usuario("mm01"));
            return;
        }

        controla_botoes_acesso_mapa();
    });

    //Botão que bloqueia mapa para acesso
    $("#frm1_btn_libera_nao").click(function () {
        if (obj_mapa.altera_estado(3) == false) {
            alert(msg_usuario("mm01"));
            return;
        }

        controla_botoes_acesso_mapa(true);
    });

    //Botão que permite início da disputa
    $("#frm1_btn_jogar_sim").click(function () {
        
        if (obj_mapa.altera_estado(2) == false) {
            alert(msg_usuario("mm01"));
            return;
        }
        
        controla_botoes_acesso_mapa();
    });

    carrega_info_mapa();

    setInterval(obtem_jogadores, 5000);
});