import React, { useEffect, useState } from 'react';
import { init as dataInit, displayPoints } from '../service/dataService';
import { init as mapInit } from '../service/mapService';

import MapFilter from './MapFilter';
let simulation;
let seconds;
let map, layerGroup;

function Map() {
	const [start, setStart] = useState(false);

	useEffect(() => {
		[map, layerGroup] = mapInit();
		dataInit();
	}, []);

	useEffect(() => {
		if (start) {
			simulation = setInterval(() => {
				seconds = displayPoints(seconds, simulation, layerGroup, map);
			}, 100);
		}
	}, [start]);

	return (
		<>
			<MapFilter setStart={setStart} />
			<div id="map"></div>;
		</>
	);
}

export default Map;
