class Usuario {
    
    construcor(sinalErro = 0) {
        this._login = "";
        this._senha = "";
        this._mapa = "";
        this._sinalErro = sinalErro;
    }

    //Getter e Setter 
    set login(str_login) { this._login = str_login; }
    get login () { return this._login; }

    set senha(str_senha) { this._senha = str_senha; }
    get senha () { return this._senha; }

    set mapa(str_mapa) { this._mapa = str_mapa; }
    get mapa () { return this._mapa; }

    get url() { return this._url; }


    entrar_jogo() {

        var str_ret = "";
        var obj_ret = "";

        if (this.mapa != "") {
            str_ret = comunica_servidor("fl2.php?mapa_id=" + this.mapa, "");

            obj_ret = JSON.parse(str_ret);

            if ((obj_ret.ctrl == 2) || (obj_ret.ctrl == 1) || (obj_ret.ctrl == -10) || (obj_ret.ctrl == -12)) { //Falha de login
                return "m1";
            }

            if (obj_ret.ctrl == 3) { 
                return "m2";
            }

            //sucesso no login
            return obj_ret.url;
        }

    }

    sair() {

        var str_ret = comunica_servidor("fl3.php", "");

        var obj_ret = JSON.parse(str_ret);

        return obj_ret.ctrl;

    }

}