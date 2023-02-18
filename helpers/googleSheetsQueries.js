const googleSheetsQueries = async (sheets, auth) => {
	const customersList = await sheets.spreadsheets.values.get({
		spreadsheetId: '1drG4DcZhUWgygvmqSq8JGM-hYAVk2WchOkDMevevCl8',
		auth,
		range: 'Reservas!A2:N51000',
		valueRenderOption: 'FORMATTED_VALUE',
	});

	return {
		Reservas: customersList.data.values,
	};
};

module.exports = {
	googleSheetsQueries,
};
