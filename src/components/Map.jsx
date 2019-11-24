import React, { useEffect, useState } from 'react';
import { init as dataInit, displayPoints } from '../service/dataService';
import { init as mapInit } from '../service/mapService';
import modal from '../images/modal.svg';

import MapFilter from './MapFilter';
let simulation;
let seconds;
let map, layerGroup;

function Map() {
	const [start, setStart] = useState(false);
	const [end, setMax] = useState(false);
	const [modalVisibility, setModalVisibility] = useState(false);

	useEffect(() => {
		[map, layerGroup] = mapInit();
		map.on('click', () => {
			setModalVisibility(true);
		});
		dataInit();
	}, []);

	useEffect(() => {
		if (start) {
			simulation = setInterval(() => {
				if (end) {
					seconds = 1572850800;
				}
				seconds = displayPoints(seconds, simulation, layerGroup, map);
			}, 100);
		}
	}, [start]);

	return (
		<>
			<MapFilter setStart={setStart} />
			<div
				id="map"
				ondblclick={() => {
					setModalVisibility(true);
				}}
			></div>
			{modalVisibility && (
				<img
					className="modal"
					src={modal}
					alt=""
					style={{
						position: 'fixed',
						top: '137px',
						left: '843px',
						height: '136px',
					}}
				/>
			)}
		</>
	);
}

export default Map;
