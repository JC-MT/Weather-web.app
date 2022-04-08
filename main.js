const BASE_URL = `http://api.weatherapi.com/v1/forecast.json?key=48a24c356d6540ab917183331220604`;

const input = document.querySelector('input');
const days = document.querySelector("#days")
const button = document.querySelector('button');
const form = document.querySelector('form');
const body = document.querySelector('body');
const headingError = document.createElement("h2")

// let string = "2022-04-07 12:30"
// let date = string.split(" ")[0]
// let time = string.split(" ")[1]
// let formatedDate = date.split("-").reverse().join("-")
// console.log(formatedDate)
// let hour = time.split(":")[0]
// let min = time.split(":")[1]
// if(hour < 12){
//     time = `${hour}:${min} am`
// } else if (hour = 12){
//     time = `${hour}:${min} pm`
// } else {
//     time = `${hour - 12}:${min} pm`
// }
// console.log(time)


const getWeather = (result) => {
  const location = result.location;
  const forecast = result.forecast;
  const currentWeather = result.current;

  const name = document.querySelector("#current_name")
  console.log(result)
  name.textContent = `${location.name}, ${location.country}`

  const icon = document.querySelector("#current_icon")
  const temp = document.querySelector("#current_temp")
  const currentInfo = document.querySelector("#current_desc")
  const tempRange = document.querySelector("#current_temp_range")

  icon.setAttribute("src", "https:" + currentWeather.condition.icon)
  temp.textContent = `${currentWeather.temp_f}°`
  currentInfo.textContent = currentWeather.condition.text
  tempRange.textContent = `H:${(forecast.forecastday[0].day.maxtemp_f).toFixed()}° L:${(forecast.forecastday[0].day.mintemp_f).toFixed()}°`;
    // let dateTime = currentWeather.last_updated


  const alert = result.alerts


};

const getError = (err) => {
    headingError.textContent = err.error.message;
    body.append(headingError)
    console.log(err)
};

button.addEventListener('click', (event) => {
  event.preventDefault();
  let city = input.value;
  let numOfDays = days.value;
  fetch(`${BASE_URL}&q=${city}&days=${numOfDays}&aqi=no&alerts=yes`)
    .then((response) => {
      if (!response.ok) 
      throw response;
      return response.json();
    })
    .then(getWeather)
    .catch((err) => {
      err.json()
      .then(getError)
      });
  form.reset();
});

// main.querySelectorAll('*').forEach(node => node.remove());

