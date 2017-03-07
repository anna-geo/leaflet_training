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

var kindergartenMarkers = L.markerClusterGroup({
    maxClusterRadius: 120,
    iconCreateFunction: blueIconCreateFunction,
    //Disable all of the defaults:
    spiderfyOnMaxZoom: true, showCoverageOnHover: false, zoomToBoundsOnClick: true
});

var schoolMarkers = L.markerClusterGroup({
    maxClusterRadius: 120,
    iconCreateFunction: greenIconCreateFunction,
    //Disable all of the defaults:
    spiderfyOnMaxZoom: true, showCoverageOnHover: false, zoomToBoundsOnClick: true
});

var markersStorage = {
    "kindergarten": kindergartenMarkers,
    "school": schoolMarkers
};

var icon;

var kindergartenIcon = L.icon({
    iconUrl: "kinder64.png",
    iconSize: [24, 24]
});
var schoolIcon = L.icon({
    iconUrl: "school64.png",
    iconSize: [28, 46]
});

function blueIconCreateFunction(cluster) {
    return L.divIcon({
        html: '<b>' + cluster.getChildCount() + '</b>',
        className: 'blueCluster',
        iconSize: L.point(32, 32)
    });
};

function greenIconCreateFunction(cluster) {
    return L.divIcon({
        html: '<b>' + cluster.getChildCount() + '</b>',
        className: 'greenCluster',
        iconSize: L.point(32, 32)
    });
};

/*function getName(feature, marker) {
 if (feature.properties && feature.properties.name) {
 marker.bindPopup(feature.properties.name);
 } else (marker.bindPopup('Неизвестный объект'))
 };*/

function onEachFeature(feature, layer) {
    if (feature.geometry.type === 'Polygon') {
        var bounds = layer.getBounds();
        var center = bounds.getCenter();
    }
    ;

    switch (feature.properties.amenity) {
        case "kindergarten":
            icon = kindergartenIcon;
            break;
        case "school":
            icon = schoolIcon;
            break;
        default:
            icon = schoolIcon;
    }
    ;

    var marker = L.marker(center, {icon: icon});

    if (feature.properties && feature.properties.name) {
        marker.bindPopup(feature.properties.name)
    }
    else (marker.bindPopup('Неизвестный объект'));
    map.setView(center);
    switch (feature.properties.amenity) {
        case "kindergarten":
            kindergartenMarkers.addLayer(marker);
            break;
        case "school":
            schoolMarkers.addLayer(marker);
            break;
        default:
            icon = schoolIcon;
    }

};

var kindergarten = new L.GeoJSON.AJAX("kindergarten.geojson", {
    onEachFeature: onEachFeature
});

var school = new L.GeoJSON.AJAX("school.geojson", {
    onEachFeature: onEachFeature
});

var baseMaps = {
    "Mapbox": streets,
    "OSM": osm
};

var overlayMaps = markersStorage;

L.control.scale().addTo(map);


map.addControl(new L.Control.Layers(baseMaps, overlayMaps));


/*new L.Control.GeoSearch({
 provider: new L.GeoSearch.Provider.OpenStreetMap()
 }).addTo(map);*/


