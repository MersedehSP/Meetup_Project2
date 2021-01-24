d3.json('/heatMap').then((response)=> {
    console.log("heatmap event loactions : ",response)
})

d3.json('/markerMap').then((response)=> {
    console.log("marker map all locations : ",response)
})

d3.json('/markerMap/Albany').then((response)=> {
    console.log("marker map with city selection : ",response)
})

d3.json('/citydropDown').then((response)=> {
    console.log("city drop down all states : ",response)
})

d3.json('/citydropDown/NY').then((response)=> {
    console.log("city drop down selected state : ",response)
})

// d3.json('/categorydropDown').then((response)=> {
//    console.log(response)
//})

// d3.json('/dataTable').then((response)=> {
//    console.log(response)
//})

// d3.json('/dataTable/<state>/<city>/<category>').then((response)=> {
//    console.log(response)
//})