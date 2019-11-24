import React, { useEffect, useState } from 'react';

import { init as dataInit } from '../service/dataService';
import { init as mapInit, renderMap } from '../service/mapService';

import MapFilter from './MapFilter';
let sourceData = {};

function getCoordinates({ data, month, day }) {
	for (const [key, values] of Object.entries(data)) {
		const value = values[0];
		if (value.day === day && value.month === month) {
			return data[key];
		}
	}
}

function Map() {
	const [date, setDate] = useState({
		// day: 14,
		// month: 11,
		// year: 2019,
		// date: '2019-11-14',
	});
	const [sources, setSource] = useState({
		plastic: false,
		oil: false,
		trash: false,
	});
	useEffect(() => {
		mapInit();
		sourceData = dataInit();
	}, []);
	useEffect(() => {
		if (!date.month) {
			return;
		}
		const { month, day } = date;
		const coordinates = Object.keys(sources).reduce((prev, source) => {
			const value = sources[source];
			if (!value) {
				return prev;
			}
			const coordinates = getCoordinates({ data: sourceData[source], month, day }) || [];
			return [...prev, ...coordinates];
		}, []);
		renderMap({ coordinates });
	}, [date]);

	return (
		<>
			<MapFilter sources={sources} setSource={setSource} date={date} setDate={setDate} />
			<div id="map"></div>;
		</>
	);
}

export default Map;
