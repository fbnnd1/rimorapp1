function msg_usuario(str_op) {

    //Erros globais
    if (str_op == "gm1") {return "Ocorreu um erro inesperado. Por favor aguarde alguns instantes e tente novamente.\nSe o erro persistir informe código CS01 ao suporte:\n"; } //Msg Erro
    if (str_op == "gm2") {return "Ocorreu um erro no acesso ao servidor. Por favor aguarde alguns instantes e tente novamente.\nSe o erro persistir informe código CS02 ao suporte:\n"; } //Msg Erro
    
    //Cadastro de mapas
    if (str_op === "p02m1" ) { return "Lugar adicionado ao Mapa."; } ///{ return "Digite um termo para pesquisa"; } //desativado
    if (str_op === "p02m2" ) { return "Não foram encontrados lugares com os termos informados"; }
    if (str_op === "p02m3" ) { return "Os campos Dica e Descrição devem ser preeenchidos."; }
    if (str_op === "p02m4" ) { return "Demais lugares do mapa"; } //desativado
    if (str_op === "p02m5" ) { return "Informe os endereços dos demais lugares do mapa na ordem que o jogador(a) deve presseguir."; } //desativado
    if (str_op === "p02m6" ) { return "O mapa precisa ter pelo menos um ponto de partida e um final"; }
    if (str_op === "p02m7" ) { return "Os campos Nome e Descrição devem ser preeenchidos."; }
    if (str_op === "p02m8" ) { return "Nome já cadastrado. Especifique outro nome para o mapa."; }
    if (str_op === "p02m9" ) { return "Campo nome obrigatório."; }
    if (str_op === "p02m10" ) { return "Mapa cadastrado com sucesso!"; }
    if (str_op === "p02m11" ) { return "Erro no cadastramento do mapa.\nSe o erro persistir, informe o código AM01 ao suporte."; } //Msg Erro
    if (str_op === "p02m12" ) { return "Erro no acesso aos dados do servidor.\nSe o erro persistir, informe o código AM02 ao suporte."; } //Msg Erro

    //Meus mapas - exibição
    if (str_op === "p01m1" ) { return "Erro na obtenção de dados do servidor.\nAcione a opção \"Meus mapas\" para tentar novamente.\nSe o erro perssistir,  informe o código MM01 ao suporte."; } //Msg Erro
    if (str_op === "p01m2" ) { return "Você não possui mapas cadastrados."; }
    if (str_op === "p01m3" ) { return "Você não possui mais mapas no cadastro"; }

    //Login educador
    if (str_op === "le01" ) { return "Erro na realização do login\nSe o erro perssitir,  informe o código LE01 ao suporte."; } //Msg Erro
    if (str_op === "le02" ) { return "Usuário e senha são obrigatórios"; }
    if (str_op === "le03" ) { return "Usuário e/ou senha incorretos"; }

    if (str_op === "le11" ) { return "Por favor, informe seu usuário"; }
    if (str_op === "le12" ) { return "Login não localizado no cadastro."; }
    if (str_op === "le13" ) { return "As senhas informadas devem ser iguais."; }

    if (str_op === "le21" ) { return "Por favor, informe uma senha."; }
    if (str_op === "le22" ) { return "As senhas informadas não são iguais."; }
    if (str_op === "le23" ) { return "Nova senha cadastrada com sucesso!"; }

    if (str_op === "le31" ) { return "Todos os campos devem ser preenchidos."; }
    if (str_op === "le32" ) { return "Deve-se aceitar o termo de responsabilidade para fazer o cadastro."; }
    if (str_op === "le33" ) { return "Cadastro realizado com sucesso.\nGuarde seu login, pois só com ele é possível realizar o processo de login e alterar senha."; }
    if (str_op === "le34" ) { return "O login informado já existe no cadastro."; }

    //Login jogador
    //if (str_op === "lj01" ) { return "Erro na realização do login\nSe o erro perssitir,  informe o código LJ01 ao suporte."; } //Msg Erro
    //if (str_op === "lj02" ) { return "Id do mapa obrigatório"; }
    //if (str_op === "lj03" ) { return "Mapa indisponível"; }

    //Acesso jogador
    if (str_op === "nj01" ) { return "Por favor, informe um apelido."; }
    if (str_op === "nj02" ) { return "Ops! Alguém já pegou esse apelido!"; }
    if (str_op === "nj03" ) { return "Apelido aceito. Aguarde enquanto o mapa é liberado."; }
    if (str_op === "nj04" ) { return "Não foi possível atualizar seu status. Informe ao educador que seu mapa já está aberto."; }
    if (str_op === "nj05" ) { return "Não foi possível registrar sua desistência do jogo. Por favor informe o educador."; }
    if (str_op === "nj06" ) { return "Por favor, informe o Id do mapa."; }
    if (str_op === "nj07" ) { return "Erro na realização do login\nSe o erro perssitir,  informe o código LJ01 ao suporte."; } //Msg Erro
    if (str_op === "nj08" ) { return "Mapa indisponível."; }
    if (str_op === "nj09" ) { return "Mapa bloqueado pelo educador(a)."; }
    if (str_op === "nj10" ) { return "Mapa liberado pelo educador(a). Por favor cadastre seu apelido novamente."; }

    //Painel jogador
    if (str_op === "pj01" ) { return "Erro na obtenção do lugar inicial.\nPor favor contate o educador responsável pelo mapa.\nCódigo do erro: PJ01"; }
    if (str_op === "pj02" ) { return "Erro na obtenção do lugar.\nPor favor contate o educador responsável pelo mapa.\nCódigo do erro: PJ02"; }
    if (str_op === "pj03" ) { return "Parabéns, você encontrou o último lugar do mapa.<h2>Fim de Jogo!</h2>"; }
    if (str_op === "pj04" ) { return "Parabéns, você encontrou o lugar certo."; }
    if (str_op === "pj05" ) { return "Ops! Não foi dessa vez! "; }
    if (str_op === "pj06" ) { return "Não foi possível obter a descrição do mapa.<br />Código do erro: PJ06"; }
    if (str_op === "pj07" ) { return "Você foi ultrapassado pelo "; }
    if (str_op === "pj08" ) { return "Erro na exibição do raking"; }
    if (str_op === "pj09" ) { return "Erro de salvamento de desempenho. Por favor, entre em contato com o educador."; }
    if (str_op === "pj10" ) { return "Erro na obtenção do lugar.\nEm alguns instantes será tentado novamente\nPor favor contate o educador responsável pelo mapa se o erro persistir.\nCódigo do erro: PJ10"; } //Erro
    if (str_op === "pj11" ) { return "Não foi possível atualizar seu status. Informe ao educador que você já finalizou o Jogo."; }
    if (str_op === "pj12" ) { return "Não foi possível registrar sua desistência do jogo. Por favor informe o educador."; }
    if (str_op === "pj13" ) { return "Você não possui pontos o suficiente para utilizar essa magia."; }
    if (str_op === "pj20" ) { return "Educador(a) encerrou a partida."; }

    if (str_op === "pj30" ) { return "Ocorreu um erro na hora de lançar o feitiço.\nEspere uns instates e tente novamente."; }
    if (str_op === "pj31" ) { return "Alguém já o(a) enfitiçou!"; }
    if (str_op === "pj32" ) { return "Feitiço aplicado com sucesso."; }
    if (str_op === "pj33" ) { return " jogoou um feitiço que congelou seu painel por 30 segundos."; }

    //Gerenciador de mapa específico
    if (str_op === "mm01" ) { return "Erro de acesso.\nSe o erro persistir, informe o código MP01 ao suporte."; }
    if (str_op === "mm02" ) { return "Falha na obtenção dos dados do mapa. Código de erro MP01."; }
    if (str_op === "mm03" ) { return "Erro de acesso. Se o erro persistir, informe o código MP01 ao suporte."; }
    
    //Exclusão de Mapa
    if (str_op === "mmex01" ) { return "Erro no processo de exclusão.\nSe o erro persistir, informe o código MPEX01 ao suporte."; }
    if (str_op === "mmex02" ) { return "Informações do mapa excluídas com sucesso."; }
    


}

