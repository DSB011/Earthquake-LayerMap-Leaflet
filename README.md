# Mapping Earthquake Data using Leaflet
<img src = "https://github.com/DSB011/Earthquake-LayerMap-Leaflet/blob/master/Images/1-Logo.png">

## Overview:
The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

## Objective:
To create an interactive wolrd map using Leaflet and Mapbox to understand the corelation between tectonic plates and seismic activity over the last week.
For this, I used the data in GeoJson format and fetch it using its API and created the visualization using D3.

## Dataset:
The following datasets were used.<br>
[Seismic Activity Data](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)<br>
[Tectonic Plates Data](https://github.com/fraxen/tectonicplates)

## Visualizations:
1. Created a world map using leaflet.js that plots all the earthquakes from the dataset using the latitude and the longitude. <br>
2. Each data markers reflects the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.<br>
3. Included popups that provide additional information about the earthquake when a marker is clicked.<br>
4. Created a legend that will provide context for the map data.<br>
5. Added a number of base maps to choose from (top-right drop-down)as well as two different data sets into overlays that can be turned on and off independently.<br>
6. Added a tooltip in the scrollover that indicates the location and magnitude of the earthquake.<br>

<img src = "https://github.com/DSB011/Earthquake-LayerMap-Leaflet/blob/master/Images/2-BasicMap.png"> <br>

<img src = "https://github.com/DSB011/Earthquake-LayerMap-Leaflet/blob/master/Images/Heat.png">

## Tech Environment Used:
Mapbox, D3, Leaflet, Javascript, HTML5, GitHub, VSCode
