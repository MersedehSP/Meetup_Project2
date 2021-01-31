// -------------------------------
// DECLARE GLOBAL VARIABLES
// -------------------------------
var myMap;
var overlayMaps;
var controller;
var eventsLayer;
var result;
var category;
var state;
var city;

// -------------------------------
// CREATE MAPS CRITERIA
// -------------------------------

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

// -------------------------------
// RETRIEVE DROPDOWN MENUS
// -------------------------------
function getDropDownValues(){
  var category_element = document.getElementById('selectCategory');
  category = category_element.options[category_element.selectedIndex].text;

  var state_elem = document.getElementById('selectState');
  state = state_elem.options[state_elem.selectedIndex].text;

  var city_elem = document.getElementById('selectCity');
  city = city_elem.options[city_elem.selectedIndex].text;
}

getData(initialMapCallBack);

// -------------------------------
// GET DATA FOR INITIAL LOAD
// -------------------------------
function getData(callback){
  
  getDropDownValues();

  d3.json('/eventInfo/' + state + '/' + city + '/' + category, function (response) {
    var jsonObjArray = [];
    for (var x = 0; x < response.length; x++) {
      jsonObjArray.push(response[x])
    }
    callback(jsonObjArray);
  });
  
}

// -------------------------------
// GET DATA FOR ONCLICK 
// -------------------------------
function getDataForOnClick(callback){
  
  getDropDownValues();

  d3.json('/eventInfo/' + state + '/' + city + '/' + category, function (response) {
    console.log("EventInfo :", response);
    var jsonObjArray = [];
    for (var x = 0; x < response.length; x++) {
      jsonObjArray.push(response[x])
    }
    callback(jsonObjArray);
  });
  
}


// -------------------------------
// INITIAL MAP LOAD
// -------------------------------
function initialMapCallBack(result){
  // code that depends on result
  eventsLayer = createEventMarkers(result);
  
  overlayMaps = {
    Events: eventsLayer
  };
  
  myMap = L.map("map", {
    center: [41.408969, -75.6624122],
    zoom: 8,
    layers: [dark, eventsLayer] 
  });

  controller = L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}

// -------------------------------
// ON CLICK...
// -------------------------------
function onClickMyCallBack(result){
  // code that depends on result
  
  eventsLayer = createEventMarkers(result);

  overlayMaps = {
    Events: eventsLayer
  };

  // Remove the old controller
  controller.remove();

  // Add a new layer
  myMap.addLayer(eventsLayer);

  // Create teh controller with the new overlay
  controller = L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}

// -------------------------------
// MAP MARKERS CASES 
// -------------------------------
function decideIcon(category) {
  var customMarker;

  switch (category) {
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
      customMarker = drinkMarker;
      break;
    case "Writing":
      customMarker = writingMarker;
      break;
    case "Outdoors & Adventure":
      customMarker = oudoorMarker;
      break;
    case "Book Clubs":
      customMarker = bookMarker;
      break;
    case "Learning":
      customMarker = learningMarker;
      break;
    case "Career & Business":
      customMarker = careerMarker;
      break;
    case "Health & Wellness":
      customMarker = healthMarker;
      break;
    case "Language & Culture":
      customMarker = cultureMarker;
      break;
    case "Sports & Fitness":
      customMarker = fitnessMarker;
      break;
    case "Pets":
      customMarker = petsMarker;
      break;
    case "Sci-Fi & Games":
      customMarker = gamesMarker;
      break;
    case "Movements":
      customMarker = movementsMarker;
      break;
    case "Beliefs":
      customMarker = beliefsMarker;
      break;
    case "Hobbies & Crafts":
      customMarker = craftsMarker;
      break;
    case "Arts":
      customMarker = artsMarker;
      break;
    case "Dance":
      customMarker = danceMarker;
      break;
    default:
      customMarker = coffeeMarker;
  }
  return customMarker;
}


// ----------------------------------
// CREATE MARKERS FOR ALL THE EVENTS
// ----------------------------------
// Function to create the markers for events overlay
function createEventMarkers(events) {
  console.log('events inside :', events);
  console.log('event length :',events.length);

  if (myMap){
    myMap.removeLayer(eventsLayer)
    console.log("Layers: ", eventsLayer)
  }
  
  // An array which will be used to store created cityMarkers
  var eventMarkers = [];

  for (var i = 0; i < events.length; i++) {

    var custom_marker = decideIcon(events[i].category);
    
    console.log('Gmap:', events[i].gmap)
    // loop through the cities array, create a new marker, push it to the cityMarkers array
    eventMarkers.push(
      L.marker([events[i].lat, events[i].lng], {icon: custom_marker}).bindPopup(`<h4 
        style="font-size:12px;background-image: linear-gradient(100deg,grey,white, grey);"> 
          <a href=${events[i].link} target="_blank" style="padding: 5px;color:#000000;text-align:center;"><b><center style="padding: 0 15px 0 15px;">${events[i].name}</center></b></a></br>
          <p><center style="box-shadow:0 1px 1px 1px #888888;padding: 5px;"><a href=${events[i].gmap} target="_blank" style="padding: 5px;">${events[i].street}</br>${events[i].city}, ${events[i].state}</a> </center></p>
          <p><center style="padding: 5px;">${events[i].attendees} attendee(s)</center></p>
        </h4>`)
    );
  
    
  }
  eventsLayer = L.layerGroup(eventMarkers);
  return eventsLayer;

}