function comunica_servidor(str_pag, str_valor = "", str_metodo="GET") {

    var str_retorno;

    $.ajax({
		async:false,
		url: str_url_base + str_pag,
		data: str_valor,
		contentType:"application/x-www-form-urlencoded",
        success:function(retorno,status,obj)
        {
            if (obj.status == 200) { //Achou a página
                str_retorno = retorno;
            } else {
                str_retorno = "{\"ctrl\":-1}";
            }
           // console.log(retorno); //TESTE
		},
		timeout:10000,
        type:str_metodo,
        error:function(obj,status,error)
        { 
			str_retorno = "{\"ctrl\":-1}";
		}
    });
    
    return str_retorno;
}


//Funções para trabalhar com cookies

//Criar cookie
function cria_cookie(nome, valor) {
    var obj_data = new Date();
    obj_data.setTime(obj_data.getTime() + (1 * 24 * 60 * 60 * 1000)); //Expira em 24 horas
    document.cookie = nome + "=" + valor + ";expires=" + obj_data.toUTCString()  + ";path=/;SameSite=Strict";
}

//obter cookie
function obtem_cookie(nome) {
    var str_cookies = decodeURIComponent(document.cookie);

    //Coleção de cookies
    var arr_dados = str_cookies.split(";");

    for (var int_i = 0; int_i < arr_dados.length; int_i++) {
        var char_a1 = arr_dados[int_i];

        //Eliminando espaços em branco no começo se existirem
        while (char_a1.charAt(0) == ' ') {
            char_a1 = char_a1.substring(1);
        }

        //Achou o cookie
        if (char_a1.indexOf(nome + "=") == 0) {
            return char_a1.substring(nome.length + 1, char_a1.length);
        }
    }

    return "";
}

//Realiza a saída do sistema
function efetua_saida(obj1, bol_jogador) {
    obj1.sair();
    
    var str_e = window.location.href;

    if (bol_jogador) {
        str_e = str_e.substring(0, str_e.indexOf("jogador/") + 8);
    } else {
        str_e = str_e.substring(0, str_e.indexOf("professor/") + 10);
    }

    window.location.href = str_e;
}