
//Estilos do mapa
var obj_estilo_vermelho = new ol.style.Style({image: new ol.style.Circle({radius: 5, fill: new ol.style.Fill({color: '#FF0000'}), stroke: new ol.style.Stroke({ color: '#000000'}) }) });
var obj_estilo_verde = new ol.style.Style({image: new ol.style.Circle({radius: 5, fill: new ol.style.Fill({color: '#00FF00'}), stroke: new ol.style.Stroke({ color: '#000000'}) }) });

//Ponto-inicio
 var obj_ponto_inicio;

//Objeto interador
var obj_interacao_draw;

 //Origem dos objetos vetoriais do mapa
 var origem_vetorial = new ol.source.Vector({wrapX: false });

  //Camada desenho vetorial
 var camada_vetorial = new ol.layer.Vector({ //camada vetorial
      source: origem_vetorial,
      style: obj_estilo_vermelho
    });

//Vista, camada raster e mapa
var obj_olview = new ol.View({ center: [0, 0], zoom: 2 });
var baseLayer = new ol.layer.Tile({ source: new ol.source.OSM() });
var obj_mapa_ol = new ol.Map({
      target: document.getElementById('div_mapa'),
      view: obj_olview,
      layers: [baseLayer, camada_vetorial]
    });

//Instanciando caixa de pesquisa do Geocoder
var obj_geocoder = new Geocoder('nominatim', {
  provider: 'osm', //Provedor de geocodificação
  //targetType: 'text-input',//TESTE
  lang: 'pt-br', //Linguagem de pesquisa
  placeholder: 'Procurar por ...',
  countrycodes : 'br', //Endereços od país
  limit: 5, //Limite da exibição de resultados
  debug: false,
  autoComplete: false,
  keepOpen: false
});

//Adicionando geocoder ao mapa
obj_mapa_ol.addControl(obj_geocoder);
  
//Quando escolhe-se um endereço
/*
obj_geocoder.on('addresschosen', function (evt) {
	console.info(evt);
  //window.setTimeout(function () {
    //popup.show(evt.coordinate, evt.address.formatted);
    //document.getElementById("popup1").innerHTML = evt.coordinate + "," + evt.address.formatted;
  //}, 3000);
  //
});
*/

//Habilitando adição de pontos
function adiciona_interacao() {
  
    obj_interacao_draw = new ol.interaction.Draw({
      source: origem_vetorial,
      type: "Point"
    });
	
	obj_interacao_draw.on('drawend', function(evt){
		var obj_feature = evt.feature;
        var obj_geometria = obj_feature.getGeometry();
        
        //Adiconando coordenadas para array de controle
        arr_pub_xy.push(obj_geometria.getCoordinates()); 
        ponteiro_arr_xy++;

        //Bloqueando marcação no mapa
        ctrl_opcao_marcar = false;                       
        obj_mapa_ol.removeInteraction(obj_interacao_draw);
        
	});
    
    //Adicionando interador no mapa
    obj_mapa_ol.addInteraction(obj_interacao_draw);
}

function remove_ultimo_ponto_mapa() {
    
  var arr1 = camada_vetorial.getSource().getFeatures(); //Array de features com os pontos
  var int_tamanho = arr1.length;
  camada_vetorial.getSource().removeFeature(arr1[int_tamanho-1]); //Removendo último ponto do desenho
    
  //Atualizando controle
  arr_pub_xy.pop();
	ponteiro_arr_xy--;
}