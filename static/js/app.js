// The URL is where the data endpoint is on Flask, which is on the local server at "http://127.0.0.1:5000/data"
var url = "/data";


// Pull in and read the json formatted data using d3
d3.json(url).then((data) => {

    var lookup = {};
    var result = [];

    //loop through and get count for job sources
    for (var item, i = 0; item = data[i++];) {
        var name = item['via'];

        if (!(name in lookup)) {
            lookup[name] = 1;
            result.push(name);
        } else if (name in lookup) {
            lookup[name] += 1;
        }
    }

    //display results
    //console.log(result);
    //sort in descending order by count
    //let sorted = lookup.sort((a, b) => a[1] - b[1]);
    function sortObjEntires(obj){
        return Object.entries(obj).sort((a,b) => b[1]-a[1])
    }
  
    let sorted = sortObjEntires(lookup)
    let sliced = sorted.slice(0, 10);

    var xticks = [];
    var yticks = [];

    //loop through and get count for job sources
    for (var x = 0; x < sliced.length;  x++) {
        // Set top ten items to display in descending order
        xticks.push(sliced[x][0]);
        yticks.push(sliced[x][1]);
        console.log(sliced[x]);
    }

    console.log(xticks);
    console.log(yticks);
    //let labels = "Test Bar Chart"

    // Set up the the bar chart
    let barChart = {
        x: xticks,
        //labels: xticks,
        y: yticks,
        //values: yticks,
        type: "bar"
        //orientation: "h"
    };
    
    let Chart = [barChart];

    // Setup layout
    let layout = {
        title: "Job Posting Count by Source",
        hovermode: "closest",
        xaxis: {title: "Job Sourced Via"},
        yaxis: {title: "Count of Jobs"}
    };

    // Call Plotly to plot the bar chart
    Plotly.newPlot("bar", Chart, layout);

});