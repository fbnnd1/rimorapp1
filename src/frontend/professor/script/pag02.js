//Variáveis necessárias

var arr_lugares = [];
var bol_inicio = true;
var obj_mapa;
var obj_educador = new Educador();

//Variáveis para auxiliar o controle
var ctrl_opcao_marcar = false;
var arr_pub_xy = [];
var ponteiro_arr_xy = -1;

function retira_aspas(str_texto) {
	var str_r = str_texto;
	str_r = str_r.replace(/\'/g, "");
	str_r = str_r.replace(/\"/g, "");

	return str_r;
}

function bloqueia_botoes_mapa(int_opc) {

	$("#btn_marca_lugar").attr("disabled", true);
	$("#btn_conf_marcacao").attr("disabled", true);
	$("#btn_cancela_marcacao").attr("disabled", true);

	if (int_opc == 4) {$("#btn_marca_lugar").attr("disabled", false);}
	
	if (int_opc == 3) {
		$("#btn_conf_marcacao").attr("disabled", false);
		$("#btn_cancela_marcacao").attr("disabled", false);
	}

}

//Documento carregado
$(document).ready(function () {

    //Link sair
    $("#link_sair").click(function () {
        efetua_saida(obj_educador, false);
    });

	//Botão que habilita adição de pontos ao mapa
	$("#btn_marca_lugar").click(function () {
		 bloqueia_botoes_mapa(3);
		 adiciona_interacao();

	});

	//Botão que desabilita adição de pontos ao mapa
	$("#btn_cancela_marcacao").click(function () {
		 bloqueia_botoes_mapa(4);
		 remove_ultimo_ponto_mapa();
	});

	//Botão que habilita adição das informações dos lugar marcado
	$("#btn_conf_marcacao").click(function () {
		 bloqueia_botoes_mapa(0);
		 $("#div_info_lugar").show(1000);
	});
	
	//Botão que escolhe e adiciona lugar ao vetor
	$("#frm1_btn_adMapa").click(function() {
		var str_nome = $("#frm1_nome").val();
		var str_dica = "";
		var str_dica_extra = "";
		var str_desc = "";
		var int_pontos = 0;

		if (str_nome == "") {
			alert(msg_usuario("p02m9"));
		} else {
			if (bol_inicio) { //1º clique no botão
				bol_inicio = false;
				//$("#h3_1_passos").html(msg_usuario("p02m4"));
				//$("#p_1_passos").html(msg_usuario("p02m5"));

				$(this).html("Adicionar lugar ao Mapa");


				$("#frm1_dica").attr("disabled", false);
				$("#frm1_dica_extra").attr("disabled", false);
				$("#frm1_desc").attr("disabled", false);
				$("#frm1_pontos").attr("disabled", false);

			} else {

				str_dica = $("#frm1_dica").val();
				str_dica_extra = $("#frm1_dica_extra").val();
				str_desc = $("#frm1_desc").val();
				int_pontos = $("#frm1_pontos").val();

				if ((str_dica == "") || (str_desc == "")) {
					alert(msg_usuario("p02m3"));
					return;
				}
			}

			//Retirnado as aspas
			str_nome = retira_aspas(str_nome);
			str_dica = retira_aspas(str_dica);
			str_dica_extra = retira_aspas(str_dica_extra);
			str_desc = retira_aspas(str_desc);

			//Obtendo latitude e longitude e criando objeto lugar
			var arr_temp1 = ol.proj.toLonLat(arr_pub_xy[ponteiro_arr_xy]);

			//var obj_lugar = new Lugar( arr_temp1[1], arr_temp1[0] );
			var obj_lugar = new Lugar( arr_temp1[0], arr_temp1[1] );
			obj_lugar.nome =  str_nome; 
			obj_lugar.ordem = arr_lugares.length;

			obj_lugar.dica = str_dica;  //Atualizando informações do lugar
			obj_lugar.dicaExtra = str_dica_extra;
			obj_lugar.descricao = str_desc;
			obj_lugar.pontos = int_pontos;

			arr_lugares.push(obj_lugar); //Adicionando lugar a lista


			if (arr_lugares.length > 1) { //Existem pelo menos 2 lugares selecionados
				$("#div_btn_fim_adMapa").show();
			}

			//Limpando caixas de textos
			$("#frm1_nome").val("");
			$("#frm1_dica").val("");
			$("#frm1_dica_extra").val("Sem dica extra.");
			$("#frm1_desc").val("");
			$("#frm1_pontos").val(5);
            $("#span_frm1_pontos_valor").html("5");

			//Habilitando botão para adicionar mais lugares
			bloqueia_botoes_mapa(4);

			//Esconde formulário
			$("#div_info_lugar").hide(1000);

			alert(msg_usuario("p02m1"));

		}
	});

	//Botão que encerra a adição de lugares ao mapa
	$("#frm1_btn_fim_adMapa").click(function() {

			if (arr_lugares.length < 2) {
				alert(msg_usuario("p02m6"));
			} else {
				$("#div_form2").show();
				$("#div_info_lugar").hide();
				$(".div_comp_mapa").hide();
				$("#div_btn_fim_adMapa").hide();
			}

	});

	//botão que cadastra mapa no BD
	$("#frm2_btn_cadMapa").click(function() {
		var str_nome = $("#frm2_cad_nome").val();
		var str_desc = $("#frm2_cad_desc").val();

		if ((str_nome == "") || (str_desc == "")) {
			alert(msg_usuario("p02m7"));
		}

                //Retirnado as aspas
		str_nome = retira_aspas(str_nome);
		str_desc = retira_aspas(str_desc);

		//Checagem do nome
		obj_mapa = new Mapa(str_nome);
		obj_mapa.nome = str_nome;
		var var_r1 = obj_mapa.checa_nome();

		if (var_r1 == null) {
			alert(msg_usuario("gm1"));
			return;
		}

		if ( var_r1== true) {
			alert(msg_usuario("p02m8"));
			return;
		}

		obj_mapa.descricao = str_desc;

		//Adicionnado lugares ao mapa
		for (int_i in arr_lugares) {
			obj_mapa.adiciona_ponto(arr_lugares[int_i]);
		}
		
		var bol_sucesso = obj_mapa.cadBd();

		//alert(obj_mapa.gera_json());

		if (bol_sucesso) {
			alert(msg_usuario("p02m10"));
			$(this).attr("disabled", true); //Desabilitando botão
		} else {
			alert(msg_usuario("p02m11"));
		}
	});

	//Notificar usuário da variação de pontos
	$("#frm1_pontos").change(function(){
		$("#span_frm1_pontos_valor").html($(this).val() );
	});

  

});
