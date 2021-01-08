var str_url_base = "http://localhost:8080/rimor/";

//Função para logout
function sair1() {
    var obj_usuario = new Usuario();

    var r =obj_usuario.sair();

    window.location.href = str_url_base.replace("funcoes", "rimor");

}