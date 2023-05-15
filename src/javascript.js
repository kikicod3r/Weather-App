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

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
            <div class="weather-forcast-date">${formatDate(
              forecastDay.dt
            )}</div>
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="Icon" />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-high"> ${Math.round(
                forecastDay.temp.max
              )}° |</span>
              <span class="weather-forecast-temperature-low">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "a710bd8bd76400c9658ef649d9e81728";
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let currentTemperature = document.querySelector(
    "#current-temperature-display"
  );

  let temperature = Math.round(response.data.main.temp);

  currentTemperature.innerHTML = `${temperature}`;
}

function defaultCity(city) {
  let units = "imperial";
  let apiKey = "a710bd8bd76400c9658ef649d9e81728";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentCityWeather);
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

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

  getForecast(response.data.coord);
}

function searchBox(event) {
  event.preventDefault();

  let citySearchEntry = document.querySelector("#city-search-box");
  defaultCity(citySearchEntry.value);
}

let submittedSearch = document.querySelector("#search-form");

submittedSearch.addEventListener("submit", searchBox);

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

defaultCity("Chicago");
