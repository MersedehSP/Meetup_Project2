var filtered_lst = [];

function getData(){

  var category_element = document.getElementById('selectCategory');
  var op = category_element.options[category_element.selectedIndex].text;

  var state_elem = document.getElementById('selectState');
  var state_op = state_elem.options[state_elem.selectedIndex].text;

  var city_elem = document.getElementById('selectCity');
  var city_op = city_elem.options[city_elem.selectedIndex].text;

  
  if (op === "All" && state_op === "All" && city_op === "All"){
    filtered_lst = data
  }
  else{
    filtered_lst = data.filter(obj => obj.category === op);
  }
  
  console.log(filtered_lst);
  return filtered_lst

}

var incoming_data = getData()

// Once we get a response, send the data.features object to the createFeatures function
var cityLayer = createFeatures(incoming_data);
var eventsLayer = createEventMarkers(incoming_data);
// console.log(cityLayer)

// Streetmap Layer
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

 // Define variables for our tile layers
 var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "light-v10",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "dark-v10",
  accessToken: API_KEY
});

// Only one base layer can be shown at a time
var baseMaps = {
  Light: light,
  Dark: dark,
  Streets: streetmap
};
 
var overlayMaps = {
  Cities: cityLayer,
  Events: eventsLayer
};

var myMap = L.map("map", {
  center: [41.408969, -75.6624122],
  zoom: 8,
  layers: [streetmap, cityLayer],
  layers: [streetmap, eventsLayer, cityLayer]
});



controller = L.control.layers(baseMaps, overlayMaps).addTo(myMap);




function createFeatures(cities) {
  console.log(`cities : ${cities}`)

  if (myMap){
    myMap.removeLayer(cityLayer)
    console.log("Layers: ", cityLayer)
  }
  
  // An array which will be used to store created cityMarkers
  var cityMarkers = [];

  for (var i = 0; i < cities.length; i++) {
    console.log(cities[i].city)
    // loop through the cities array, create a new marker, push it to the cityMarkers array
    cityMarkers.push(
      L.marker([cities[i].city_lat, cities[i].city_lng]).bindPopup(`<h4> ${cities[i].city} </h4>`)
    );
  
    
  }
  cityLayer = L.layerGroup(cityMarkers);
  return cityLayer
 

}

function decideIcon(category){
  var customMarker;
  
  switch (category){
    case "Photography":
      customMarker = photographyMarker;
      break;
    case "Music":
      customMarker = musicMarker;
      break;
    case "Film":
      customMarker = filmMarker;
      break;
    case "Family":
      customMarker = familyMarker;
      break;
    case "Social":
      customMarker = socialMarker;
      break;
    case "LGBTQ":
      customMarker = LGBTQMarker;
      break;
    case "Tech":
      customMarker = techMarker;
      break;
    case "Food & Drink":
      customMarker = coffeeMarker;
      break;
  }

  return customMarker;
  
}


// Function to create the markers for events overlay
function createEventMarkers(events) {
  console.log(`events : ${events}`)

  if (myMap){
    myMap.removeLayer(eventsLayer)
    console.log("Layers: ", eventsLayer)
  }
  
  // An array which will be used to store created cityMarkers
  var eventMarkers = [];

  

  for (var i = 0; i < events.length; i++) {
    console.log(events[i].city)

    var custom_marker = decideIcon(events[i].category);
    console.log(custom_marker);

    // loop through the cities array, create a new marker, push it to the cityMarkers array
    eventMarkers.push(
      L.marker([events[i].event_lat, events[i].event_lng], {icon: custom_marker}).bindPopup(`<h4 
        style="font-size:12px;background-image: linear-gradient(100deg,grey,white, grey);"> 
          <a href=${events[i].Google_Map_Link} target="_blank" style="padding: 5px;color:#000000;text-align:center;"><b><center style="padding: 0 15px 0 15px;">${events[i].event_name}</center></b></a></br>
          <p><center style="box-shadow:0 1px 1px 1px #888888;padding: 5px;"><a href=${events[i].Google_Map_Link} target="_blank" style="padding: 5px;">${events[i].event_street}</br>${events[i].city}, ${events[i].state}</a> </center></p>
          <p><center style="padding: 5px;">${events[i].attendees} attendee(s)</center></p>
        </h4>`)
    );
  
    
  }
  eventsLayer = L.layerGroup(eventMarkers);
  return eventsLayer;
 

}


function changeFunc(){
  // Get the new filtered data based on the user input ( drop downs)
  var incoming_data = getData();

  // Create markers based on the filtered data
  var cityLayer = createFeatures(incoming_data);
  var eventsLayer = createEventMarkers(incoming_data);
  console.log(eventsLayer)
  
  // Add the city layer to overlay Maps
  var overlayMaps = {
    Cities: cityLayer,
    Events: eventsLayer
  };

  // Remove the old controller
  controller.remove();
  
  // Add a new layer
  myMap.addLayer(cityLayer);
  myMap.addLayer(eventsLayer);

  // Create teh controller with the new overlay
  controller = L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  
}