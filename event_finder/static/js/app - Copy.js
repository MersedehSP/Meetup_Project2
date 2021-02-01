var event_data = data
console.log(event_data)

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

    // Create the five list which represent the five dropdowns in the html
    let categoryList=[];
    let cityList=[];
    let stateList=[];
 

    // Loop through data list and create dropdown options for each list above checking for unique values by calling the exist function
    event_data.forEach((data)=> {
        Object.entries(data).forEach(([key,value])=>{
            if (key=="category") {
                if (exist(categoryList,value)==false) {
                    categoryList.push(value);
                }
            }
            if (key=="state") {
                if (exist(stateList,value)==false) {
                    stateList.push(value);
                }
            }
            if (key=="city") {
                if (exist(cityList,value)==false) {
                    cityList.push(value);
                }
            }
          
        });
    });



// Sort the remaining dropdowns and load each sorted list into its respective dropdown.
    categoryList.sort();
    let category=document.getElementById("selectCategory");
    loadSelect(category,categoryList);

    stateList.sort();
    let state=document.getElementById("selectState");
    loadSelect(state,stateList);

    cityList.sort();
    let city=document.getElementById("selectCity");
    loadSelect(city,cityList);

 

}


function checkSited() {

    // Create a dictionary of input values from drop downs.

    let criteria={};

    let category = document.getElementById("selectCategory");
    criteria.category=category.options[category.selectedIndex].text;

    let state = document.getElementById("selectState");
    criteria.state=state.options[state.selectedIndex].text;

    let city = document.getElementById("selectCity");
    criteria.city=city.options[city.selectedIndex].text;

    console.log(criteria)
 
}

loadOptions();
checkSited();