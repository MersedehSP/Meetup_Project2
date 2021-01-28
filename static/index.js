d3.json('/heatMap').then((response)=> {
    console.log("1 heatmap event loactions : ",response)
})

d3.json('/markerMap').then((response)=> {
    console.log("2 marker map all locations : ",response)
})

d3.json('/markerMap/All/All/New York').then((response)=> {
    console.log("3 marker map with city selection : ",response)
})

d3.json('/citydropDown').then((response)=> {
    console.log("4 city drop down all states : ",response)
})

d3.json('/citydropDown/NY').then((response)=> {
    console.log("5 city drop down selected state : ",response)
})

// d3.json('/categorydropDown').then((response)=> {
//    console.log(response)
//})

 d3.json('/dataTable').then((response)=> {
    console.log(response)
})

 d3.json('/dataTable/All/Titusville/All').then((response)=> {
    console.log("6 Data Table: ",response)
})
