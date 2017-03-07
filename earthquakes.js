/**
 * Created by isaeva on 07.03.2017.
 */
var streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5nZW8iLCJhIjoiY2l6cDl1ZGI5MDAwNzJxbnlpNzJpYnpzaSJ9.bWFpSo0eq_q-1lg-p15Kow', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
});

var osm = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

var map = L.map('map', {
    center: [40.17887331434698, 7.910156250000001],
    zoom: 3,
    layers: [streets]
});


var baseMaps = {
    "Mapbox": streets,
    "OSM": osm
};

function addDataToMap(data, map) {
    var dataLayer = L.geoJson(data);
    dataLayer.addTo(map);
}

/*$.getJSON("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(data) { addDataToMap(data, map); });*/

L.GeoJSON.AJAX("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", {function(data) { addDataToMap(data, map)}});






L.control.scale().addTo(map);


map.addControl(new L.Control.Layers(baseMaps));