import React, { useEffect } from 'react';
import L from 'leaflet';

function Map() {
	const markers = [];
	useEffect(() => {
		const map = L.map('map').setView([58.488, 19.8633], 6);
		// map.scrollWheelZoom.disable();
		map.setMaxBounds([[-90, -180], [90, 180]]);
		map.removeControl(map.zoomControl);

		map.on('click', e => {
			const marker = new L.circleMarker(e.latlng);
			markers.push(marker);
			marker.addTo(map);
		});

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution:
				'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			id: 'mapbox.satellite',
			accessToken:
				'pk.eyJ1IjoiYmVya2VyZGVtaXJlciIsImEiOiJjazF3aHlxNDQwMXVyM2pwbW5zMjI1Z3BzIn0.m-xrbIqHg-s-hl3lqZcXSw',
		}).addTo(map);
	}, []);

	return <div id="map"></div>;
}

export default Map;
