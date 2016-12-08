//https://www.mapbox.com/api-documentation/#retrieve-tiles
//mapbox classic map IDs: https://www.mapbox.com/api-documentation/#maps
//fetching geolocation from ip via freegeoip, and once fetched, load map to center on geolocation

var mapboxtoken='pk.eyJ1IjoiYWJyYXhhc3l1IiwiYSI6ImNpd2M2Mm5zaTA2b3UyeHRkYW55OW40MnoifQ.MAQPTFd3xVK7CtE0B4IztA';
var mapboxattr='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
var mapboxurl='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';

var loc_json=$.getJSON("http://freegeoip.net/json/",function(){
  var mymarkers = new L.LayerGroup();
  L.marker([39.995073, -83.036621]).bindPopup('This is home').addTo(mymarkers);
  L.marker([39.998476, -83.022050]).bindPopup('This is work').addTo(mymarkers);

  var layer_streets = L.tileLayer(mapboxurl, {
    attribution: mapboxattr,
    id: 'mapbox.streets',
    accessToken: mapboxtoken
  });

  var layer_satellite = L.tileLayer(mapboxurl, {
    attribution: mapboxattr,
    id: 'mapbox.satellite',
    accessToken: mapboxtoken
  });

  var layer_weird = L.tileLayer(mapboxurl, {
    attribution: mapboxattr,
    id: 'mapbox.high-contrast',
    accessToken: mapboxtoken
  });
  var mymap = L.map('mapid',{layers:[layer_streets,mymarkers]}).setView([loc_json.responseJSON.latitude,loc_json.responseJSON.longitude], 13);
  var baselayers = {
    "streets":layer_streets,
    "satellite":layer_satellite,
    "weird":layer_weird
  };
  var overlays = {
    "Locale": mymarkers
  };
  L.control.layers(baselayers,overlays).addTo(mymap);
  L.circle([39.998476, -83.022050], 200).addTo(mymap);
});
