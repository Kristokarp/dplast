/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import '../styles/mapFilter.scss';

export default function AccordianManager({ setStart }) {
	const [currentVisibility, setCurrentVisibility] = useState(1);
	useEffect(() => {
		console.log(currentVisibility);
	}, [currentVisibility]);
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
			<div className="card-wrapper">
				<SourceCard title="Plastic" />
				<SourceCard title="Oil" />
				<SourceCard title="Trash" />
			</div>

			<InputField label="Last Coordinates" />
			<InputField label="Dates" type="date" value="aaaa" />
			<button
				type="button"
				className="tracking"
				onClick={() => {
					setCurrentVisibility(2);
				}}
			>
				Next
			</button>
			<Slider />
		</div>
	);
}
export function Second({ title, index, currentVisibility, setCurrentVisibility }) {
	return (
		<div className="mapFilter" data-visible={currentVisibility === index}>
			<span>{title}</span>

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
			<span>{title}</span>

			<InputField label="Approximate amount of items" value="1000" />
			<InputField label="One item weight, gram" value="30" />
			<InputField label="Type" value="Plastic" />

			<button
				type="button"
				className="tracking"
				onClick={() => {
					setStart(true);
					setCurrentVisibility(1);
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
function SourceCard({ title }) {
	let enabled = false;
	return (
		<div
			className="sourceCard"
			onClick={() => {
				enabled = !enabled;
			}}
		>
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
