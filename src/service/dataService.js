import L from 'leaflet';

let plastic;
let ship;
const diff = 3600;
const startSeconds = 1572566400;
const maxSeconds = 1574316000;
const maxShip = 1572850800;

export function getData(file) {
	const source = require(`../data/${file}.json`);
	const data = source;
	return data;
}
export function init() {
	plastic = getData('plastic');
	ship = getData('ship');
}

export function addPointsToLayer(seconds, layerGroup) {
	plastic[seconds].forEach(latlng => {
		new L.circleMarker(latlng, { radius: 3, fillOpacity: 1 }).addTo(layerGroup);
	});

	const shipseconds = seconds > maxShip ? maxShip : seconds;

	ship[shipseconds].forEach(latlng => {
		new L.circleMarker(latlng, { radius: 3, fillOpacity: 1, color: '#ff0000' }).addTo(layerGroup);
	});
}

export function displayPoints(seconds, simulation, layerGroup, map) {
	if (!seconds) {
		seconds = startSeconds;
	}

	if (seconds === maxSeconds) {
		clearInterval(simulation);
		return seconds;
	}

	layerGroup.clearLayers();
	seconds = seconds + diff;

	addPointsToLayer(seconds, layerGroup, map);

	return seconds;
}
