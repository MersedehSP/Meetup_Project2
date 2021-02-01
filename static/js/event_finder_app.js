function clr_dropDown() {
    var select = document.getElementById("selectCity");
    var length = select.options.length;
    for (i = length-1; i >= 2; i--) {
        select.remove(i);
   }
}

function loadSelect(obj,list) {
    // Load list into dropdown object 
    for (i=0;i<list.length;i++) {
        obj.append(new Option(list[i],String(i)));
    }
}

function GetCityList(value) {
    citylist=[];

    clr_dropDown();
    var state = value.options[value.selectedIndex].text;
    let city=document.getElementById("selectCity");
    d3.json('/citydropDown/'+ state, function(response) {
        for (x=0;x<response.length;x++) {
            citylist.push(response[x].city);
        }
    loadSelect(city,citylist);
    });
}

function loadOptions(){

    // Create the filter lists for the 3 dropdowns in html
    let statelist=[];
    let citylist=[];
    let categorylist=[];

// Load statelist into the state dropdown.    
    let state=document.getElementById("selectState");
    d3.json('/statedropDown', function(response) {  
        for (x=0;x<response.length;x++) {
            statelist.push(response[x].state);
        }
        loadSelect(state,statelist); 
    });

// Load citylist into the city dropdown.
    let city=document.getElementById("selectCity");
    d3.json('/citydropDown', function(response) {  
        for (x=0;x<response.length;x++) {
            citylist.push(response[x].city);
        }
        loadSelect(city,citylist); 
    });

// Load categorylist into the category dropdown.    
    let category=document.getElementById("selectCategory");
    d3.json('/categorydropDown', function(response) {  
        for (x=0;x<response.length;x++) {
            categorylist.push(response[x].category);
        }
        loadSelect(category,categorylist); 
    });
}

loadOptions();