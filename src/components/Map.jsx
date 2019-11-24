import React, { useEffect, useState } from 'react';

import { init as dataInit } from '../service/dataService';
import { init as mapInit, renderMap } from '../service/mapService';

import MapFilter from './MapFilter';

function getCoordinates({ data, month, day }) {
	for (const [key, values] of Object.entries(data)) {
		const value = values[0];
		if (value.day === day && value.month === month) {
			return data[key];
		}
	}
}

function Map() {
	const [monthYear, setMonthYear] = useState({
		day: 14,
		month: 11,
		year: 2019,
	});
	useEffect(() => {
		mapInit();
	}, []);
	useEffect(() => {
		if (!monthYear.month) {
			return;
		}
		const { month, day } = monthYear;
		const { plastic } = dataInit();
		const coordinates = getCoordinates({ data: plastic, month, day }) || [];
		renderMap({ coordinates });
	}, [monthYear]);

	return (
		<>
			<MapFilter monthYear={monthYear} setMonthYear={setMonthYear} />
			<div id="map"></div>;
		</>
	);
}

export default Map;
