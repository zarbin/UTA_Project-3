// Creating the map object
var myMap = L.map("map", {
  center: [38.3, -97.36],
  zoom: 4.5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON data.
var geoData = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/ACS-ED_2014-2018_Economic_Characteristics_FL.geojson";

var geojson;

// Get the data with d3.
d3.json(geoData).then(function(data) {

  console.log(data);

  
  // Set up the legend.
  var legend = L.control({position: 'bottomright'});


  legend.onAdd = function(){

    // Create the legend div
    var div = L.DomUtil.create('div', 'info legend'),
        levels = [1, 10, 30, 50, 100, 200, 500],
        labels = [];

    // create legend title
    div.innerHTML += '<center><h2>Job<br>Postings</h2><hr></center>'

    for (var i = 0; i < levels.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(levels[i] + 1) + '"></i> '  +
            levels[i] + (levels[i + 1] ? '&ndash;' + levels[i + 1] + ' <br>' : ' +');
    };
    return div;
  };

  legend.addTo(myMap);

  function getColor(depth){
    
    // Deeper depths have darker colors
    if (depth > 500){
        return '#b10026'
    } else if (depth > 200){
        return '#e31a1c';
    } else if (depth > 100){
        return '#fc4e2a'
    } else if(depth > 50) {
        return '#fd8d3c'
    } else if (depth > 30) {
        return '#feb24c'
    } else if (depth > 10) {
        return '#fed976'
    } else {
        return '#ffffb2'
    };
};

    // Add the minimum and maximum

  // Adding the legend to the map.

  // Create a new choropleth layer.

    // Define which property in the features to use.

    // Set the color scale.

    // The number of breaks in the step range

    // q for quartile, e for equidistant, k for k-means

    // Binding a popup to each layer


});
