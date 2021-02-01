L.mapbox.accessToken ="pk.eyJ1IjoidXBwYWx2ZSIsImEiOiJja2p1a3BqcHcybjRoMnVseWoyenJjOHhhIn0.XTBpJ8DE_jjBuj-C7OKoZA";

var map = L.map('map').setView([0, 0], 1);


L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken", {
    tileSize: 512,
    zoomOffset: -1,
    attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    accessToken: API_KEY
  }).addTo(map);