var filtered_lst = [];

function getData(){
  var category_element = document.getElementById('selectCategory');
  var op = category_element.options[category_element.selectedIndex].text;
  
  var state_elem = document.getElementById('selectState');
  var state_op = state_elem.options[state_elem.selectedIndex].text;
  
  var city_elem = document.getElementById('selectCity');
  var city_op = city_elem.options[city_elem.selectedIndex].text;
  
  
  // filtered_lst = data.filter(obj => obj.category === op && obj.state === state_op && obj.city === city_op);   
  if (op === "All" && state_op === "All" && city_op === "All"){
    filtered_lst = data
  }
  else{
    filtered_lst = data.filter(obj => obj.category === op);
  }
  console.log(filtered_lst);
  return filtered_lst
}

    

var data = getData()
  var myMap = L.map("map", {
    center: [41.408969, -75.6624122],
    zoom: 8,
    // layers: [dark, cityLayer]
  });

// Once we get a response, send the data.features object to the createFeatures function
createFeatures(filtered_lst);



function createFeatures(cities) {
  console.log(`cities : ${cities}`)
  
  // An array which will be used to store created cityMarkers
  var cityMarkers = [];

  for (var i = 0; i < cities.length; i++) {
    console.log(cities[i].city)
    // loop through the cities array, create a new marker, push it to the cityMarkers array
    cityMarkers.push(
      L.marker([cities[i].city_lat, cities[i].city_lng]).bindPopup(`<h4> ${cities[i].city} </h4>`)
    );
  }

 
 
  // Sending our earthquakes layer to the createMap function
  createMap(cityMarkers);
}





function createMap(cityMarkers){
  

   // Add all the cityMarkers to a new layer group.
  // Now we can handle them as one group instead of referencing each individually
  var cityLayer = L.layerGroup(cityMarkers);

  // Define variables for our tile layers
  var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Only one base layer can be shown at a time
  var baseMaps = {
    Light: light,
    Dark: dark
  };

  // Overlays that may be toggled on or off
  var overlayMaps = {
    Cities: cityLayer
  };

  // Create map object and set default layers
  // var myMap = L.map("map", {
  //   center: [41.408969, -75.6624122],
  //   zoom: 8,
  //   layers: [dark, cityLayer]
  // });

  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  

  
  
}

// var new_data =filterData()
// createMap(new_data)

// function changeFunc(){
  
//   var cities = [];
//   cities = getData()
//   console.log(cities);
//   createFeatures(cities);
  
// }


