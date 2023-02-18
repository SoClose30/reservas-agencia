const { saveBooking } = require('./saveBooking');
const { searchBooking } = require('./searchBooking');

let contactsDB = [];

const botMessaging = async (whatsAppClient, Buttons, sheets, Reservas) => {
	whatsAppClient.on('message', async (message) => {
		const date = new Date().toLocaleDateString('es-AR');
		const upperCasedMessage = message.body.toUpperCase();
		const incomingClient = await message.getContact();
		const incomingClientChat = await message.getChat();

		if (!incomingClientChat.isGroup) {
			let correctAnswer = false;
			let contactOnDB = contactsDB.find((item) => item.contactNumber === incomingClient.number);
			if (!contactOnDB || upperCasedMessage === 'MENU' || upperCasedMessage === 'MENÚ') {
				contactsDB = contactsDB.filter((item) => item !== contactOnDB);
				contactsDB.push({ contactNumber: incomingClient.number, step: 0 });
				const greetingButtons = new Buttons('_¡Bienvenido a la sección de *RESERVAS*!, ¿cómo podemos ayudarte?_', [
					{ body: 'Hacer una reserva' },
					{ body: 'Consultar una reserva' },
					{ body: 'Modificar una reserva' },
				]);
				whatsAppClient.sendMessage(message.from, greetingButtons);
			} else {
				if (contactOnDB.step === 0) {
					switch (upperCasedMessage) {
						case 'HACER UNA RESERVA': {
							contactOnDB.isBooking = true;
							contactOnDB.bookingStep = 0;
							correctAnswer = true;
							await whatsAppClient.sendMessage(message.from, '_¿Cuál es el nombre de la agencia/hotel?_');
							break;
						}
						case 'MODIFICAR UNA RESERVA': {
							await whatsAppClient.sendMessage(
								message.from,
								'_Para modificar una reserva, debe comunicarse con el administrador._\n\n_Para volver al menú principal, digite la palabra *menú*._'
							);
							contactOnDB.step = 5;
							break;
						}
						case 'CONSULTAR UNA RESERVA': {
							const { booking } = searchBooking(incomingClient.number, Reservas, date);
							await whatsAppClient.sendMessage(message.from, booking);
							contactOnDB.step = 5;
							break;
						}
						default:
							whatsAppClient.sendMessage(message.from, 'Debe presionar alguno de los tres botones');
							break;
					}
				}

				if (contactOnDB.step === 1 && contactOnDB.isBooking) {
					switch (contactOnDB.bookingStep) {
						case 0: {
							contactOnDB.booking = [message.body];
							await whatsAppClient.sendMessage(message.from, '_¿Cuál es el servicio y horario que desea contratar?_');
							contactOnDB.bookingStep += 1;
							break;
						}
						case 1: {
							contactOnDB.booking.push(message.body);
							await whatsAppClient.sendMessage(message.from, '_¿Fecha de servicio?_');
							contactOnDB.bookingStep += 1;
							break;
						}
						case 2: {
							contactOnDB.booking.push(message.body);
							await whatsAppClient.sendMessage(message.from, '_¿Cuál es el hotel?_');
							contactOnDB.bookingStep += 1;
							break;
						}
						case 3: {
							contactOnDB.booking.push(message.body);
							await whatsAppClient.sendMessage(message.from, '_¿Cuál es la habitación?_');
							contactOnDB.bookingStep += 1;
							break;
						}
						case 4: {
							contactOnDB.booking.push(message.body);
							await whatsAppClient.sendMessage(
								message.from,
								'_¿Cuál es la dirección del hotel/departamento en el que se encuentra hospedado? (*si es departamento, por favor completar piso y depto*)_'
							);
							contactOnDB.bookingStep += 1;
							break;
						}
						case 5: {
							contactOnDB.booking.push(message.body);
							await whatsAppClient.sendMessage(message.from, '_¿Cuántos pax? (*aclarar cuantos adultos, menores e infantes*)_');
							contactOnDB.bookingStep += 1;
							break;
						}
						case 6: {
							contactOnDB.booking.push(message.body);
							await whatsAppClient.sendMessage(message.from, '_¿Cuál es el idioma?_');
							contactOnDB.bookingStep += 1;
							break;
						}
						case 7: {
							contactOnDB.booking.push(message.body);
							await whatsAppClient.sendMessage(message.from, '_¿Cuál es el WhatsApp del pasajero?_');
							contactOnDB.bookingStep += 1;
							break;
						}
						case 8: {
							contactOnDB.booking.push(message.body);
							await whatsAppClient.sendMessage(message.from, '_¿Cuál es el medio de pago?_');
							contactOnDB.bookingStep += 1;
							break;
						}
						case 9: {
							contactOnDB.booking.push(message.body);
							await whatsAppClient.sendMessage(message.from, '_¿Observaciones? (ejemplo: discapacidad)_');
							contactOnDB.bookingStep += 1;
							break;
						}
						case 10: {
							contactOnDB.booking.push(message.body);
							const formattedBooking = contactOnDB.booking.join('\n');
							const bookingConfirmation = new Buttons(`_¿Son los datos correctos?_\n\n${formattedBooking}`, [{ body: 'Sí, aceptar' }, { body: 'No, cambiar' }]);
							await whatsAppClient.sendMessage(message.from, bookingConfirmation);
							contactOnDB.bookingStep += 1;
							break;
						}
						case 11: {
							if (upperCasedMessage === 'SÍ, ACEPTAR') {
								contactOnDB.isBooking = false;
								const { isBooked } = await saveBooking(contactOnDB.booking, Reservas, sheets, incomingClient.number, date);
								await whatsAppClient.sendMessage(message.from, isBooked);
							} else if (upperCasedMessage === 'NO, CAMBIAR') {
								contactOnDB.bookingStep = 0;
								await whatsAppClient.sendMessage(message.from, '_¿Cuál es el nombre de la agencia/hotel?_');
							}
							break;
						}
					}
				}

				if (correctAnswer) {
					contactOnDB.step++;
				}
			}
			correctAnswer = false;
			console.log(contactOnDB);
		}
	});
};

module.exports = {
	botMessaging,
};
