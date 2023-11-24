let time = new Date();

let hour = time.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = time.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let month = time.getMonth();
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
let day = time.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = days[day];
let date = time.getDate();

let finish = document.querySelector("h6");
finish.innerHTML = `${weekday} ${hour}:${minute}`;

function display(event) {
  event.preventDefault();
  let spain = document.querySelector("h2");
  let city = document.querySelector("#city");
  spain.innerHTML = `${city.value}`;
  let place = city.value;
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(display);
  function display(response) {
    console.log(response);
    console.log(response.data.main.temp);
    console.log(response.data.weather.main);
    let spot = Math.round(response.data.main.temp);
    let temp = document.querySelector("#temp");
    temp.innerHTML = `${spot}°C`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;
    let wind = document.querySelector("#wind");
    wind.innerHTML = `${response.data.wind.speed}km/hr`;
  }
}
let form = document.querySelector("#searchCity");
form.addEventListener("submit", display);

function showTemperature(response) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${response.data.name}`;
  let temp = document.querySelector("#temp");
  let currentTemp = Math.round(response.data.main.temp);
  temp.innerHTML = `${currentTemp}°C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `${response.data.wind.speed}km/hr`;
}

function displayTemp(position) {
  let apiKey = "b40b135798f82a05aed08769f9275f50";
  let apiUrls = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrls).then(showTemperature);
}

function displayCurrentLocation(position) {
  navigator.geolocation.getCurrentPosition(displayTemp);
}

let currentPlace = document.querySelector("button");
currentPlace.addEventListener("click", displayCurrentLocation);
