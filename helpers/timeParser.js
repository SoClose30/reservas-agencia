const timeParser = (actualDate, dateToCompare) => {
	const splittedActualDate = actualDate.split('/');
	const splittedDateToCompare = dateToCompare.split('/');

	let dayIsGreater = false;
	let monthisGreater = false;
	let yearIsGreater = false;

	let result = 'Es el mismo día';

	if (Number(splittedActualDate[0]) > Number(splittedDateToCompare[0])) {
		dayIsGreater = true;
	}
	if (Number(splittedActualDate[1]) > Number(splittedDateToCompare[1])) {
		monthisGreater = true;
	}
	if (Number(splittedActualDate[2]) > Number(splittedDateToCompare[2])) {
		yearIsGreater = true;
	}
	if (Number(splittedActualDate[0]) === Number(splittedDateToCompare[0])) {
		dayIsGreater = 'equal';
	}
	if (Number(splittedActualDate[1]) === Number(splittedDateToCompare[1])) {
		monthisGreater = 'equal';
	}
	if (Number(splittedActualDate[2]) === Number(splittedDateToCompare[2])) {
		yearIsGreater = 'equal';
	}

	if (dayIsGreater && monthisGreater && yearIsGreater) {
		result = 'después de la reserva';
	}

	if (!dayIsGreater && !monthisGreater && !yearIsGreater) {
		result = 'antes de la reserva';
	}

	if (dayIsGreater && !monthisGreater && !yearIsGreater) {
		result = 'antes de la reserva';
	}
	if (dayIsGreater && monthisGreater && !yearIsGreater) {
		result = 'antes de la reserva';
	}
	if (!dayIsGreater && monthisGreater && yearIsGreater) {
		result = 'después de la reserva';
	}
	if (dayIsGreater && !monthisGreater && yearIsGreater) {
		result = 'después de la reserva';
	}
	if (!dayIsGreater && !monthisGreater && yearIsGreater) {
		result = 'después de la reserva';
	}
	if (dayIsGreater && monthisGreater === 'equal' && yearIsGreater === 'equal') {
		result = 'antes de la reserva';
	}
	if (!dayIsGreater && monthisGreater === 'equal' && yearIsGreater === 'equal') {
		result = 'antes de la reserva';
	}
	if (dayIsGreater && monthisGreater && yearIsGreater === 'equal') {
		result = 'después de la reserva';
	}
	if (dayIsGreater && !monthisGreater && yearIsGreater === 'equal') {
		result = 'antes de la reserva';
	}

	if (!dayIsGreater && !monthisGreater && yearIsGreater === 'equal') {
		result = 'antes de la reserva';
	}

	if (!dayIsGreater && monthisGreater === 'equal' && !yearIsGreater) {
		result = 'antes de la reserva';
	}

	if (dayIsGreater === 'equal' && monthisGreater === 'equal' && yearIsGreater === 'equal') {
		result = 'es el mismo día';
	}

	console.log(dayIsGreater, monthisGreater, yearIsGreater);
	return { result };
};

module.exports = {
	timeParser,
};
