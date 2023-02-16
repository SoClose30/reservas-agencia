const { batchUpdate } = require('./batchUpdate');

const saveBooking = async (booking, Reservas, sheets, clientId, date) => {
	let isBooked = '_No se pudo guardar la reserva, por favor, contacte al administrador._';

	for (let clientIndex = 1; clientIndex < Reservas.length; clientIndex++) {
		if (Reservas[clientIndex][0] === undefined) {
			booking.unshift(clientIndex, clientId, date);
			await batchUpdate('Reservas', 'A', clientIndex, booking, '1drG4DcZhUWgygvmqSq8JGM-hYAVk2WchOkDMevevCl8', sheets);
			Reservas[clientIndex] = booking;
			isBooked = '_La reserva se ha guardado correctamente, si desea hacer otra reserva, digite la palabra *menu*._';
			break;
		}
	}

	return {
		isBooked,
	};
};

module.exports = {
	saveBooking,
};
