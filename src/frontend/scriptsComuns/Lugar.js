//Classe Ponto - Lugar

class Lugar {

    constructor(x, y) {
        this.__longitude = x;
        this.__latitude  = y;
        this.__nome = "";
        this.__dica = "";
        this.__dicaExtra = "";
        this.__descricao = "";
        this.__ordem = 0;
        this.__pontos = 1;
    }
    //Setter e Getters
    get longitude () { return this.__longitude; }
    set longitude(x) { this.__longitude = x; }

    get latitude () { return this.__latitude; }
    set latitude (y) { this.__latitude = y; }

    get nome () { return this.__nome; }
    set nome (str_nome) { this.__nome = str_nome; }

    get dica () { return this.__dica; }
    set dica (str_dica) { this.__dica = str_dica; }

    get dicaExtra () { return this.__dicaExtra; }
    set dicaExtra (str_dica) { this.__dicaExtra = str_dica; }

    get descricao () { return this.__descricao; }
    set descricao (str_descricao) { this.__descricao = str_descricao; }

    get ordem () { return this.__ordem; }
    set ordem (int_ordem) { this.__ordem = int_ordem; }

    get pontos () { return this.__pontos; }
    set pontos (int_pontos) {this.__pontos = int_pontos; }

}