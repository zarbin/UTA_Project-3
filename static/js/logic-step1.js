

// Creating the map object
var url = '/data_map'

//var geojson; 

//Get the data with d3.

    // Adding the tile layer
var base = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var satalite = L.tileLayer('https://core-sat.maps.yandex.net/tiles?l=sat&x={x}&y={y}&z={z}&scale=1&lang=ru_RU', {
        attribution: '<a href="https://yandex.ru" target="_blank">Yandex</a>'
});

var baseMaps = {
        "<span style='color: blue'>Street Map</span>": base,
        "<span style='color: blue'>Satalite Map</span>": satalite
};    

var myMap = L.map("map", {
        center: [38.3, -97.36],
        zoom: 4.5,
        layers: [base]
});  

//base.addTo(myMap);
L.control.layers(null, baseMaps,).addTo(myMap);  

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

d3.json(url).then(function(response, ) {
    console.log(response);
    
    function ptToLayer(latlng) {
        return L.circleMarker(latlng, {
            color: 'green',
            weight: 1,
            //fillColor: getColor(response.latitude, response.longitude),
            fillOpacity: 0.6,
            //radius: feature.properties.mag ** 1.5,
        });
    };

    var gJsonLayer = L.geoJson(response, {
        //onEachFeature: onEach,
        pointToLayer: ptToLayer
    });

    myMap.addLayer(gJsonLayer);
    
}); 


