import React, { useState, useEffect } from 'react';
import WeatherForm from './component/WeatherForm';
import WeatherCard from './component/WeatherCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {
  const [cities, setCities] = useState(() => {
    const savedCities = localStorage.getItem('weatherCities');
    return savedCities ? JSON.parse(savedCities) : [];
  });

  const [error, setError] = useState(null);
  const apiKey = 'ce6ddf63babafa8633325b650bbf1dd6'; // API key

  useEffect(() => {
    localStorage.setItem('weatherCities', JSON.stringify(cities));
  }, [cities]);

  const handleAddCity = async (cityName) => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('City not found. Please enter a valid city name.');
      }

      const data = await response.json();

      const newCity = {
        name: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon
      };

      setCities([...cities, newCity]);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching data:', error);
    }
  };

  const handleClearCities = () => {
    localStorage.removeItem('weatherCities');
    setCities([]);
  };

  return (
    <div className="container">
      <div className="mt-5 p-4 bg-light rounded">
        <h1 className="text-center mb-4">Weather Dashboard</h1>
        <WeatherForm onSubmit={handleAddCity} />
        {error && <p className="text-danger">{error}</p>}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {cities.map((city, index) => (
            <div key={index} className="col">
              <WeatherCard
                city={city.name}
                temperature={city.temperature}
                description={city.description}
                icon={city.icon}
              />
            </div>
          ))}
        </div>
        <button
          className="btn btn-danger mt-4"
          onClick={handleClearCities}
        >
          Clear Cities
        </button>
      </div>
    </div>
  );
};

export default App;