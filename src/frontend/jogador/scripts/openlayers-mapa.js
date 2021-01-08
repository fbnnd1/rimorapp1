//openlayers_mapa.js

/*Varáveis públicas */

 //Estilos de pontos
 var obj_estilo_azul = new ol.style.Style({image: new ol.style.Circle({radius: 5, fill: new ol.style.Fill({color: '#0000FF'}), stroke: new ol.style.Stroke({ color: '#000000'}) }) });
 var obj_estilo_vermelho = new ol.style.Style({image: new ol.style.Circle({radius: 5, fill: new ol.style.Fill({color: '#FF0000'}), stroke: new ol.style.Stroke({ color: '#000000'}) }) });
 var obj_estilo_verde = new ol.style.Style({image: new ol.style.Circle({radius: 5, fill: new ol.style.Fill({color: '#00FF00'}), stroke: new ol.style.Stroke({ color: '#000000'}) }) });
  
 //Ponto-inicio
 var obj_ponto_inicio;

 //Origem dos objetos vetoriais do mapa
 var origem_vetorial;

 //Objeto mapa Open Layers
 var obj_mapa_ol;

 //Camada desenho vetorial
 var camada_vetorial;

 //Camada desenho de fundo
var camada_raster = new ol.layer.Tile({
    source: new ol.source.OSM()
 });

/*Cálculo da distância*/

function obtem_distancia(latlng1, latlng2) { // Retorna distância em metros
         var obj_linha = new ol.geom.LineString([latlng1, latlng2]);
         var flt_d = ol.sphere.getLength(obj_linha);

         flt_d = Math.round(flt_d * 100) / 100; return flt_d;

}

function adiciona_interacao() {
  
    var obj_interacao_draw = new ol.interaction.Draw({
      source: origem_vetorial,
      type: "Point"
    });
	
	obj_interacao_draw.on('drawend', function(evt){
		var obj_feature = evt.feature;
        var obj_geometria = obj_feature.getGeometry();
        
        //Adiconando coordenadas para array de controle
        arr_pub_xy.push(ol.proj.toLonLat(obj_geometria.getCoordinates())); 
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

function altera_cor_ponto_vermelho() {
    var arr1 = camada_vetorial.getSource().getFeatures(); //Array de features com os pontos
    var int_tamanho = arr1.length;
    arr1[int_tamanho-1].setStyle(obj_estilo_vermelho);
}

function desenha_ponto_temporario(arr_lonlat) {
    var obj_estilo_amarelo = new ol.style.Style({image: new ol.style.Circle({radius: 5, fill: new ol.style.Fill({color: '#FFFF00'}), stroke: new ol.style.Stroke({ color: '#000000'}) }) });
    var arr_coords = ol.proj.fromLonLat(arr_lonlat);
    var obj_ponto_temp = new ol.geom.Point(arr_coords);

    var obj_feature = new ol.Feature(obj_ponto_temp);
    obj_feature.setStyle(obj_estilo_amarelo);

    //Adicionando ponto temporário ao mapa
    camada_vetorial.getSource().addFeature(obj_feature);

}

function desenha_mapa(arr_lonlat) {
    var coordenadas_desenho = ol.proj.fromLonLat(arr_lonlat);
    
    obj_ponto_inicio = new ol.geom.Point(coordenadas_desenho);
    
    var obj_feature = new ol.Feature(obj_ponto_inicio);
    obj_feature.setStyle(obj_estilo_verde);
    
    origem_vetorial = new ol.source.Vector({wrapX: false, features: [obj_feature]});

    camada_vetorial = new ol.layer.Vector({ //camada vetorial
        source: origem_vetorial,
        style: obj_estilo_azul
      });

    obj_mapa_ol = new ol.Map({
        target: 'div_mapa',
        layers: [ camada_raster,  camada_vetorial ],
        controls: [],
        interactions: ol.interaction.defaults({mouseWheelZoom:false}), //Bloqueia o zoom pelo mouse
        view: new ol.View({ //Definindo vista
          center: coordenadas_desenho,
          zoom: 15
        })
     });
}

