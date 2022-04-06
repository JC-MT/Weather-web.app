const BASE_URL = `http://api.weatherapi.com/v1/current.json?key=48a24c356d6540ab917183331220604&q=`

const input = document.querySelector("input") 
const button = document.querySelector("button")
const form = document.querySelector("form")

button.addEventListener("click", (event) => {
    let city = input.value
    event.preventDefault();
    
    fetch(`${BASE_URL}${city}&aqi=no`).then((response) => {
        return response.json();
    }).then((result) => {
        console.log(result)
        console.log(result.location)
        console.log(result.current)
    }).catch(console.log)
    form.reset()
})
