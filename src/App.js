import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [unit, setUnit] = useState('C');
  const [city, setCity] = useState('New York');
  const [weatherData, setWeatherData] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null); // New state variable

  const apiKey = 'b5607adbf6msh4ec829d9f6aa0dbp131e0bjsn227e0b623fcd';
  const apiHost = 'weatherapi-com.p.rapidapi.com';

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const fetchData = () => {
    const apiUrl = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}&units=${unit}`;

    axios
      .get(apiUrl, {
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': apiHost
        }
      })
      .then(response => {
        setWeatherData(response.data);

        // Extract additional weather information and update the state
        const additionalInfo = {
          humidity: response.data.current.humidity,
          // Add more properties as needed
        };
        setWeatherInfo(additionalInfo);
      })
      .catch(error => {
        console.error("Error fetching weather data: ", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [city, unit]);

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div>
        <button onClick={toggleUnit}>
          Toggle Temperature Unit ({unit === 'C' ? 'Fahrenheit' : 'Celsius'})
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchData}>Search</button>
      </div>
      {weatherData && weatherInfo && (
        <div>
          <h2>Current Weather in {weatherData.location.name}, {weatherData.location.country}</h2>
          <p>Temperature: {weatherData.current[`temp_${unit.toLowerCase()}`]}°{unit}</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <p>Humidity: {weatherInfo.humidity}%</p>
          {/* Add more weather information as needed */}
        </div>
      )}
    </div>
  );
}

export default App;
