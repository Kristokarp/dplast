import React from 'react';

import '../styles/mapFilter.scss';

export default function MapFilter({ setMonthYear }) {
	return (
		<div className="mapFilter">
			<div className="card-wrapper">
				<SourceCard title="Ship" />
				<SourceCard title="Oil" />
				<SourceCard title="Trash" />
			</div>

			<InputField label="Last Coordinates" />
			<InputField label="Dates" type="date" changeHandler={setMonthYear} />
			<button type="button" className="tracking" onClick={() => {}}>
				Tracking
			</button>
		</div>
	);
}
function SourceCard({ title }) {
	return <div className="sourceCard">{title}</div>;
}
function InputField({ label, type = 'text', changeHandler = () => {} }) {
	return (
		<div className="inputField">
			<label htmlFor="">{label}</label>
			<input
				type={type}
				onChange={({ target: { value } }) => {
					const [year, month, day] = value.split('-');
					changeHandler({
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
