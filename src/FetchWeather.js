import React, { useState } from "react";

function Display() {
  const apiKey = "3cb8cc9e1bcd4dcf91792013240609"; // Make sure this key is valid
  const [value, setValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchWeatherData = (event) => {
    event.preventDefault(); // Prevent form submission from refreshing the page
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${value}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.location) {
          setWeatherData(data); // Set the weather data
          setErrorMessage(null); // Clear any previous error message
        } else {
          setErrorMessage("City not found!!"); // Set error message for city not found
        }
      })
      .catch((error) => {
        setErrorMessage(`Error while fetching data: ${error.message}`); // Set error message
        console.log("Error while fetching data: ", error);
      });
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form id="weather-form" onSubmit={fetchWeatherData}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="city"
          placeholder="Enter city name"
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      <div id="weather-info">
        {errorMessage && <p>{errorMessage}</p>} {/* Display error message if exists */}
        {weatherData && (
          <>
            <h2>
              Weather in {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}
            </h2>
            <p>Day/Night: {weatherData.current.is_day ? "Day" : "Night"}</p>
            <p>Latitude: {weatherData.location.lat}</p>
            <p>Longitude: {weatherData.location.lon}</p>
            <p>Local Time: {weatherData.location.localtime}</p>
            <h3>Current Conditions</h3>
            <p>
              Temperature: {weatherData.current.temp_c} °C / {weatherData.current.temp_f} °F
            </p>
            <p>
              Feels Like: {weatherData.current.feelslike_c} °C / {weatherData.current.feelslike_f} °F
            </p>
            <p>Weather Condition: {weatherData.current.condition.text}</p>
            <img src={`https:${weatherData.current.condition.icon}`} alt={weatherData.current.condition.text} />
            <p>
              Wind: {weatherData.current.wind_mph} mph / {weatherData.current.wind_kph} kph, Direction:{" "}
              {weatherData.current.wind_dir} ({weatherData.current.wind_degree}°)
            </p>
            <p>Pressure: {weatherData.current.pressure_mb} mb</p>
            <p>Precipitation: {weatherData.current.precip_mm} mm</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Cloud Cover: {weatherData.current.cloud}%</p>
            <p>Dew Point: {weatherData.current.dewpoint_c} °C</p>
            <p>Visibility: {weatherData.current.vis_km} km</p>
            <p>UV Index: {weatherData.current.uv}</p>
            <p>
              Wind Gusts: {weatherData.current.gust_mph} mph / {weatherData.current.gust_kph} kph
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Display;