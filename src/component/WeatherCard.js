import React from 'react';

const WeatherCard = ({ city, temperature, description, icon }) => {
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <p>Temperature: {temperature}°C</p>
      <p>Description: {description}</p>
      {icon && <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="Weather Icon" />}
    </div>
  );
};

export default WeatherCard;
