const { Client, LocalAuth, Buttons } = require('whatsapp-web.js');
const QrGenerator = require('qrcode-terminal');
const { botMessaging } = require('./helpers/botMessaging');
const { googleSheetsQueries } = require('./helpers/googleSheetsQueries');
const { googleAuth } = require('./googleAuth');
const express = require('express');

const wsclient = new Client({
	authStrategy: new LocalAuth(),
});

const initializeClient = async () => {
	//wsclient.on('qr', (qr) => console.log(QrGenerator.generate(qr, { small: true })));

	const app = express();

	const PORT = process.env.PORT || 3000;

	app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});

	let qrCode;
	let isLoggedIn;
	app.use(express.static(__dirname + '/public'));
	app.get('/qr', (req, res) => {
		if (!isLoggedIn) {
			res.send(qrCode);
		} else {
			res.send('Sesión activa');
		}
	});
	wsclient.on('qr', (qr) => {
		qrCode = QrGenerator.generate(qr, { small: true });
	});

	wsclient.on('disconnected', async () => {
		isLoggedIn = false;
		await wsclient.initialize();
	});

	wsclient.on('ready', async () => {
		const { sheets, auth } = await googleAuth();

		const { Reservas } = await googleSheetsQueries(sheets, auth);

		isLoggedIn = true;

		botMessaging(wsclient, Buttons, sheets, Reservas);
	});
	await wsclient.initialize();
	console.log('Cliente inicializado');
};

initializeClient();
