d3.json('/heatMap').then((response)=> {
    console.log(response)
})

d3.json('/markerMap').then((response)=> {
    console.log(response)
})

d3.json('/markerMap/Albany').then((response)=> {
    console.log(response)
})

d3.json('/citydropDown').then((response)=> {
    console.log(response)
})

d3.json('/citydropDown/NY').then((response)=> {
    console.log(response)
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