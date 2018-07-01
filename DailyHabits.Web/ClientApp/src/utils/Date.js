export function addDays(date, days) {
	let newDate = new Date(date);
	newDate.setDate(date.getDate() + days);
	return newDate;
};

export function getDaysOffset(firstDate, date) {
	return Math.round((date.getTime() - firstDate.getTime()) / 1000 / 60 / 60 / 24)
}

export function resetTime(date) {
	let newDate = new Date(date);
	newDate.setHours(0, 0, 0, 0);
	return newDate;
}