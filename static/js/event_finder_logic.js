


var data;

var myMap;
var overlayMaps;
var controller;
var baseMaps;
var streetmap;
var light;
var dark;
var eventsLayer;
var result;
var category;
var state;
var city;

function getDropDownValues(){
  var category_element = document.getElementById('selectCategory');
  category = category_element.options[category_element.selectedIndex].text;

  var state_elem = document.getElementById('selectState');
  state = state_elem.options[state_elem.selectedIndex].text;

  var city_elem = document.getElementById('selectCity');
  city = city_elem.options[city_elem.selectedIndex].text;
}


getData(myCallback);


function getData(callback){
  
  getDropDownValues();

  d3.json('/eventInfo/' + state + '/' + city + '/' + category, function (response) {
    console.log("EventInfo :", response);
    var jsonObjArray = [];
    for (var x = 0; x < response.length; x++) {
      var record = {}
      record['name'] = response[x].name;
      record['street'] = response[x].street;
      record['gmap'] = response[x].gmap;
      record['category'] = response[x].category;
      record['lat'] = response[x].lat;
      record['lng'] = response[x].lng;
      record['attendee'] = response[x].attendees;
      record['group'] = response[x].group;
      record['city'] = response[x].city;
      record['state'] = response[x].state;
      record['link'] = response[x].link;
      jsonObjArray.push(record)
    }
    callback(jsonObjArray);
  });
  
}

function getDataForOnClick(callback){
  
  getDropDownValues();

  d3.json('/eventInfo/' + state + '/' + city + '/' + category, function (response) {
    console.log("EventInfo :", response);
    var jsonObjArray = [];
    for (var x = 0; x < response.length; x++) {
      var record = {}
      record['name'] = response[x].name;
      record['street'] = response[x].street;
      record['gmap'] = response[x].gmap;
      record['category'] = response[x].category;
      record['lat'] = response[x].lat;
      record['lng'] = response[x].lng;
      record['attendee'] = response[x].attendees;
      record['group'] = response[x].group;
      record['city'] = response[x].city;
      record['state'] = response[x].state;
      record['link'] = response[x].link;
      jsonObjArray.push(record)
    }
    callback(jsonObjArray);
  });
  
}


function loadInitialMapCallBack(layer){
  // code that depends on layer
  console.log(layer)
  
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
//  Cities: cityLayer,
  Events: layer
};

myMap = L.map("map", {
  center: [41.408969, -75.6624122],
  zoom: 8,
  //  layers: [streetmap, cityLayer],
  //  layers: [streetmap, eventsLayer, cityLayer]
  layers: [streetmap, layer]

});



controller = L.control.layers(baseMaps, overlayMaps).addTo(myMap);

}


function myCallback(result){
  // code that depends on result
  eventsLayer = createEventMarkers(result);
  console.log(`events Layer: ${eventsLayer}`); 
  // loadInitialMapCallBack(eventsLayer); 
    // Streetmap Layer
    streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    });
  
   // Define variables for our tile layers
  light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "light-v10",
    accessToken: API_KEY
  });
  
  dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "dark-v10",
    accessToken: API_KEY
  });
  
  // Only one base layer can be shown at a time
  baseMaps = {
    Light: light,
    Dark: dark,
    Streets: streetmap
  };
   
  overlayMaps = {
  //  Cities: cityLayer,
    Events: eventsLayer
  };
  
  myMap = L.map("map", {
    center: [41.408969, -75.6624122],
    zoom: 8,
    //  layers: [streetmap, cityLayer],
    //  layers: [streetmap, eventsLayer, cityLayer]
    layers: [streetmap, eventsLayer]
  
  });
  controller = L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}

function onClickMyCallBack(result){
  // code that depends on result
  
  eventsLayer = createEventMarkers(result);
  console.log(`events Layer: ${eventsLayer}`);
    // Streetmap Layer
    streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    });
  
   // Define variables for our tile layers
   light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "light-v10",
    accessToken: API_KEY
  });
  
  dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "dark-v10",
    accessToken: API_KEY
  });
  
  // Only one base layer can be shown at a time
  baseMaps = {
    Light: light,
    Dark: dark,
    Streets: streetmap
  };
   
  overlayMaps = {
    Events: eventsLayer
  };
  
  // controller = L.control.layers(baseMaps, overlayMaps).addTo(myMap);

  // // Remove the old controller
  controller.remove();

  // Add a new layer
  // myMap.addLayer(cityLayer);
  myMap.addLayer(eventsLayer);

  // Create teh controller with the new overlay
  controller = L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}


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
        customMarker = coffeeMarker;
        break;
      default:
        customMarker = coffeeMarker;
    }

    return customMarker;

  }

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
      // console.log('*******',events[i]);

      var custom_marker = decideIcon(events[i].category);
      // console.log("Marker :",events[i].category);
      console.log('Gmap:', events[i].gmap)
      // loop through the cities array, create a new marker, push it to the cityMarkers array
      eventMarkers.push(
        L.marker([events[i].lat, events[i].lng], {icon: custom_marker}).bindPopup(`<h4 
          style="font-size:12px;background-image: linear-gradient(100deg,grey,white, grey);"> 
            <a href=${events[i].link} target="_blank" style="padding: 5px;color:#000000;text-align:center;"><b><center style="padding: 0 15px 0 15px;">${events[i].name}</center></b></a></br>
            <p><center style="box-shadow:0 1px 1px 1px #888888;padding: 5px;"><a href=${events[i].gmap} target="_blank" style="padding: 5px;">${events[i].street}</br>${events[i].city}, ${events[i].state}</a> </center></p>
            <p><center style="padding: 5px;">${events[i].attendee} attendee(s)</center></p>
          </h4>`)
      );
    
      
    }
    eventsLayer = L.layerGroup(eventMarkers);
    return eventsLayer;
  

}


function checkEvent(eventsLayer) {

  console.log(eventsLayer)

  // Add the city layer to overlay Maps
  overlayMaps = {
    // Cities: cityLayer,
    Events: eventsLayer
  };

  // Remove the old controller
  controller.remove();

  // Add a new layer
  // myMap.addLayer(cityLayer);
  myMap.addLayer(eventsLayer);

  // Create teh controller with the new overlay
  controller = L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}

