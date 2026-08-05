document.addEventListener("submit", async (event) => {
	event.preventDefault();

	const formData = new FormData(event.target)
	const waluta = formData.get('waluta')
	const kwota = Number(formData.get('kwota'))

	const response = await fetch(`http://cw-api.mysliwczykrafal.pl/currencies/${waluta}/`, {headers: {"Content-Type": "application/json"}})
	if (response.status != 200) {
		console.error("Nie można pobrać danych")
	} else {
		const dane = await response.json()

		// ask > bid
		const ask = dane.ask
		const bid = dane.bid

		document.querySelector('#form-output').style = ""

		document.querySelector('#aktualizacja').textContent = `Ostatnia aktualizacja: ${(new Date(dane.fetchDate)).toLocaleString('pl-PL', {dateStyle: "full", timeStyle: "short", timezone: "Europe/Warsaw"})}`

		document.querySelector('#kurs-ask').textContent = `Ask: ${ask}`
		document.querySelector('#kurs-bid').textContent = `Bid: ${bid}`

		document.querySelector('#zakup').textContent = `${kwota} ${waluta}`
		document.querySelector('#zakup-wynik').textContent = `${(kwota*ask).toFixed(2)} PLN`
		document.querySelector('#zakup-2').textContent = `${kwota} PLN`
		document.querySelector('#zakup-wynik-2').textContent = `${(kwota/bid).toFixed(2)} ${waluta}`

		document.querySelector('#sprzedaz').textContent = `${kwota} ${waluta}`
		document.querySelector('#sprzedaz-wynik').textContent = `${(kwota*bid).toFixed(2)} PLN`
		document.querySelector('#sprzedaz-2').textContent = `${kwota} PLN`
		document.querySelector('#sprzedaz-wynik-2').textContent = `${(kwota/ask).toFixed(2)} ${waluta}`
	}


})
