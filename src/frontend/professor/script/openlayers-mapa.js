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

function desenha_mapa(arr_features, arr_coords_centro) {
    /*
    var coordenadas_desenho = ol.proj.fromLonLat(arr_lonlat);
    
    obj_ponto_inicio = new ol.geom.Point(coordenadas_desenho);
    
    var obj_feature = new ol.Feature(obj_ponto_inicio);
    obj_feature.setStyle(obj_estilo_verde);
    */

    origem_vetorial = new ol.source.Vector({wrapX: false, features: arr_features});

    camada_vetorial = new ol.layer.Vector({ //camada vetorial
        source: origem_vetorial,
        style: obj_estilo_vermelho
      });

    obj_mapa_ol = new ol.Map({
        target: 'div_mapa',
        layers: [ camada_raster,  camada_vetorial ],
        view: new ol.View({ //Definindo vista
          center: ol.proj.fromLonLat(arr_coords_centro), //[0,0], //Precisa ser definida p/ exibir o mapa
          zoom: 12
        })
     });
}

