//Step 1

let weatherCurrentDay = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let whatDay = days[weatherCurrentDay.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let whatMonth = months[weatherCurrentDay.getMonth()];

let whatDate = weatherCurrentDay.getDate();

let whatHour = weatherCurrentDay.getHours();

let whatMinutes = weatherCurrentDay.getMinutes();
if (whatMinutes < 10) {
  whatMinutes = `0${whatMinutes}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${whatDay}, ${whatMonth} ${whatDate}`;

let t;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${whatHour}:${whatMinutes}`;

function weatherForNextDays(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function defaultCity(city) {
  let apiKey = "8542913933d6e9526040ad6e6691ada1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function getForecast(coordinates) {
  let apiKey = "8542913933d6e9526040ad6e6691ada1";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&appid=metric`;
  axios.get(apiUrl).then(weatherForNextDays);
}

function displayWeather(response) {
  document.querySelector("#chosen-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchLocation(position) {
  let apiKey = "8542913933d6e9526040ad6e6691ada1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#weather-engine").value;
  defaultCity(city);
}
let userInfo = document.querySelector("#search-line");
userInfo.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

defaultCity("Kyiv");
