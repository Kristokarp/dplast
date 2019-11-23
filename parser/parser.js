const { readFileSync, writeFileSync } = require('fs');

const getVariable = (content, variable) => {
	return content
		.match(new RegExp(`${variable}(.|\n)*?;`, 'gm'))
		.pop()
		.replace(/( |=|;|\n|\t|\\)/g, '')
		.replace(variable, '')
		.split(',');
};
const main = path => {
	const content = readFileSync(path, 'utf8');
	const times = getVariable(content, 'time');
	const lat = getVariable(content, 'lat');
	const lng = getVariable(content, 'lon');

	const timesCount = times.length;

	const data = {};

	const points = {};

	let i;
	let lats;
	let lngs;

	let counter = 0;
	for (i = 0; i < lat.length; i += timesCount) {
		lats = lat.slice(i, i + timesCount);
		lngs = lng.slice(i, i + timesCount);

		points[counter] = { lats, lngs };

		counter += 1;
	}

	for (let j = 0; j < timesCount; j++) {
		const time = times[j];

		data[time] = [];
		for (let i = 0; i < counter; i++) {
			const { lats, lngs } = points[i];
			if (lats[j] !== '_' && lngs[j] !== '_') {
				data[time].push({ lat: lats[j], lng: lngs[j] });
			}
		}
	}

	// const data = {};

	// times.map((tr, index) => {
	// 	const ring = index * mod;
	// 	data[tr] = [];
	// 	for (let x = 1; x <= mod; x++) {
	// 		const id = ring + x - 1;
	// 		data[tr].push({
	// 			id: id,
	// 			lat: lat[id],
	// 			lng: lng[id],
	// 		});
	// 	}
	// });

	writeFileSync('plastic.json', JSON.stringify(data));
};

main('./rawdata/ncdumped_2.txt');
