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
	const mod = times.length;
	const data = {};

	times.map((tr, index) => {
		const ring = index * mod;
		data[tr] = [];
		for (let x = 1; x <= mod; x++) {
			const id = ring + x - 1;
			data[tr].push({
				id: id,
				lat: lat[id],
				lng: lng[id],
			});
		}
	});

	writeFileSync('output.json', JSON.stringify(data));
};

main('./payload.txt');
