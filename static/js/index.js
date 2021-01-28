d3.json('/heatMap').then((response)=> {
    console.log("1 heatmap event loactions : ",response)
})

d3.json('/citydropDown').then((response)=> {
    console.log("2 city drop down all states : ",response)
})

d3.json('/citydropDown/NY').then((response)=> {
    console.log("3 city drop down selected state : ",response)
})

d3.json('/categorydropDown').then((response)=> {
    console.log("4 category",response)
})

 d3.json('/eventInfo').then((response)=> {
    console.log("5 eventinfo all",response)
})

 d3.json('/eventInfo/All/Titusville/All').then((response)=> {
    console.log("6 eventinfo selection: ",response)
})
