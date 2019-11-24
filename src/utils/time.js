export function secondsToTime(seconds) {
	const time = new Date(seconds * 1000).toISOString();
	return time.slice(0, 19).replace('T', ' ');
}
