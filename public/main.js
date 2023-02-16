const qrcodeElement = document.querySelector('.qrcode');

setInterval(async () => {
	const res = await fetch('https://reservas-agencia.onrender.com/qr')
		.then((response) => response)
		.then((data) => {
			return data.text();
		});

	if (!res) {
		qrcodeElement.innerHTML = 'Cargando QR...';
	} else {
		qrcodeElement.innerHTML = res;
	}
}, 3000);
