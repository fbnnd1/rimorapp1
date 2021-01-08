class Jogador extends Usuario {
    
    constructor(int_erro = 0) {

        super(); //Classe mãe

        this._nome = "";
        this._pontos = 0;
        this._lugares = 0;
        this._posicao = 0;
        this._tempoJogo = "00:00:00";
        this._estado = "E";
        this.__sinalErro = int_erro;
        
    }

    //GETTERS e SETTERS

    get sinalErro () { return this.__sinalErro; }
    set sinalErro (erro) { this.__sinalErro = erro; }

    set nome(str_nome) {
        this._nome = str_nome;
    }
    get nome() {
        return this._nome;
    }

    set pontos(int_pontos) {
        this._pontos = int_pontos;
    }
    get pontos() {
        return this._pontos;
    }

    set lugares(int_lugares) {
        this._lugares = int_lugares;
    }
    get lugares() {
        return this._lugares;
    }

    set posicao(int_posicao){
        this._posicao = int_posicao;
    }
    get posicao() {
        return this._posicao;
    }

    set tempoJogo(str_tempo) {
        this._tempoJogo = str_tempo;
    }
    get tempoJogo() {
        return this._tempoJogo;
    }

    set estado(str_estado) {
        this._estado = str_estado;
    }
    get estado() {
        return this._estado;
    }

    //Métodos
    checa_nome(mapa_id) {
        var str_dados = "{\"jogador\":\"" + this.nome + "\", \"mapa\": \"" +  mapa_id + "\"}";
       
        var str_ret = comunica_servidor("f4_jogo.php" , "dados=" + str_dados, "POST");

        var obj_ret = JSON.parse(str_ret);

        if (obj_ret.ctrl == 3) { //Nome cadastrado
            return 1;
        }

        if (obj_ret.ctrl != 0) {
            this.sinalErro = obj_ret.ctrl;
            return -1;
        }
       
        return 0;

    }

    atualiza_dados_bd(str_mapa_id, int_opc) {

        var str_dados = "";
        
        if (int_opc == 1) { //Todas as informações
            str_dados = "{\"jogador\":\"" + this.nome + "\", \"mapa\": \"" +  str_mapa_id + "\", \"pontos\":" + this.pontos + ", \"lugares\":" + this.lugares + ", \"duracao\":\"" + this.tempoJogo + "\", \"opcao\":" + int_opc + "}";
        } else { //Somente o tempo de jogo
            str_dados = "{\"jogador\":\"" + this.nome + "\", \"mapa\": \"" +  str_mapa_id + "\", \"duracao\":\"" + this.tempoJogo + "\", \"opcao\":" + int_opc + "}";
        }
        var str_ret = comunica_servidor("f5_jogo.php" , "dados=" + str_dados, "POST");

        var obj_ret = JSON.parse(str_ret);

        if (obj_ret.ctrl != 0) { this.sinalErro = obj_ret.ctrl;}
        
        return obj_ret.ctrl;
    }

    altera_estado(int_estado, mapaid) {
        var str_ret = comunica_servidor("f6_jogo.php?mapa=" + mapaid + "&opcao=" + int_estado, "" );

        var obj_ret = JSON.parse(str_ret);

        if (obj_ret.ctrl != 0) {
            this.sinalErro = obj_ret.ctrl;
            return false;
        } else {
            if (int_estado == 1) { this.estado = "D"; }
            if (int_estado == 2) { this.estado = "A"; }
            if (int_estado == 3) { this.estado = "C"; }
            return true;
        }
    }

    entrar_jogo(obj_mapa) {

        var str_ret = "";
        var obj_ret = "";

        if (obj_mapa.linkId != "") {
            str_ret = comunica_servidor("fl2.php?mapa_id=" + obj_mapa.linkId, "");

            obj_ret = JSON.parse(str_ret);

            if ((obj_ret.ctrl == 2) || (obj_ret.ctrl == 1) || (obj_ret.ctrl == -10) || (obj_ret.ctrl == -12)) { //Falha de login
                return "m1";
            }

            if (obj_ret.ctrl == 3) { 
                return "m2";
            }

            //sucesso no login
            return "m0";
        } else {
            return "m1";
        }

    }

    enfeiticar(str_adv, str_mapa) {
        var obj_dados = { nome: this.nome, mapa:str_mapa, adv:str_adv, opcao:2 };
        var dados = JSON.stringify(obj_dados);

        var str_ret = comunica_servidor("f8_jogo.php", "dados=" + dados, "POST");

        var obj_ret = JSON.parse(str_ret);

        if (obj_ret.ctrl == 0) { return true; }
        if (obj_ret.ctrl == 3) { return false; }

        this.sinalErro = obj_ret.ctrl;
        return null;

    }

    desenfeiticar(str_mapa) {
        var obj_dados = { nome: this.nome, mapa:str_mapa, opcao:3 };
        var dados = JSON.stringify(obj_dados);

        var str_ret = comunica_servidor("f8_jogo.php", "dados=" + dados, "POST");

        var obj_ret = JSON.parse(str_ret);

        if (obj_ret.ctrl == 0) { return true; }

        this.sinalErro = obj_ret.ctrl;
        return false;

    }

    fui_enfeitcado(str_mapa) {

        var obj_dados = { nome: this.nome, mapa:str_mapa, opcao:1 };
        var dados = JSON.stringify(obj_dados);

        var str_ret = comunica_servidor("f8_jogo.php", "dados=" + dados, "POST");

        var obj_ret = JSON.parse(str_ret);

        if (obj_ret.ctrl == 0) { return false; }
        if (obj_ret.ctrl == 3) { 
            if (obj_ret.adversario == "") {
                return false;
            }
            return obj_ret.adversario; 
        }

        this.sinalErro = obj_ret.ctrl;
        return false;
    }


}
