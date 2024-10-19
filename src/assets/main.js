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

function injectinfo(country, capital, temp_c, temp_f, feels_c, feels_f, humid, localtime, is_day){
	const where = document.getElementById('content')
	where.innerHTML = 
	`<h2>${country}</h2>
        <div class="city-time">
            <h3>Capital: <span>${capital}</span></h3>
            
        </div>

        <p>Temperature: <span>${temp_f}°F - ${temp_c}°C</span></p>
        <p>Feels Like: <span>${feels_f}°F - ${feels_c}°C</span></p>
        <p>Humidity: <span>${humid}%</span></p>
        <div class="time">
            <p>Local Time: <span>${localtime}</span></p>

			${is_day === 1 ? 
				`<i class="fa-solid fa-sun">` : 
				`</i><i class="fa-solid fa-moon"></i>`
			}
			
		</div>`
}

function getWeather(name) {
	const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${name}`
	return url
}

(async () => {
	try {
		const dataCountries = await fetchData(urlCountries)
		dataCountries.data.forEach(element => {
			if (!regex.test(element.capital) && element.capital !== '') {
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



checkBtn.addEventListener('click', () => {
	try {
		const cityName = capOps.value.split(' ').join('_')
		fetchData(getWeather(cityName))
		.then(response => {
			injectinfo(response.location.country, response.location.name, response.current.temp_c, response.current.temp_f, 
				response.current.feelslike_c, response.current.feelslike_f, response.current.humidity, 
				response.location.localtime, response.current.is_day)
			// console.log(response.current.temp_c, response.current.temp_f, response.current.humidity, response.current.feelslike_c, response.current.feelslike_f, response.current.is_day)
			// console.log(response.location.name, response.location.country, response.location.localtime)
		})
	} catch (error) {
		console.log(error)
	}

})

