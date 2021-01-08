class Educador extends Usuario {
    
    constructor(login = "", senha = "", nome = "", email = "", sinalErro = 0) {

        super(); //Classe mãe

        this._login = login;
        this._senha = senha;
        this._nome = nome;
        this._email = email;
        this._sinalErro = sinalErro;
        
    }

    //SETTERS e GETTERS
    set login(login) {
        this._login = login;
    }
    get login() {
        return this._login;
    }

    set senha(senha) {
        this._senha = senha;
    }
    get senha() {
        return this._senha;
    }

    set nome(nome) {
        this._nome = nome;
    }
    get nome() {
        return this._nome;
    }

    set email(email) {
        this._email = email;
    }
    get email() {
        return this._email;
    }

    set sinalErro(sinalErro) {
        this._sinalErro = sinalErro;
    }
    get sinalErro() {
        return this._sinalErro;
    }

    //Métodos
    efetua_login() {

        var str_ret = "";
        var obj_ret = "";

        if ((this.login != "") && (this.senha != "")) {
            var str_dados = "{\"usuario\":\"" + this.login + "\", \"senha\" :\"" +  this.senha + "\"}";
            str_ret = comunica_servidor("fl1.php" , "dados=" + str_dados, "POST");

            obj_ret = JSON.parse(str_ret);

            if ((obj_ret.ctrl == 2) || (obj_ret.ctrl == 1) || (obj_ret.ctrl == -10) || (obj_ret.ctrl == -12)) { //Falha no login
                return "m1";
            }

            if (obj_ret.ctrl == 3) { //Usuário e senha inválido
                return "m2";
            }

            //sucesso no login
            return "m0";
            
        }

    }

    checa_cadastro_login() { //Checa existência de login
        var str_ret = "";
        var obj_ret = "";

        var str_dados = "{\"login\":\"" + this.login + "\", \"opcao\": 2 }";

        str_ret = comunica_servidor("f8_educador.php" , "dados=" + str_dados, "POST");

        obj_ret = JSON.parse(str_ret);

        if ((obj_ret.ctrl != 3) && (obj_ret.ctrl != 0)) { //Falha na execução do procedimento
            this.sinalErro = obj_ret.ctrl;
            return null;
        }

        if (obj_ret.ctrl == 3) { //Login não existe
            return false;
        }

        return true; //Login existe
    }

    altera_senha(str_senha) { //Checa existência de login
        var str_ret = "";
        var obj_ret = "";

        var str_dados = "{\"login\":\"" + this.login + "\", \"senha\" :\"" + str_senha + "\", \"opcao\": 3 }";

        str_ret = comunica_servidor("f8_educador.php" , "dados=" + str_dados, "POST");

        obj_ret = JSON.parse(str_ret);

        if (obj_ret.ctrl != 0) { //Falha na execução do procedimento
            this.sinalErro = obj_ret.ctrl;
            return false;
        }

        this.senha = str_senha;

        return true; //Alterou a senha
    }

    cad_educador_bd() {

        var str_ret = "";
        var obj_ret = "";

        var str_dados = "{\"login\":\"" + this.login + "\", \"senha\" :\"" + this.senha + "\", \"nome\" :\"" + this.nome + "\", \"email\" :\"" + this.email + "\", \"opcao\": 1 }";

        str_ret = comunica_servidor("f8_educador.php" , "dados=" + str_dados, "POST");

        obj_ret = JSON.parse(str_ret);

        if (obj_ret.ctrl != 0) { //Falha na execução do procedimento
            this.sinalErro = obj_ret.ctrl;
            return false;
        }

        return true; //Realizou o cadastro

    }
}