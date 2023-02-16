const modifyBooking = async (booking, column, newData, Reservas) => {
	for (let bookingIndex = 0; bookingIndex < Reservas.length; bookingIndex++) {
		if (Reservas[bookingIndex][1] === booking[0] && Reservas[bookingIndex][4] === booking[1]) {
		}
	}
};

module.exports = {
	modifyBooking,
};
