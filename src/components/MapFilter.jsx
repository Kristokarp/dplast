/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import '../styles/mapFilter.scss';
import ship from '../images/black_ship.svg';
import shipHover from '../images/white_ship.svg';

import oil from '../images/black_oil.svg';
import oilHover from '../images/white_oil.svg';

import trash from '../images/black_trash.svg';
import trashHover from '../images/white_trash.svg';

export default function AccordianManager({ setStart }) {
	const [currentVisibility, setCurrentVisibility] = useState(1);

	return (
		<>
			<First
				title="Track using coordinates"
				currentVisibility={currentVisibility}
				setCurrentVisibility={setCurrentVisibility}
				index={1}
			/>

			<Second
				title="Enter vessel parameters"
				currentVisibility={currentVisibility}
				setCurrentVisibility={setCurrentVisibility}
				index={2}
			/>

			<Third
				title="Trash parameters"
				currentVisibility={currentVisibility}
				setCurrentVisibility={setCurrentVisibility}
				index={3}
				setStart={setStart}
			/>
		</>
	);
}
export function First({ title, index, currentVisibility, setCurrentVisibility }) {
	return (
		<div className="mapFilter" data-visible={currentVisibility === index}>
			<span>{title}</span>
			<h2>{title}</h2>
			<div className="card-wrapper">
				<SourceCard title="SHIP" icon={ship} iconHover={shipHover} />
				<SourceCard title="OIL" icon={oil} iconHover={oilHover} />
				<SourceCard title="TRASH" icon={trash} iconHover={trashHover} />
			</div>

			<InputField label="Last Coordinates" value="58.488, 23.8633" />
			<InputField label="Dates" type="date" value="aaaa" value="2019-11-01" />
			<button
				type="button"
				className="tracking"
				onClick={() => {
					setCurrentVisibility(2);
				}}
			>
				Next
			</button>
			{/* <Slider /> */}
		</div>
	);
}
export function Second({ title, index, currentVisibility, setCurrentVisibility }) {
	return (
		<div className="mapFilter" data-visible={currentVisibility === index}>
			<span>
				<div className="circle red"></div>
				{title}
			</span>
			<h2>{title}</h2>
			<InputField label="Type" value="Ferry" />
			<InputField label="Height" value="15" />
			<InputField label="Weight" value="100" />

			<button
				type="button"
				className="tracking"
				onClick={() => {
					setCurrentVisibility(3);
				}}
			>
				Next
			</button>
		</div>
	);
}
export function Third({ title, index, currentVisibility, setStart, setCurrentVisibility }) {
	return (
		<div className="mapFilter" data-visible={currentVisibility === index}>
			<span>
				<div className="circle"></div>
				{title}
			</span>
			<h2>{title}</h2>
			<InputField label="Approximate amount of items" value="1000" />
			<InputField label="One item weight, gram" value="30" />
			<InputField label="Type" value="Plastic" />

			<button
				type="button"
				className="tracking"
				onClick={() => {
					setStart(true);
					setCurrentVisibility(5);
				}}
			>
				Start
			</button>
		</div>
	);
}

function Slider() {
	return (
		<div className="slider">
			<input type="range" />
		</div>
	);
}
function SourceCard({ title, icon, iconHover }) {
	const [selected, setSelected] = useState(false);
	const [image, setImage] = useState(icon);
	useEffect(() => {
		if (selected) {
			setImage(iconHover);
		}
	}, [selected]);
	return (
		<div
			className="sourceCard"
			onClick={() => {
				setSelected(prev => !prev);
			}}
			onMouseOver={() => {
				if (selected) {
					return;
				}
				setImage(iconHover);
			}}
			onMouseLeave={() => {
				if (selected) {
					return;
				}
				setImage(icon);
			}}
			data-selected={selected}
		>
			<div>
				<img src={image} alt="" />
			</div>
			{title}
		</div>
	);
}
function InputField({ label, value = '', type = 'text' }) {
	return (
		<div className="inputField">
			<label htmlFor="">{label}</label>
			<input defaultValue={value} type={type} />
		</div>
	);
}
