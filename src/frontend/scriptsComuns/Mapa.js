//Classe Mapa

class Mapa {

    constructor(nome, int_erro = 0) {
        this.__pontos = [];
        this.__nome = nome;
        this.__descriccao = "";
        this.__idBd = 0;
        this.__linkId = "";
        this.__estado = "";
        this.__sinalErro = int_erro;
    }

    //Getter e Setters

    get sinalErro () { return this.__sinalErro; }
    set sinalErro (erro) { this.__sinalErro = erro; }

    get nome() { return this.__nome; }
    set nome(str_nome) { this.__nome = str_nome; }

    get descricao () { return this.__descricao; }
    set descricao (str_descricao) { this.__descricao = str_descricao; }

    get pontos () { return this.__pontos; }
    //set pontos (Pontos) { this.__pontos = Pontos;}

    get idBd () { return this.__idBd; }
    set idBd (int_idBd) { this.__idBd = int_idBd; }

    get linkId () { return this.__linkId; }
    set linkId(str_linkId) { this.__linkId = str_linkId; }

    get estado () { return this.__estado; }
    set estado (str_estado) { this.__estado = str_estado; }

    //Métodos Públicos - objeto
    adiciona_ponto(Ponto) {
        this.__pontos.push(Ponto);
    }

    deleta_ponto(Ponto) {

        for (x in this.__pontos) {
            if ((this.__pontos[x].latitude = Ponto.latitude) && (this.__pontos[x].longitude = Ponto.longitude) ) {
                this.__pontos.splice(x, 1);
            }
        }
    }

    gera_json() {
        var str_json = JSON.stringify(this);
        str_json = str_json.replace(/__/g, "");
        return str_json;
    }

    cadBd() {
        var str_dados = this.gera_json();
        var str_ret = comunica_servidor("f1_edu.php", "dados=" + str_dados, "POST");
        var obj_ret = JSON.parse(str_ret);

        if (obj_ret.ctrl == 0) { return true; } else { this.sinalErro = obj_ret.ctrl; return false; }

    }

    checa_nome() {
        var str_ret = comunica_servidor("f2_edu.php", "dados=" + this.nome, "POST");
        var obj_ret = JSON.parse(str_ret);

        if (obj_ret.ctrl == 0) { 
            if (obj_ret.resultado == 0) { return false; } else { return true; }
        } else { 
            this.sinalErro = obj_ret.ctrl; 
            return null; 
        }
    }

    checa_mapa_liberado() {
        var str_ret = comunica_servidor("f1_jogo.php?mapa=" + this.linkId , "");
        var obj_ret = JSON.parse(str_ret);

        if (obj_ret.ctrl != 0) { //Falha
            this.sinalErro = obj_ret.ctrl;
            return false;
        }

        return true;
    }

    obtem_lugar_inicial() {
        var str_ret = comunica_servidor("f2_jogo.php?mapa=" +  this.linkId + "&ordem=0", "");
        var obj_ret = JSON.parse(str_ret);

        if (obj_ret.ctrl == 0) {
            var obj_lugar1 = new Lugar(obj_ret.longitude, obj_ret.latitude);
            obj_lugar1.dica = obj_ret.dica;
            obj_lugar1.descricao = obj_ret.descricao;
            obj_lugar1.pontos = obj_ret.pontos;
            this.adiciona_ponto(obj_lugar1); //Adiciona lugar no mapa
            this.idBd = obj_ret.id;

            return obj_lugar1;
        }

        this.sinalErro = obj_ret.ctrl;
        return false;

    }

    obtem_lugar_do_mapa(int_ordem) {
        var str_ret = comunica_servidor("f2_jogo.php?mapa=" +  this.linkId + "&ordem=" + int_ordem, "");
        var obj_ret = JSON.parse(str_ret);

        if (obj_ret.ctrl == 0) {
            var obj_lugar1 = new Lugar(obj_ret.longitude, obj_ret.latitude);
            obj_lugar1.dica = obj_ret.dica;
            obj_lugar1.dicaExtra = obj_ret.dicaExtra;
            obj_lugar1.ordem = int_ordem;
            obj_lugar1.descricao = obj_ret.descricao;
            obj_lugar1.pontos = obj_ret.pontos;
            obj_lugar1.nome = obj_ret.nome;
            this.adiciona_ponto(obj_lugar1); //Adiciona lugar no mapa
            this.idBd = obj_ret.id;

            return obj_lugar1;
        }

        if (obj_ret.ctrl == 13) { return null; } //Não tem ponto com esta ordem no mapa

        this.sinalErro = obj_ret.ctrl;
        return false;

    }

