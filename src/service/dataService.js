import { secondsToTime } from 'utils/time';

export function getData(file) {
	const source = require(`../../parser/${file}.json`);
	const data = source;
	Object.keys(data).map(key => {
		const date = secondsToTime(key)
			.split(' ')
			.shift();
		const [year, month, day] = date.split('-');
		source[key] = source[key].map(datum => {
			datum.month = parseInt(month, 10);
			datum.day = parseInt(day, 10);
			datum.year = parseInt(year, 10);
			datum.date = date;
			return datum;
		});
	});
	return data;
}
export function init() {
	return {
		plastic: getData('plastic'),
		oil: getData('oil'),
		trash: getData('trash'),
	};
}
