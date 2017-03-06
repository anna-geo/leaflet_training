/**
 * Created by isaeva on 02.03.2017.
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
    center: [55.60257206961409, 37.536871433258064],
    zoom: 17,
    layers: [streets]
});

var markers = L.markerClusterGroup();
var icon;

var kindergartenIcon = L.icon({
    iconUrl: "kinder64.png",
    iconSize: [24, 24]
});
var schoolIcon = L.icon({
    iconUrl: "school64.png",
    iconSize: [28, 46]
});

function iconCreateFunction(cluster) {
    return L.divIcon({
        html: '<b>' + cluster.getChildCount() + '</b>',
        className: 'mycluster',
        iconSize: L.point(32, 32)
    });
};

/*function getName(feature, layer) {
 if (feature.properties && feature.properties.name) {
 marker.bindPopup(feature.properties.name);
 } else {marker.bindPopup('Неизвестный объект')}
 };*/

function onEachFeature(feature, layer) {
    if (feature.geometry.type === 'Polygon') {
        var bounds = layer.getBounds();
        var center = bounds.getCenter();
    };
    if (feature.properties.amenity === "kindergarten") {
        icon = kindergartenIcon
    } else (icon = schoolIcon);
    var marker = L.marker(center, {icon: icon});

    if (feature.properties && feature.properties.name) {
        marker.bindPopup(feature.properties.name)
    }
    else (marker.bindPopup('Неизвестный объект'));
    map.setView(center);
    markers.addLayer(marker);
};

var kindergarten = new L.GeoJSON.AJAX("kindergarten.geojson", {
    onEachFeature: onEachFeature
});

var school = new L.GeoJSON.AJAX("school.geojson", {
    onEachFeature: onEachFeature
});


var markers = L.markerClusterGroup({
    maxClusterRadius: 120,
    iconCreateFunction: iconCreateFunction,
    //Disable all of the defaults:
    spiderfyOnMaxZoom: true, showCoverageOnHover: false, zoomToBoundsOnClick: true
});

map.addLayer(markers);

var baseMaps = {
    "Mapbox": streets,
    "OSM": osm
};

var overlayMaps = {
    "kindergarten": kindergarten,
    "school": school
};

L.control.scale().addTo(map);


map.addControl(new L.Control.Layers(baseMaps, overlayMaps));


/*new L.Control.GeoSearch({
 provider: new L.GeoSearch.Provider.OpenStreetMap()
 }).addTo(map);*/


