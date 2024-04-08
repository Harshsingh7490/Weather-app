import React, { useState } from 'react';

const WeatherForm = ({ onSubmit }) => {
  const [cityName, setCityName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(cityName);
    setCityName(''); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter city name..."
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary ms-2">
          Add City
        </button>
      </div>
    </form>
  );
};

export default WeatherForm;
