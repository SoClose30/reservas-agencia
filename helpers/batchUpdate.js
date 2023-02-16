const batchUpdate = async (sheet, column, row, content, spreadsheetId, sheetsGoogleAuth) => {
	await sheetsGoogleAuth.spreadsheets.values.batchUpdate({
		spreadsheetId,
		requestBody: {
			data: [
				{
					range: `${sheet}!${column}${row + 1}`,
					values: [content],
				},
			],
			valueInputOption: 'USER_ENTERED',
		},
	});
};

module.exports = { batchUpdate };
