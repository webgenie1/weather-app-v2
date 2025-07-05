function refreshWeather(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  let iconElement = document.querySelector("#icon");
  let iconUrl = response.data.condition.icon_url;
  iconElement.setAttribute("src", iconUrl);
  iconElement.setAttribute("alt", response.data.condition.description);

  function refreshWeather(response) {
    // ── Debug / reference block ───────────────────────────────
    console.log("📦 Full response:", response);
    console.log("🌤 Icon URL:", response.data.condition.icon_url);
    console.log("📝 Description:", response.data.condition.description);
    console.log("💨 Wind (km/h):", response.data.wind.speed);
    // ──────────────────────────────────────────────────────────

    // City
    document.querySelector("#city").innerHTML = response.data.city;

    // Temperature
    const temp = Math.round(response.data.temperature.current);
    document.querySelector("#temperature").innerHTML = temp;

    // Details line
    document.querySelector(".weather-app-details").innerHTML = `
    ${response.data.condition.description}<br />
    Humidity: <strong>${response.data.temperature.humidity}%</strong>,
    Wind: <strong>${Math.round(response.data.wind.speed)} km/h</strong>
  `;

    // Icon
    const iconEl = document.querySelector("#icon");
    iconEl.setAttribute("src", response.data.condition.icon_url);
    iconEl.setAttribute("alt", response.data.condition.description);
  }
}

function searchCity(city) {
  let apiKey = "3df610c9ad6a624314debbt001a9fod7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  console.log("🔗 Correctly built URL:", apiUrl);

  axios
    .get(apiUrl)
    .then(function (response) {
      console.log("✅ Axios call succeeded!");
      console.log("📦 Full Axios response:", response);
      refreshWeather(response);
    })
    .catch(function (error) {
      console.log("❌ API error:", error);
    });
}
function displayForecast(response) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";

  // SheCodes API returns up to 6 daily objects in response.data.daily
  response.data.daily.forEach(function (dayData, index) {
    if (index < 5) {
      // show 5 days
      const date = new Date(dayData.time * 1000);
      forecastHTML += `
        <div class="col text-center">
          <div class="weather-forecast-date">${days[date.getDay()]}</div>
          <img
            src="${dayData.condition.icon_url}"
            alt="${dayData.condition.description}"
            width="46"
          />
          <div class="weather-forecast-temp">
            <span class="max">${Math.round(
              dayData.temperature.maximum
            )}°</span> /
            <span class="min">${Math.round(dayData.temperature.minimum)}°</span>
          </div>
        </div>
      `;
    }
  });

  document.querySelector("#forecast").innerHTML = forecastHTML;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Load default city
searchCity("Paris");
