const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=Minsk`;
const urlCountries = `https://countriesnow.space/api/v0.1/countries/capital`
const capOps = document.getElementById('capitals')
const checkBtn = document.getElementById('check-btn')
const regex = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '904c39fee3msh6db6cfa14febf50p19bc05jsnd2e2829adc82',
		'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
	}
};


async function fetchData(urlApi) {
	const response = await fetch(urlApi, options);
	const result = await response.json();
	return result
}

(async () => {
	try {
		const dataCountries = await fetchData(urlCountries)
		dataCountries.data.forEach(element => {
			if (!regex.test(element.capital) && element.capital !== '') {
				console.log(element)
				const capital = document.createElement('option')
				capital.value = element.capital
				capital.innerHTML = element.capital + ' - ' + element.name
				capOps.appendChild(capital)
			}
		});
	} catch (error) {
		console.log(error)
	}
})()

async function getWeather(name) {
	const data = await fetchData(`https://weatherapi-com.p.rapidapi.com/current.json?q=${name}`, options)
	console.log(data)
	return data
}

checkBtn.addEventListener('click', () => {
	const city = capOps.value.split(' ').join('_')
	showResults(getWeather(city))
})

function showResults (data){
	
}
