// The URL is where the data endpoint is on Flask, which is on the local server at "http://127.0.0.1:5000/data"
let url = "/data";

//variables 
let xticks = [];
let yticks = [];
let state_data = {};

// Pull in and read the json formatted data using d3
d3.json(url).then((data) => {

    var state = []

    //loop through and get cleaned state data and appened to JSON
    for (var item, i = 0; item = data[i++];) {
        var location = item['location'];

        const stateCodeMatch = location.match(/,\s*([A-Z]{2})$/);
        const stateCode = stateCodeMatch ? stateCodeMatch[1] : 'United States';

        //console.log(stateCode);
        //check if state is already in list
        if(!state.includes(stateCode)){
            state.push(stateCode);
        }

        //add cleaned state data to JSON
        item['state'] = stateCode;
    }
        

    //loop through and get count for job listing sources
    for (var item, i = 0; item = data[i++];) {
        var state = item['state'];
        var name = item['via'];
 
        //drop 'via ' from the string
        name = name.substring(4);
        
        //if state is not in the object, add it and the job listing source set value to 1
        //if state does exist in the object check if listing source name is in the object
        //if listing source name is not in the object, add it and set count to 1
        //if listing source name is in the object, increment the count
        if (!(state in state_data)) {
            state_data[state] = {};
            state_data[state][name] = 1;
        } else if (state in state_data) {
            if (isNaN(state_data[state][name])) {
                state_data[state][name] = 1;
            } else {
                state_data[state][name] += 1;    
            }
        }
    }

    //view state_data object in console
    console.log(state_data);

    //sort function.  not in use.
    /*function sortObjEntires(obj){
        return Object.entries(obj).sort((a,b) => b[1]-a[1])
    }*/
     
    // Sort the company_name values for each state within state_data
    for (const state in state_data) {
        const company_values = Object.entries(state_data[state]);
        company_values.sort((a, b) => b[1] - a[1]);
        //console.log(state);
        //console.log(company_values);
        state_data[state] = company_values;  // this doesn't seem to maintain previous object structure, but works.
    }
    
    //view state_data object in console post sort
    console.log(state_data);

     //Default data loaded for pie chart
    const arCompanies = Object.entries(state_data.AR);
    //console.log('arCompanies');
    //console.log(arCompanies);


    //loop through and populate xticks and yticks
    //this could be standalone function
    //currently repeating code when the dropdown is changed
    for (var x = 0; (x < 10 && x < arCompanies.length);  x++) {
        // Set top ten items to display in descending order
        xticks.push(arCompanies[x][1][0]);
        yticks.push(arCompanies[x][1][1]);
        //console.log(arCompanies[x][1]);
    }

    /* for debugging
    console.log('xticks');
    console.log(xticks);
    console.log('yticks');
    console.log(yticks);*/

    //after data processing intialize the chart
    init();
})

// function to build the plot: pie chart
function pie_graph(){

    // create the pie chart
    let chart = {
        values: yticks,
        labels: xticks,
        type: "pie",
        textinfo: "label+value+percent",
        textposition: "outside",
        automargin: false
    };

    //layout for the pie chart
    let layout = {
        title: "Job Posting Count by Source",
        hovermode: "closest",
        xaxis: {title: "Job Sourced Via"},
        yaxis: {title: "Count of Jobs"},
        width: '1600',
        height: '900'
    };

    //create new pie chart using plotly
    Plotly.newPlot("pie", [chart], layout);
}

// Initialize the dashboard
function init() {
    pie_graph();
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a letiable
    let dataset = dropdownMenu.property("value");
    // Initialize an empty array for the country's data
    let data = [];
  
    if (dataset == 'AR') {
        data = Object.entries(state_data.AR);
    }
    else if (dataset == 'CA') {
        data = Object.entries(state_data.CA);
    }
    else if (dataset == 'KS') {
        data = Object.entries(state_data.KS);
    }
    else if (dataset == 'MO') {
        data = Object.entries(state_data.MO);
    }
    else if (dataset == 'OK') {
        data = Object.entries(state_data.OK);
    }
    else if (dataset == 'TX') {
        data = Object.entries(state_data.TX);
    }
    else if (dataset == 'United States') {
        data = Object.entries(state_data['United States']);
    }

    // Clear out the xticks and yticks
    xticks = [];
    yticks = [];

    //console.log(data);
    //console.log(data.length);
    // Call function to update the chart
    for (var x = 0; (x < 10 && x < data.length);  x++) {
        // Set top ten items to display in descending order
        xticks.push(data[x][1][0]);
        yticks.push(data[x][1][1]);
    }
    
    /* debugging
    console.log(xticks);
    console.log(yticks);
    console.log('data');
    console.log(data);*/

    pie_graph();
  }