/* eslint-disable react/prop-types */
import React from 'react';

import '../styles/mapFilter.scss';

export default function MapFilter({ sources, setSource, setDate }) {
	return (
		<div className="mapFilter">
			<div className="card-wrapper">
				<SourceCard title="Plastic" sources={sources} changeHandler={setSource} />
				<SourceCard title="Oil" sources={sources} changeHandler={setSource} />
				<SourceCard title="Trash" sources={sources} changeHandler={setSource} />
			</div>

			<InputField label="Last Coordinates" />
			<InputField label="Dates" type="date" />
			<button
				type="button"
				className="tracking"
				onClick={() => {
					const { value } = document.querySelector('[type=date]');
					const [year, month, day] = value.split('-');
					setDate({
						day: parseInt(day, 10),
						month: parseInt(month, 10),
						year: parseInt(year, 10),
						date: value,
					});
				}}
			>
				Tracking
			</button>
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
function InputField({ label, type = 'text' }) {
	return (
		<div className="inputField">
			<label htmlFor="">{label}</label>
			<input type={type} />
		</div>
	);
}
