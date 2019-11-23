import React, { useEffect } from 'react';
import L from 'leaflet';
const plastic = require('../data/plastic.json');

let layerGroup;
let map;
let diff;
let simulation;
let time;

const times = Object.keys(plastic)
	.map(Number)
	.sort();

function addPointsToMap(points) {
	layerGroup = L.layerGroup().addTo(map);
	points.forEach(latlng => {
		new L.circleMarker(latlng, { radius: 3, fillOpacity: 1 }).addTo(layerGroup);
	});
}

function Map() {
	diff = times[1] - times[0];
	time = times[0];

	useEffect(() => {
		map = L.map('map').setView([58.488, 4.8633], 7);
		layerGroup = L.layerGroup().addTo(map);
		// map.scrollWheelZoom.disable();
		map.setMaxBounds([[-90, -180], [90, 180]]);
		map.removeControl(map.zoomControl);

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution:
				'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			id: 'mapbox.satellite',
			accessToken:
				'pk.eyJ1IjoiYmVya2VyZGVtaXJlciIsImEiOiJjazF3aHlxNDQwMXVyM2pwbW5zMjI1Z3BzIn0.m-xrbIqHg-s-hl3lqZcXSw',
		}).addTo(map);

		addPointsToMap(plastic[time]);
	}, []);

	useEffect(() => {
		if (time === times[times.length - 1]) {
			simulation.clearInterval();
		} else {
			simulation = setInterval(() => {
				layerGroup.clearLayers();
				if (time === times[times.length - 1]) {
					time = times[0];
				}

				time = time + diff;
				addPointsToMap(plastic[time]);
			}, 100);
		}
	}, []);

	return <div id="map"></div>;
}

export default Map;
