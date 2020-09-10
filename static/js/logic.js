// Vizualizing Data with Leaflet

// Earthquakes & Tectonic Plates GeoJSON URL Variables
var earthquakesURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var platesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"


// Initialize & Create Two Separate LayerGroups: earthquakes & tectonicPlates
var earthquakes = new L.LayerGroup();
var tectonicPlates = new L.LayerGroup();

// Define varaibles for Tile Layers

// var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom : 18,
//     id: "satellite-streets-v11",
//     accessToken: API_KEY
// });

// var grayscaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{
//     attribution :  "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom : 18,
//     id: "light-v10",
//     accessToken: API_KEY
// });

// var outdoorMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom : 18,
//     id: "outdoor-v11",
//     accessToken: API_KEY
// });

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 10,
      id: "light-v10",
      accessToken: API_KEY
    });

    // Create the tile layer that will be the satellite background of our map
    var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 10,
        id: "satellite-streets-v11",
        accessToken: API_KEY
    });

    // Create the tile layer that will be the outdoors background of our map
    var outdoorsmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 10,
        id: "outdoors-v11",
        accessToken: API_KEY
    });

// Define Base Layers

var baseMaps = {
    "Satellite": satellitemap,
    "Grayscale": lightmap,
    "Outdoors": outdoorsmap
};

// Create Overlay Layers

var overlayMaps = {
    "Earthquakes": earthquakes,
    "Fault Lines": tectonicPlates
};

var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 2,
    layers: [outdoorsmap, earthquakes]
  });

// Create a Layer Control and Pass in baseMaps and OverlayMaps and add it to myMap
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

//Retrieve Json Data with D3

d3.json(earthquakesURL, function(earthquakeData){
    function markersize(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 3;
    }

    function styleInfo(feature){
        return{
            opacity : 1,
            fillOpacity: 1,
            fillColor : chooseColor(feature.properties.mag),
            color: "#000000",
            radius: markersize(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }
    function chooseColor(magnitude) {
        switch(true) {
            case magnitude > 5:
                return "purple";
            case magnitude > 4:
                return "red";
            case magnitude > 3:
                return "blue";
            case magnitude > 2:
                return "green";
            case magnitude > 1:
                return "orange";
            default:
                return "yellow";
        }
    }

    // Create a JSON Layers Containing Feature Array
    L.geoJSON(earthquakeData, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature : function(feature, layer){
            layer.bindPopup("<h3>Location: "+ feature.properties.place + 
            "</h3><hr><p>Date & Time: " + new Date(feature.properties.time) +
            "</p><hr><p>Magnitude: " + feature.properties.mag + "</p>");
        }
    }).addTo(earthquakes);
    earthquakes.addTo(myMap);

    d3.json(platesURL, function(plateData){
        L.geoJson(plateData, {
            color : "#DC143C",
            weight: 2
        }).addTo(tectonicPlates);
        tectonicPlates.addTo(myMap);
    });

    // Set up a Legend

    var legend = L.control({position: "bottomleft"});
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        magnitudeLevels = [0,1,2,3,4,5];

        div.innerHTML += "<h3>Magnitude</h3>"

        for (var i = 0; i < magnitudeLevels.length; i++){
            div.innerHTML += 
            '<i style="background: ' + chooseColor(magnitudeLevels[i] + 1) +'"></i>' +
            magnitudeLevels[i] + (magnitudeLevels[i + 1] ? '&ndash;' + magnitudeLevels[i + 1] + '<br>' : '+');
        }
        return div; 
    };

    // Add Legend to the Map
    legend.addTo(myMap);
});
