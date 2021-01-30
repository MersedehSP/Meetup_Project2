// Heatmap of all the MeetUp activities in the Tri-State Area
// Need json file with latitude and longitude


var myMap = L.map("map", {
    center: [40.2206, -74.7597],
    zoom: 7
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
var link = "/static/data/json_latlng.json";


  //Getting lat and lng json data
  d3.json('/heatMap', function(response) {    
    var heatArray = [];
    for (var i = 0; i < Object.keys(response).length; i++) {
      var x = response[i];
      if (x) {
        heatArray.push([x["lat"], x["lng"]]);
      }
    }
    var heat = L.heatLayer(heatArray, {
      radius: 30,
      blur: 10
    }).addTo(myMap);
  });

  