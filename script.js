// DOM elements
const searchButton = document.getElementById("searchButton");
const closeButton = document.getElementById("closeButton");
const cityInput = document.getElementById("cityInput");
const errorMessageElement = document.getElementById("errorMessage");
const weatherResultElement = document.getElementById("weatherResult");

// API key and base URL
const API_KEY = "4f672da85c911bcb2a053921034026d6";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Event listeners
searchButton.addEventListener("click", handleSearch);
closeButton.addEventListener("click", resetApp);

cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

// Reset the Weather App
function resetApp() {
  // Clear input field and hide elements
  cityInput.value = "";
  weatherResultElement.classList.add("hidden");
  errorMessageElement.classList.add("hidden");
}

function triggerConfetti() {
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const duration = 5000;
  const animationEnd = Date.now() + duration;

  const interval = setInterval(() => {
    if (Date.now() > animationEnd) {
      clearInterval(interval);
      return;
    }

    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(40, 60),
      particleCount: randomInRange(20, 50),
      startVelocity: randomInRange(30, 40),
      ticks: randomInRange(80, 150),
      gravity: randomInRange(0.8, 1.2),
      scalar: randomInRange(0.8, 1.0),
      shape: "square",
      origin: { x: Math.random(), y: randomInRange(0.6, 0.8) },
      colors: [
        "#000000",
        "#333333",
        "#666666",
        "#999999",
        "#C0C0C0",
        "#FFFFFF",
      ],
      disableForReducedMotion: true,
    });
  }, 200);
}

function handleSearch() {
  const cityName = cityInput.value.trim();

  if (!cityName) {
    showError("Please enter a city name.");
    return;
  }

  const apiUrl = `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;
  fetchWeatherData(apiUrl);
  cityInput.value = "";
}

function fetchWeatherData(url) {
  axios
    .get(url)
    .then((response) => {
      hideError();
      displayWeather(response.data);
      triggerConfetti();
    })
    .catch((error) => {
      showError("City not found. Please try again.");
    });
}

function displayWeather(data) {
  document.getElementById(
    "cityName"
  ).textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temperature").textContent = `${Math.round(
    data.main.temp
  )}°C`;
  document.getElementById("weatherDescription").textContent =
    data.weather[0].description;
  weatherResultElement.classList.remove("hidden");
}

// Show Error
function showError(message) {
  errorMessageElement.textContent = message;
  errorMessageElement.classList.remove("hidden");
  weatherResultElement.classList.add("hidden");
}

// Hide Error
function hideError() {
  errorMessageElement.classList.add("hidden");
}
