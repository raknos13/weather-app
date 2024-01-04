const apiKey = "4816cdd5f8b95dc81bdddd5c977cd8f1";

const cityInput = document.getElementById("city-name");
let cityName = cityInput.value;
console.log(cityName)
const submitButton = document.getElementById("submit-button");

console.log(cityInput, submitButton);

submitButton.addEventListener("click", function() {
    getLocation(cityName);
});

function getLocation(cityName) {

    console.log(cityName);

    if (cityName.trim() === "") {
        alert("Enter a city name.");
    }
    const urlCoordinateFetch = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
   
    fetch(urlCoordinateFetch)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response failed');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            getWeather(data);
        })
        .catch(error => {
            console.error('Error: ', error);
        });

}

function getWeather(data) {
    let lat = data[0].lat.toPrecision(4);
    let lon = data[0].lon.toPrecision(4);
    console.log(`lat = ${lat}\nlon = ${lon}`);
    
    const urlGetWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`; 
    
    fetch(urlGetWeather)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response failed');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error: ', error);
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementsByClassName("weather-info")[0];
    console.log(weatherInfo);
    const temp = data.main.temp;
    const descr = data.weather[0].description;
    console.log(temp, descr, cityName);
    const weatherHTML = `
        <h3>${cityName}</h3>   
        <p>Temperature: ${temp}°C</p>
        <p>Description: ${descr}</p>
    `;
    weatherInfo.innerHTML = weatherHTML;
    cityName = "";
}