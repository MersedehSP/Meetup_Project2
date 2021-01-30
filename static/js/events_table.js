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
    let category=document.getElementById("selectActivityType");
    d3.json('/categorydropDown', function(response) {  
        for (x=0;x<response.length;x++) {
            categorylist.push(response[x].category);
        }
        loadSelect(category,categorylist); 
    });
}

function loadtable(data) {

    // Create table according to data parameter
    var tbody=d3.select("tbody");
    data.forEach((event)=> {
        var row=tbody.append("tr");
        Object.entries(event).forEach(([key,value])=> {
            var cell=row.append("td");
            cell.text(value);
        });
     });

}

function clearTbody() {

    // Clear table
    var tbody=d3.select("tbody");
    var tbodyRows=tbody.selectAll("tr");
    tbodyRows.remove();
}

function readList() {
    let value=document.getElementById("selectState");
    let state=value.options[value.selectedIndex].text;
        value=document.getElementById("selectCity");
    let city=value.options[value.selectedIndex].text;
        value=document.getElementById("selectActivityType");
    let category=value.options[value.selectedIndex].text;

    // filter tableData according to criteria dictionary parameter.

    d3.json('/eventInfo/' + state + '/' + city + '/' + category , function(response) {
        var tableData=[];
        console.log("EventInfo :", response);
        if (response.length>0) {
            for (x=0;x<response.length;x++) {
                record={}
                record['name']=response[x].name;
                record['attendee']=response[x].attendees
                record['group']=response[x].group;
                record['city']=response[x].city;
                record['state']=response[x].state;
                record['link']=response[x].link;
                tableData.push(record);
            }
            // If found clear the table and load the table with newData passed as an argument
                clearTbody();
                loadtable(tableData);
            } else {
            // If no results found clear table if any and return
                clearTbody();
            }
    });
}

function checkEvent() {

    clearTbody();
    readList();
}

// Call loadOptions function which load all dropdowns for html.
loadOptions();

// Initial call to checkEvent function to load the table.
checkEvent();
