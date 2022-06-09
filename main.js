const button = document.getElementById('fetch-button');

button.addEventListener('click', (event) => {
  event.preventDefault();
  const requestedCity = document.getElementById('requested-city');
  const city = requestedCity.value;
  const fetchForm = document.getElementById('fetch-form');

  getCity(city);
  getWeather(city);
  fetchForm.reset();
});

const convertForm = document.getElementById('convert-form');

convertForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const convertToC = document.getElementById('to-c');
  const convertToF = document.getElementById('to-f');
  const numToConvert = document.getElementById('temp-to-convert').value;
  const result = document.getElementById('calculation');

  if (convertToC.checked) {
    result.textContent = `${((numToConvert - 32) / 1.8).toFixed(2)}°C`;
  } else if (convertToF.checked) {
    result.textContent = `${(numToConvert * 1.8 + 32).toFixed(2)}°F`;
  } else {
    result.textContent = 'No unit of temperature was selected.';
  }
  convertForm.reset();
});

const BASE_URL = `http://api.weatherapi.com/v1/forecast.json?key=48a24c356d6540ab917183331220604`;

function getWeather(city) {
  fetch(`${BASE_URL}&q=${city}&days=3&aqi=no&alerts=yes`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.hasOwnProperty("error")){
        getError(response)
      }
      console.log(response)
      getWeatherInfo(response)
      return response
    })
    .then(getSearches)
    .catch(console.log)
}

const getError = (err) => {
  console.log(err, err.error.message)
  if (err.error.code === 1003){
    headingCity.textContent = "Please provide a location"
  } else {
    headingCity.textContent = err.error.message;
  }

  const weatherInfo = document.querySelectorAll("p")
  for (let p of weatherInfo){
    p.textContent = ''
  }

  const weatherIcon = document.querySelector("img")
  weatherIcon.setAttribute("src", '')
  weatherIcon.setAttribute('alt', '')
};

function getPreviousWeather(city) {
  fetch(`${BASE_URL}&q=${city}&days=3&aqi=no&alerts=yes`)
    .then((response) => {
      return response.json();
    })
    .then(getCity(city))
    .then(getWeatherInfo);
}

const headingCity = document.getElementById('city');

const getCity = (city) => {
  const placeholderP = document.getElementById('placeholder');

  placeholderP.textContent = '';
  headingCity.textContent = city;
};

function getWeatherInfo(response) {
  const forecast = response.forecast.forecastday;
  const area = response.location.name
  const region = response.location.region;
  const country = response.location.country;
  const current = response.current;

  const areaP = document.getElementById('area');
  areaP.innerHTML = `<strong>Area: </strong>
  <span>${area}</span>`;

  const regionP = document.getElementById('region');
  regionP.innerHTML = `<strong>Region: </strong>
  <span>${region}</span>`;

  const countryP = document.getElementById('country');
  countryP.innerHTML = `<strong>Country: </strong>
<span>${country}</span>`;

  const currentlyP = document.getElementById('currently');
  currentlyP.innerHTML = `<strong>Currently: </strong>
  <span>Feels Like ${Math.round(current.feelslike_f)}°F`;

  const chanceOfSunshine = document.getElementById('chanceOfSunshine');
  chanceOfSunshine.innerHTML = `<strong>Currently: </strong>${current.condition.text}`;

  const chanceOfRain = document.getElementById('chanceOfRain');
  chanceOfRain.innerHTML = `<strong>Chance of Rain: </strong>${forecast[0].day.daily_chance_of_rain}`;

  const chanceOfSnow = document.getElementById('chanceOfSnow');
  chanceOfSnow.innerHTML = `<strong>Chance of Snow: </strong>${forecast[0].day.daily_chance_of_snow}`;

  const weatherIcon = document.querySelector('img');

  weatherIcon.setAttribute('src', `http:${current.condition.icon}`)
  weatherIcon.setAttribute('alt', 'weather icon')

  const today = document.getElementById('todayForecast');
  today.textContent = 'Today';

  const avgTemp = document.getElementById('avgTemp');
  avgTemp.innerHTML = `<strong>Average Temperature: </strong><span>${Math.round(forecast[0].day.avgtemp_f)}°F</span>`;

  const maxTemp = document.getElementById('maxTemp');
  maxTemp.innerHTML = `<strong>Max Temperature: </strong><span>${Math.round(forecast[0].day.maxtemp_f)}°F</span>`;

  const minTemp = document.getElementById('minTemp');
  minTemp.innerHTML = `<strong>Min Temperature: </strong><span>${Math.round(forecast[0].day.mintemp_f)}°F</span>`;

  const tomorrow = document.getElementById('tomorrowForecast');
  tomorrow.textContent = 'Tomorrow';

  const avgTempTomorrow = document.getElementById('avgTempTomorrow');
  avgTempTomorrow.innerHTML = `<strong>Average Temperature: </strong><span>${Math.round(forecast[1].day.avgtemp_f)}°F</span>`;

  const maxTempTomorrow = document.getElementById('maxTempTomorrow');
  maxTempTomorrow.innerHTML = `<strong>Max Temperature: </strong><span>${Math.round(forecast[1].day.maxtemp_f)}°F</span>`;

  const minTempTomorrow = document.getElementById('minTempTomorrow');
  minTempTomorrow.innerHTML = `<strong>Min Temperature: </strong><span>${Math.round(forecast[1].day.mintemp_f)}°F</span>`;

  const dayAfterTomorrow = document.getElementById('dayAfterTomorrowForecast');
  dayAfterTomorrow.textContent = 'Day After Tomorrow';

  const avgTempAfterTomorrow = document.getElementById('avgTempAfterTomorrow');
  avgTempAfterTomorrow.innerHTML = `<strong>Average Temperature: </strong><span>${Math.round(forecast[2].day.avgtemp_f)}°F</span>`;

  const maxTempAfterTomorrow = document.getElementById('maxTempAfterTomorrow');
  maxTempAfterTomorrow.innerHTML = `<strong>Max Temperature: </strong><span>${Math.round(forecast[2].day.maxtemp_f)}°F</span>`;

  const minTempAfterTomorrow = document.getElementById('minTempAfterTomorrow');
  minTempAfterTomorrow.innerHTML = `<strong>Min Temperature: </strong><span>${Math.round(forecast[2].day.mintemp_f)}°F</span>`;
}

const getSearches = (response) => {
  const ul = document.getElementById('searchHistory');
  const searchP = document.getElementById('searchPlaceholder');
  searchP.textContent = '';

  const li = document.createElement('li');
  const city = headingCity.textContent
  li.innerHTML = `<a href="#">${city}</a><span> - ${response.current.feelslike_f}°F</span>`;

  li.addEventListener('click', (event) => {
    event.preventDefault();
    getPreviousWeather(city);
  });

  ul.append(li);
};