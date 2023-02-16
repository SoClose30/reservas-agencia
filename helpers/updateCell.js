const updateCell = async (sheet, column, row, content, spreadsheetId, sheetsGoogleAuth) => {
	await sheetsGoogleAuth.spreadsheets.values.update({
		spreadsheetId,
		range: `${sheet}!${column}${row + 1}`,
		requestBody: { values: [[content]] },
		valueInputOption: 'USER_ENTERED',
	});
};

module.exports = { updateCell };
