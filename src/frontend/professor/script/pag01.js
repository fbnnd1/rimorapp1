//Variáveis necessárias

var arr_mapas = [];
var int_p_mapa = 0;
var ctrl_int_p_mapa_excluir = -1;
var obj_educador = new Educador();

//Documento carregado 
$(document).ready(function () {

    //Link sair
    $("#link_sair").click(function () {
		efetua_saida(obj_educador, false);
    });
	
	//(Funciona apenas para objetos não definidos dinamicamente)

	//Botão que exibe mais mapas
	$("#btn_exb_mapas").click(function () {
		exibe_mapas();
	});

	//Botões da caixa de diálogo
	//Botão excluir btn-conf-excluir
	$("#btn-conf-excluir").click(function () {
		excluir_mapa(arr_mapas[ctrl_int_p_mapa_excluir].idBd, arr_mapas[ctrl_int_p_mapa_excluir].linkId);
		ctrl_int_p_mapa_excluir = -1;
	});

	//Exibindo primeiros 3 mapas
	setTimeout(exibe_mapas, 5000);

});

function exibe_mapas() {

	var int_total_atual = arr_mapas.length;

	var bolErro = Mapa.atualiza_lista_mapas( int_p_mapa, arr_mapas);

	if (bolErro) {
		alert(msg_usuario("p01m1"));
		return;
	}

	if (arr_mapas.length == 0) { //Sem mapas cadastrados
		$("#p_msg_inicial").html(msg_usuario("p01m2"));
		return ;
	}
	

	if (int_total_atual ==  arr_mapas.length) { //Sem mapas novos
		$("#btn_exb_mapas").attr("disabled", true);
		alert(msg_usuario("p01m3"));
		return;
	}


	//Exibição dos dados
	int_p_mapa += 3;

	var str_molde = $("#div_modelo").html();

	var str_html_r = "";

	for (var i in arr_mapas) {
		str_html_r += str_molde + "\n";

		str_html_r = str_html_r.replace("@@nome@@", arr_mapas[i].nome);
		str_html_r = str_html_r.replace("@@id@@", arr_mapas[i].idBd);
		//str_html_r = str_html_r.replace("@@id_ex@@", arr_mapas[i].idBd);
		str_html_r = str_html_r.replace("@@descricao@@", arr_mapas[i].descricao);
		//str_html_r = str_html_r.replace("@@linkid@@", arr_mapas[i].linkId);
		str_html_r = str_html_r.replace("@@btnidg@@", "btn_mapa" + arr_mapas[i].idBd + "_ger");
		str_html_r = str_html_r.replace("@@btnidex@@", "btn_mapa" + arr_mapas[i].idBd + "_ex");
		str_html_r = str_html_r.replace("@@p_mapa@@", i.toString() );
	}

	//Mostrando mapas
	$("#div_mapas").html(str_html_r);
	
	//Escondendo msg inicial
	$("#p_msg_inicial").hide();

	//Habilitando botões de novos mapas
	$("#btn_exb_mapas").attr("disabled", false);

}

//Função que abre o gerenciador
function abre_gerenciador(int_id) {
	var str_end_pg = window.location.href;
	str_end_pg = str_end_pg.replace("pag01", "pag01a" );
	window.location.href = str_end_pg + "?mapaid=" + int_id
}


//Função de confirmação de exclusão
function conf_excluir_mapa(int_posicao) {
	var str_msg = "Deseja mesmo exluir o mapa " + arr_mapas[int_posicao].nome + " ?";

	ctrl_int_p_mapa_excluir = int_posicao;

	$("#msg_usuario").html(str_msg);
	$("#modal_msg").modal({backdrop: "static"});

}

function cancela_excluir() {
	ctrl_int_p_mapa_excluir = -1;
}

//Função que exclui um mapa
function excluir_mapa(int_id, str_id) {
	var objMapa = new Mapa("Mapa");
	objMapa.idBd = int_id;
	objMapa.linkId = str_id;
	
	var bol_r = objMapa.exclui_mapa_bd();

	if (bol_r) { //Sucesso na exclusão 
		alert(msg_usuario("mmex02"));
	} else {
		alert(msg_usuario("mmex01"))
	}

	//Desabilitando botões do mapa
	$("#btn_mapa" + int_id + "_ger").attr("disabled", true);
	$("#btn_mapa" + int_id + "_ex").attr("disabled", true);
}