// Get data from json 
// Use "complete_test_data.json" as a test data file, replace w/ actual
// Uncomment the ActivityType sections 
var tableData=data;
console.log(tableData[0].event_name)
function exist(list,string) {

    // Check for duplicate in list for dropdown
    for(let x=0; x<list.length; x++) {
        if (list[x]===string) {
            return true;
        }
    }
    return false;
}

function loadSelect(obj,list) {

    // Load list into dropdown object 
    let i=0;
    list.forEach(function(item) {
        i++;
        obj.append(new Option(item,String(i)));
    });
}

function loadOptions(){

    // Create the filter lists for the 3 dropdowns in html
    let statelist=[];
    let citylist=[];
    let activitytypelist=[];

    // Loop through data list and create dropdown options for each list above checking for unique values by calling the exist function
    tableData.forEach((data)=> {
        Object.entries(data).forEach(([key,value])=>{
            if (key=="state") {
                if (exist(statelist,value)==false) {
                    statelist.push(value);
                }
            }
            if (key=="city") {
                if (exist(citylist,value)==false) {
                    citylist.push(value);
                    //console.log(value);
                }
            }
            // if (key=="activity") {
            //     if (exist(activitytypelist,value)==false) {
            //         activitytypelist.push(value);
            //     }
            // }
        });
    });

    //console.log(citylist)
// Load statelist into the state dropdown.
    statelist.sort();
    let state=document.getElementById("selectState");
    loadSelect(state,statelist);

// Load citylist into the city dropdown.
    citylist.sort();
    let city=document.getElementById("selectCity");

    loadSelect(city,citylist);

// Load activitytypelist into the date dropdown.
    // activitytypelist.sort();
    // let activitytype=document.getElementById("selectActivityType");
    // loadSelect(activitytype,activitytypelist);
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

function readList(criteria) {
    
    // filter tableData according to criteria dictionary parameter.
    let newData=tableData.filter(event=>
        (event.state===criteria.state || criteria.state==="All" || criteria.state==="Select State") &&
        (event.city===criteria.city || criteria.city==="All" || criteria.city==="Select City") //&&
        // (event.activitytype===criteria.activitytype || criteria.activitytype==="All" || criteria.activitytype==="Select Activity Type")
    );

    // Test to see if any results were found.
    if (newData.length>0) {
    
    // If found clear the table and load the table with newData passed as an argument
        clearTbody();
        loadtable(newData);
    } else {

    // If no results found clear table if any and return
        clearTbody();
    }

}

function checkEvent() {

    // Create a dictionary of input values from drop downs.

    let criteria={};

    let state = document.getElementById("selectState");
    criteria.state=state.options[state.selectedIndex].text;

    let city = document.getElementById("selectCity");
    criteria.city=city.options[city.selectedIndex].text;

    // let activitytype = document.getElementById("selectActivityType");
    // criteria.activitytype=activitytype.options[activitytype.selectedIndex].text;

    // Clear table
    clearTbody();

    //Call readList function passing the input dictionary as an argument
    readList(criteria);
}

// Call loadOptions function which load all dropdowns for html.
loadOptions();

// Initial call to checkEvent function to load all dates into the table.
checkEvent();

