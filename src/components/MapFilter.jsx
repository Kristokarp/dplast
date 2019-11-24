/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import '../styles/mapFilter.scss';

export default function AccordianManager({ sources, setSource, date, setDate }) {
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
				sources={sources}
				setSource={setSource}
				date={date}
				setDate={setDate}
			/>

			<Second
				title="Enter vessel parameters"
				currentVisibility={currentVisibility}
				setCurrentVisibility={setCurrentVisibility}
				index={2}
				sources={sources}
				setSource={setSource}
				date={date}
				setDate={setDate}
			/>

			<Third
				title="Trash parameters"
				currentVisibility={currentVisibility}
				setCurrentVisibility={setCurrentVisibility}
				index={3}
				sources={sources}
				setSource={setSource}
				date={date}
				setDate={setDate}
			/>
		</>
	);
}
export function First({ title, sources, setSource, date, setDate, index, currentVisibility, setCurrentVisibility }) {
	return (
		<div className="mapFilter" data-visible={currentVisibility === index}>
			<span>{title}</span>
			<div className="card-wrapper">
				<SourceCard title="Plastic" sources={sources} changeHandler={setSource} />
				<SourceCard title="Oil" sources={sources} changeHandler={setSource} />
				<SourceCard title="Trash" sources={sources} changeHandler={setSource} />
			</div>

			<InputField label="Last Coordinates" />
			<InputField
				label="Dates"
				type="date"
				value={`${date.year}-${date.month}-${date.day}`}
				changeHandler={setDate}
			/>
			<button
				type="button"
				className="tracking"
				onClick={() => {
					setCurrentVisibility(2);
				}}
			>
				Next
			</button>
			<MediaButtons date={date} setDate={setDate} />
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
export function Third({ title, index, currentVisibility, setDate, setCurrentVisibility }) {
	const [loop, setLoop] = useState(false);
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
					const data = setInterval(() => {
						animate({ setDate });
					}, 500);
					setLoop(data);
					setCurrentVisibility(1);
				}}
			>
				Start
			</button>
		</div>
	);
}

function animate({ setDate }) {
	setDate(prev => {
		const day = prev.day || 1;

		const max = 21;
		if (day > max) {
			return prev;
		}
		return { ...prev, day: day + 1 };
	});
}
function MediaButtons({ setDate }) {
	return (
		<div className="media-button">
			<button onClick={() => {}}>Play</button>
			<button onClick={() => {}}>Pause</button>
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
function SourceCard({ sources, changeHandler, title }) {
	const key = title.toLowerCase();
	const value = sources[key];
	return (
		<div
			className="sourceCard"
			data-selected={value}
			onClick={() => {
				changeHandler(prev => {
					return {
						...prev,
						[key]: !prev[key],
					};
				});
			}}
		>
			{title}
		</div>
	);
}
function InputField({ label, changeHandler, value = '', type = 'text' }) {
	const handler = changeHandler ? changeHandler : () => {};
	return (
		<div className="inputField">
			<label htmlFor="">{label}</label>
			<input
				value={value}
				type={type}
				onChange={e => {
					const { value } = e.target;
					const [year, month, day] = value.split('-');
					handler({
						day: parseInt(day, 10),
						month: parseInt(month, 10),
						year: parseInt(year, 10),
						date: value,
					});
				}}
			/>
		</div>
	);
}
