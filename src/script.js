// ─────────────────────────────────────────────
// Week 8 ‑ SheCodes Plus — Vanilla Weather App
// Adds 5‑day forecast, cleans duplicates, tidy DOM logic
// ─────────────────────────────────────────────

// 1️⃣ Helpers
function formatDate(date) {
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const hours = date.getHours();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[date.getDay()]} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  const date = new Date(timestamp * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

// 2️⃣ Current‑conditions callback
function refreshWeather(response) {
  const data = response.data;

  // City & description
  document.querySelector("#city").textContent = data.city;
  document.querySelector("#description").textContent =
    data.condition.description;

  // Time (Day HH:MM)
  document.querySelector("#time").textContent = formatDate(
    new Date(data.time * 1000)
  );

  // Humidity & wind
  document.querySelector(
    "#humidity"
  ).textContent = `${data.temperature.humidity}%`;
  document.querySelector("#wind").textContent = `${Math.round(
    data.wind.speed
  )} km/h`;

  // Temperature (°C)
  document.querySelector("#temperature").textContent = Math.round(
    data.temperature.current
  );

  // Icon
  document.querySelector(
    "#icon"
  ).innerHTML = `<img src="${data.condition.icon_url}" alt="${data.condition.description}" class="weather-app-icon" />`;

  // Fetch 5‑day forecast
  getForecast(data.coordinates);
}

// 3️⃣ 5‑day Forecast API call
function getForecast(coords) {
  console.log("📡 Calling forecast API with:", coords);

  const apiKey = "b2a5adcct04b33178913oc335f405433"; // use your key
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coords.longitude}&lat=${coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// 4️⃣ Display forecast cards
function displayForecast(response) {
  console.log("✅ Forecast API response:", response);

  const days = response.data.daily.slice(0, 5); // next 5 days only
  let html = "";

  days.forEach((day) => {
    html += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div class="weather-forecast-icon">
          <img src="${day.condition.icon_url}" alt="${
      day.condition.description
    }" width="42" />
        </div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature"><strong>${Math.round(
            day.temperature.maximum
          )}º</strong></div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>`;
  });

  document.querySelector("#forecast").innerHTML = html;
}

// 5️⃣ City search helper
function searchCity(city) {
  const apiKey = "3df610c9ad6a624314debbt001a9fod7"; // your personal key
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(refreshWeather)
    .catch((error) => {
      console.error("API error:", error);
    });
}

// 6️⃣ Form listener
function handleSearchSubmit(event) {
  event.preventDefault();
  const query = document.querySelector("#search-form-input").value.trim();
  if (query) searchCity(query);
}

document
  .querySelector("#search-form")
  .addEventListener("submit", handleSearchSubmit);

// 7️⃣ Bootstrapping — default city
searchCity("Paris");
