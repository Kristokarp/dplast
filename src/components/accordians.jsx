import React from 'react';

export default function AccordianManager({ length }) {
	return (
		<>
			{[...Array(5).keys()].map(index => {
				return <Accordian />;
			})}
		</>
	);
}
export function Accordian({ children }) {
	return { children };
}
