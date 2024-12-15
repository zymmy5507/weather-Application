// Replace 'your_api_key_here' with your actual API key
const apiKey = "769e78e5d0ba54c62574e74d0055aecf";
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherResult = document.getElementById("weatherResult");
const cityNameElem = document.getElementById("cityName");
const weatherIconElem = document.getElementById("weatherIcon");
const temperatureElem = document.getElementById("temperature");
const descriptionElem = document.getElementById("description");

getWeatherBtn.addEventListener("click", () => {
  const cityInput = document.getElementById("cityInput").value.trim();
  if (cityInput === "") {
    alert("Please enter a city name!");
    return;
  }

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  fetch(apiURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      alert(error.message);
      weatherResult.classList.add("hidden"); // Hide result on error
    });
});

function displayWeather(data) {
  const { name, main, weather, wind } = data;
  const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  // Update HTML content
  cityNameElem.textContent = `City: ${name}`;
  weatherIconElem.src = weatherIcon;
  weatherIconElem.alt = weather[0].description;
  temperatureElem.textContent = `Temperature: ${main.temp}°C (Feels like: ${main.feels_like}°C)`;
  descriptionElem.innerHTML = `
    <p>Condition: ${weather[0].description}</p>
    <p>Humidity: ${main.humidity}%</p>
    <p>Wind Speed: ${wind.speed} m/s</p>
  `;

  // Add fade-in animation
  weatherResult.classList.remove("hidden");
  weatherResult.classList.add("fade-in");
}
