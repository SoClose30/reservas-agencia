const { timeParser } = require('./timeParser');

const searchBooking = (clientId, Reservas) => {
	const date = new Date().toLocaleDateString('es-AR');
	let booking = '_Usted no tiene una reserva, para hacerla, digite *menu* y luego *hacer una reserva*._';
	let bookings = [];

	for (let clientIndex = 0; clientIndex < Reservas.length; clientIndex++) {
		const { result } = timeParser(date, Reservas[clientIndex][5]);
		if (Reservas[clientIndex][1] === clientId && (result === 'antes de la reserva' || result === 'es el mismo día')) {
			bookings.push([Reservas[clientIndex][4], Reservas[clientIndex][5]]);
		}
	}

	if (bookings.length === 1) {
		booking = `_Usted tiene la siguiente reserva:_\n\n${bookings[0][0]} - ${bookings[0][1]}\n\nPara volver al menú principal digite la palabra *menu*.`;
	} else if (bookings.length > 1) {
		booking = 'Usted tiene las siguientes reservas:\n\n';
		for (let bookingIndex = 0; bookingIndex < bookings.length; bookingIndex++) {
			booking = booking.concat(`${bookings[bookingIndex][0]} - *${bookings[bookingIndex][1]}*\n`);
		}
		booking = booking.concat('\n\nPara volver al menú principal digite la palabra *menú*.');
	}

	return {
		booking,
	};
};

module.exports = {
	searchBooking,
};
