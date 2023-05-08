let now = new Date();

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let currentDayDisplay = document.querySelector("#current-day-display");
currentDayDisplay.innerHTML = `${day}`;

let currentTimeDisplay = document.querySelector("#current-time-display");
currentTimeDisplay.innerHTML = `${hours}:${minutes}`;

function clickFahrenheit(event) {
  event.preventDefault();

  let degreesFahrenheit = document.querySelector(
    "#current-temperature-display"
  );
  degreesFahrenheit.innerHTML = "50°";
}
let degreesFah = document.querySelector("#degrees-fahrenheit");
degreesFah.addEventListener("click", clickFahrenheit);

function clickCelcius(event) {
  event.preventDefault();

  let degreesCelcius = document.querySelector("#current-temperature-display");
  degreesCelcius.innerHTML = "10°";
}
let degreesCelcius = document.querySelector("#degrees-celcius");
degreesCelcius.addEventListener("click", clickCelcius);

function showCurrentCityWeather(response) {
  document.querySelector("#current-city-display").innerHTML =
    response.data.name;

  document.querySelector("#current-temperature-display").innerHTML = Math.round(
    response.data.main.temp
  );
  document
    .querySelector("#current-weather-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("#current-weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function defaultCity(city) {
  let units = "imperial";
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentCityWeather);
}

function searchBox(event) {
  event.preventDefault();

  let citySearchEntry = document.querySelector("#city-search-box");
  defaultCity(citySearchEntry.value);
}

let submittedSearch = document.querySelector("#search-form");

submittedSearch.addEventListener("submit", searchBox);

defaultCity("Chicago");

function showTemperature(response) {
  let currentTemperature = document.querySelector(
    "#current-temperature-display"
  );

  let temperature = Math.round(response.data.main.temp);

  currentTemperature.innerHTML = `${temperature}`;
}

function getCityLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentCityWeather);
}

let currentCityButton = document.querySelector("button");

currentCityButton.addEventListener("click", getCityLocation);
