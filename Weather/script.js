//Constants
const API_KEY = "dd16bf02318b36108fbae6b61720d4e8";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const ICONS_PATH = "/weather-app-img/images/";

//DOM Elements
const weatherIcon = document.querySelector(".weather-icon");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const errorDisplay = document.querySelector(".error");
const weatherDisplay = document.querySelector(".weather");

//UI
const updateUI = (data) => {
    const city = document.querySelector(".city");
    const temp = document.querySelector(".temp");
    const humidity = document.querySelector(".humidity");
    const wind = document.querySelector(".wind");

    city.textContent = data.name;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} km/h`;

    const weatherConditions = {
        Clouds: "Clouds.png",
        Clear: "clear.png",
        Rain: "rain.png",
        Drizzle: "drizzle.png",
        Mist: "mist.png",
    };

    weatherIcon.src = ICONS_PATH + (weatherConditions[data.weather[0].main] || "default.png");
    weatherDisplay.style.display = "block";
    errorDisplay.style.display = "none";
};

//API
const fetchWeatherData = async (city) => {
    try {
        const response = await fetch(`${API_URL}${city}&appid=${API_KEY}`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

// checkWeather
const checkWeather = async (city) => {
    try {
        const data = await fetchWeatherData(city);
        updateUI(data);
    } catch (error) {
        weatherDisplay.style.display = "none";
        errorDisplay.style.display = "block";
    }
};

// EventListener
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});