    obtem_lugar_por_ordem(int_ordem) {
        var x;
        for (x in this.__pontos) {
            if (this.__pontos[x].ordem == int_ordem) {
                return this.__pontos[x];
            }
        }
        
        var var_ponto = this.obtem_lugar_do_mapa(int_ordem);

        //if ((var_ponto != null) && (var_ponto != false)) { //Foi retornado um lugar(ponto)
        //    this.adiciona_ponto(var_ponto);
        //}

        return var_ponto;
        
    }

    obtem_descricao () {
        if (this.descricao != "") { return; }

        var str_ret = comunica_servidor("f3_jogo.php?mapa=" +  this.idBd , "");
        var obj_ret = JSON.parse(str_ret);

        if (obj_ret.ctrl != 0) { 
            this.descricao = msg_usuario("pj06");
            this.sinalErro = obj_ret.ctrl;
        }
        else { this.descricao = obj_ret.descricao; }
    }

    obtem_info() {
        var str_ret = comunica_servidor("f4_edu.php?mapa=" +  this.idBd , "");
        var obj_ret = JSON.parse(str_ret);
        if (obj_ret.ctrl == 0) {
            this.nome = obj_ret.nome;
            this.descricao = obj_ret.descricao;
            this.linkId = obj_ret.linkid;
            this.estado = obj_ret.estado;

            for (var i in obj_ret.lugares) {
                var obj_lugar1 = new Lugar(obj_ret.lugares[i].latitude, obj_ret.lugares[i].longitude);
                obj_lugar1.nome = obj_ret.lugares[i].nome;
                obj_lugar1.pontos = obj_ret.lugares[i].pontos;
                obj_lugar1.dica = obj_ret.lugares[i].dica;
                obj_lugar1.dicaExtra = obj_ret.lugares[i].dicaExtra;

                this.adiciona_ponto(obj_lugar1);

                obj_lugar1 = null;
            }

        } else {

            this.sinalErro = obj_ret.ctrl;

            /*
            if (obj_ret.ctrl == -1) {
                this.sinalErro = -1;
            } else {
                this.nome = msg_usuario("mm02");
                this.descricao = msg_usuario("mm02");
                this.linkId = msg_usuario("mm02");
            }
            */
            
        }
    }

    altera_estado(int_op) {
        var str_ret = comunica_servidor("f5_edu.php?mapa=" +  this.idBd + "&opcao="  + int_op + "&linkmapa=" + this.linkId, "");
        var obj_ret = JSON.parse(str_ret);
        if (obj_ret.ctrl == 0) { //Alterando estado do objeto

            if (int_op == 1) { this.estado = "L"; }
            if (int_op == 2) { this.estado = "A"; }
            if (int_op == 3) { this.estado = "I"; }

            return true; 

        } else { this.sinalErro = obj_ret.ctrl; return false; }
    }

    obtem_jogadores() {
        var str_ret = comunica_servidor("f6_edu.php?mapa=" + this.linkId , "");
        var obj_ret = JSON.parse(str_ret);
        if (obj_ret.ctrl != 0) { //Erro na obtenção dos jogadores
            this.sinalErro = obj_ret.ctrl;
            return false; 
        }

        return obj_ret.jogadores;
    }

    exclui_mapa_bd() {
        var str_ret = comunica_servidor("f7_edu.php?mapaid=" + this.idBd + "&mapalinkid=" + this.linkId, "");
        var obj_ret = JSON.parse(str_ret);
        if (obj_ret.ctrl != 0) { this.sinalErro = obj_ret.ctrl; return false; } //Erro na exclusão do Mapa
        return true;
    }

    obtem_estado() {

        var str_ret = comunica_servidor("f7_jogo.php?mapa=" + this.linkId, "");
        var obj_ret = JSON.parse(str_ret);

        if (obj_ret.ctrl != 0) { //Falha
            this.sinalErro = obj_ret.ctrl;
            return false;
        }

        this.estado = obj_ret.estado;

        return true;
    }

    //Métodos da classe
    static atualiza_lista_mapas(int_ordem, arr_mapas) {
        var str_ret = comunica_servidor("f3_edu.php?pg=" + int_ordem, "");
        var obj_ret = JSON.parse(str_ret);
         
        if (obj_ret.ctrl != 0) {
           this.sinalErro = obj_ret.ctrl;
           return true;
        } else {
            if (obj_ret.mapas.length != 0) {
                var objMapa;

                for (var i in obj_ret.mapas) {
                    objMapa = new Mapa(obj_ret.mapas[i].nome);
                    objMapa.descricao = obj_ret.mapas[i].descricao;
                    objMapa.idBd = obj_ret.mapas[i].id;
                    objMapa.linkId = obj_ret.mapas[i].linkid;

                    arr_mapas.push( objMapa ); //Adicionando mapa a lista

                    objMapa = null //limpando variável temporária
                }

            }
        }
        return false;

    }
    
}