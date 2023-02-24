

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
            levels = [1, 10, 15, 25, 35, 50, 100],
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
    

function getColor(jCount){
    
    // Deeper depths have darker colors
    if (jCount > 100){
        return '#b10026'
    } else if (jCount > 50){
        return '#e31a1c';
    } else if (jCount > 35){
        return '#fc4e2a'
    } else if(jCount > 25) {
        return '#fd8d3c'
    } else if (jCount > 15) {
        return '#feb24c'
    } else if (jCount > 10) {
        return '#fed976'
    } else {
        return '#ffffb2'
    };
};

d3.json(url).then(function(response, ) {
    console.log(response);
    
    function ptToLayer(feature, latlng) {
        return L.circleMarker(latlng, {
            color: 'olive',
            weight: 1.5,
            fillColor: getColor(feature.properties.count),
            fillOpacity: 0.7,
            radius: feature.properties.count ** .7,
        });
    };

    function onEach(feature, layer) {
        layer.bindPopup(`<h2>${feature.properties.location}</h2><h3>
            
            Amount of jobs in city: ${feature.properties.count} Data Analyst</h3><hr>`);

        // mousehover action
        layer.on('mouseover', function(d){
            this.openPopup();
        });
        layer.on('mouseout', function(e){
            this.closePopup();
        });
    };

    var gJsonLayer = L.geoJson(response.features, {
        onEachFeature: onEach,
        pointToLayer: ptToLayer
    });

    myMap.addLayer(gJsonLayer);
    
}); 


