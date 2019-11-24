import L from 'leaflet';
let map, layerGroup;
const mapConfig = {
	minZoom: 2,
	attribution:
		'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox.satellite',
	accessToken: 'pk.eyJ1IjoiYmVya2VyZGVtaXJlciIsImEiOiJjazF3aHlxNDQwMXVyM2pwbW5zMjI1Z3BzIn0.m-xrbIqHg-s-hl3lqZcXSw',
};

export function init() {
	// create map
	map = L.map('map').setView([58.488, 23.8633], 7);
	// map.scrollWheelZoom.disable();
	map.setMaxBounds([[-90, -180], [90, 180]]);
	map.removeControl(map.zoomControl);
	map.doubleClickZoom.disable();
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', mapConfig).addTo(
		map,
	);
	layerGroup = L.layerGroup().addTo(map);
}

function render({ source, map, layerGroup, fillColor }) {
	source.map(data => {
		L.geoJSON(
			{
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [data.lng, data.lat],
				},
			},
			{
				pointToLayer: function(feature, latLng) {
					return L.circleMarker(latLng, {
						radius: map.getZoom() * 1.5,
						fillColor,
						color: fillColor,
						weight: 1,
						fillOpacity: data.opacity,
					});
				},
			},
		).addTo(layerGroup);
	});
}
export function renderMap({ coordinates }) {
	if (!map) {
		const obj = init();
		map = obj.map;
		layerGroup = obj.layerGroup;
	}
	layerGroup.clearLayers();
	render({
		source: coordinates,
		map,
		layerGroup,
		fillColor: '#ff7800',
	});
}
