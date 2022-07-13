//Step 1

let weatherCurrentDay = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
currentDate.innerHTML = `${whatDay}, ${whatMonth} ${whatDate}, ${whatHour}:${whatMinutes}`;

//Challenge 2

function defaultCity(city) {
  let apiKey = "8542913933d6e9526040ad6e6691ada1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
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
