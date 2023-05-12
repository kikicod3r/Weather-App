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
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2">
            <div class="weather-forcast-date">${day}</div>
            <img src="" alt="Icon" />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-high"> 75°</span>
              <span class="weather-forecast-temperature-low">56°</span>
            </div>
          </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "a710bd8bd76400c9658ef649d9e81728";
  let latitude = coordinates.lat;
  let longitude = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
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

function defaultCity(city) {
  let units = "imperial";
  let apiKey = "a710bd8bd76400c9658ef649d9e81728";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentCityWeather);
}
defaultCity("Chicago");

function searchBox(event) {
  event.preventDefault();

  let citySearchEntry = document.querySelector("#city-search-box");
  defaultCity(citySearchEntry.value);
}

let submittedSearch = document.querySelector("#search-form");

submittedSearch.addEventListener("submit", searchBox);

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
