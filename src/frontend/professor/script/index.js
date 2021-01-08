//Variáveis necessárias
obj_educador = new Educador();

//Documento carregado 
$(document).ready(function () {
	
	//(Funciona apenas para objetos não definidos dinamicamente)

	//Botão de login educador
	$("#btn_login").click(function (e) {
        var str_u = $("#frm_usuario").val();
        var str_s = $("#frm_senha").val();

        if ((str_u == "") || (str_s == "")) {
            alert(msg_usuario("le02"));
            e.preventDefault();
            return;
        }

        obj_educador.login = str_u;
        obj_educador.senha = str_s;

        var strm = obj_educador.efetua_login();

        if (strm == "m1") {
            alert(msg_usuario("le01"));
            e.preventDefault();
            return;
        }

        if (strm == "m2") {
            alert(msg_usuario("le03"));
            e.preventDefault();
            return;
        }

        var str_end = window.location.href;
        str_end = str_end.substr(0, str_end.lastIndexOf("/") + 1) ;
        str_end = str_end + "pag01.html";
        window.location.href = str_end;


    });

    //Botão que verifica login no cadastro
    $("#btn_recup_senha_checa_usuario").click(function (e) {
        var str_u = $("#frm_recup_senha_usuario").val();

        if (str_u == "") {
            alert(msg_usuario("le11"));
            e.preventDefault();
            return;
        }

        obj_educador.login = str_u;

        var v_retorno = obj_educador.checa_cadastro_login();

        if (v_retorno == null) { // Erro no servidor
            alert(msg_usuario("gm2"));
            e.preventDefault();
            return;
        }

        if (v_retorno == false) { //Usuário não existe no cadastro
            alert(msg_usuario("le12"));
            e.preventDefault();
            return;
        }

        $(this).attr("disabled", true);
        $("#div_cad_nova_senha").show(1000);
        $("#btn_recup_cad_senha").show(1000);

    });

    //Botão que cadastra nova senha
    $("#btn_recup_cad_senha").click(function (e) {
        var str_s1 = $("#frm_recup_senha1").val();
        var str_s2 = $("#frm_recup_senha2").val();

        if (str_s1 == "") {
            alert(msg_usuario("le21"));
            e.preventDefault();
            return;
        }

        if (str_s1 != str_s2) {
            alert(msg_usuario("le22"));
            e.preventDefault();
            return;
        }

        var bol_r = obj_educador.altera_senha(str_s1);

        if (!bol_r) { //Erro no cadastro da senha
            alert(msg_usuario("gm2"));
            e.preventDefault();
            return;
        } else {
            alert(msg_usuario("le23"));
        }

    });

    //Botão que cadastra novo usuário
    $("#btn_cad_edu").click(function (e) {
        
        var str_u = $("#frm_cad_edu_usuario").val();
        var str_s1 = $("#frm_cad_edu_senha1").val();
        var str_s2 = $("#frm_cad_edu_senha2").val();
        var str_n = $("#frm_cad_edu_nome").val();
        var str_e = $("#frm_cad_edu_email").val();

        if (
            (str_u == "") ||
            (str_s1 == "") ||
            (str_s2 == "") ||
            (str_n == "") ||
            (str_e == "")
        ) {
            alert(msg_usuario("le31"));
            e.preventDefault();
            return;
        }

        if (str_s1 != str_s2) {
            alert(msg_usuario("le22"));
            e.preventDefault();
            return;
        }

        if (document.getElementById("frm_cad_edu_aceita_termo").checked == false) {
            alert(msg_usuario("le32"));
            e.preventDefault();
            return;
        }

        //Atualizando atributos
        obj_educador.login = str_u;
        obj_educador.senha = str_s1;
        obj_educador.nome = str_n;
        obj_educador.email = str_e;

        //Verificando se login de usuário já está cadastrado
        var v_ret = obj_educador.checa_cadastro_login();

        if (v_ret == null) { // Erro no servidor
            alert(msg_usuario("gm2"));
            e.preventDefault();
            return;
        }

        if (v_ret == true) { //Usuário existe no cadastro
            alert(msg_usuario("le34"));
            e.preventDefault();
            return;
        }

        //Fazendo o cadastro
        var bol_r = obj_educador.cad_educador_bd();

        if (!bol_r) { //Erro no cadastro da senha
            alert(msg_usuario("gm2"));
            e.preventDefault();
            return;
        } else {
            alert(msg_usuario("le33"));
        }


    });


    //Controle exibição formulários
    $("#h4_edu_login").click(function () {
        $("#div_frm_recup_senha").hide(1000);
        $("#div_frm_cad").hide(1000);
        $("#div_frm_edu_login").show(1000);
    });

    $("#h4_edu_recup_senha").click(function () {
        $("#div_frm_recup_senha").show(1000);
        $("#div_frm_cad").hide(1000);
        $("#div_frm_edu_login").hide(1000);
    });

    $("#h4_edu_cad").click(function () {
        $("#div_frm_recup_senha").hide(1000);
        $("#div_frm_cad").show(1000);
        $("#div_frm_edu_login").hide(1000);
    });
	
});