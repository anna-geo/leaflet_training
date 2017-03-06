/**
 * Created by isaeva on 06.03.2017.
 */
import L from './leaflet.js';
import {
    GeoSearchControl,
    OpenStreetMapProvider,
} from './leaflet-geosearch@2.0.3/dist/bundle.min.js';

const provider = new OpenStreetMapProvider();

const searchControl = new GeoSearchControl({
    provider: provider,
});

const map = new L.Map('map');
map.addControl(searchControl);