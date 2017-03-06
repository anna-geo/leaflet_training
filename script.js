
var streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5nZW8iLCJhIjoiY2l6cDl1ZGI5MDAwNzJxbnlpNzJpYnpzaSJ9.bWFpSo0eq_q-1lg-p15Kow', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
});



var map = L.map('map', {
    center: [55.60257206961409, 37.536871433258064],
    zoom: 17,
    layers: [streets]
});

var kindergartenStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

var schoolStyle = {
    "color": "#267fca",
    "weight": 5,
    "opacity": 0.65
};


var school = new L.GeoJSON.AJAX("school.geojson",schoolStyle);




function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
};
var kindergarten;
function resetHighlight(e) {
    kindergarten.resetStyle(e.target);
};

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
};

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.name){
        layer.bindPopup(feature.properties.name);
    }
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

kindergarten = new L.GeoJSON.AJAX("kindergarten.geojson", {
    style: kindergartenStyle,
    onEachFeature: onEachFeature
}).addTo(map);




var baseMaps = {
    "Streets": streets
};

var overlayMaps = {
    "Kindergarten": kindergarten,
    "School": school
};

L.control.layers(baseMaps,overlayMaps).addTo(map);
L.control.scale().addTo(map);


/*function onEachFeature(feature, layer) {
    var popupContent = "<p>I started out as a GeoJSON " +
        feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
}

/!*var testLayer = L.geoJson(test, {

    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: baseballIcon});
    },

    onEachFeature: onEachFeature
}).addTo(map);*!/

L.control.scale().addTo(map);


var markers = new L.MarkerClusterGroup();

for (var i = 0; i < addressPoints.length; i++) {
    var a = addressPoints[i];
    var title = a[2];
    var marker = new L.Marker(new L.LatLng(a[0], a[1]), {title: title});
    marker.bindPopup(title);
    markers.addLayer(marker);
}

map.addLayer(markers);*/

