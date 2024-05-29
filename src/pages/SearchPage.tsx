import React, { useState } from 'react';
import { getWeatherByCity } from '../services/weatherService';
import { getWeatherEmoji } from '../weatherIcons';
import '../styles/SearchPage.scss';

const SearchPage: React.FC = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    try {
      const weatherData = await getWeatherByCity(city);
      setWeather(weatherData);
      setError(null); // Очистка ошибки, если запрос успешен
    } catch (err) {
      setError('Такого города нет. Попробуйте еще раз.');
      setWeather(null); // Очистка предыдущего результата, если ошибка
    }
  };

  return (
    <div className="search-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Введите город"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Поиск</button>
      </div>
      {error && <div className="error">{error}</div>}
      {weather && (
        <div className="weather-result">
          <h2>{weather.location}</h2>
          <div className="weather-icon">
            {getWeatherEmoji(weather.description)}
          </div>
          <div className="current-temp">{weather.temperature}</div>
          <div className="additional-info">
            <p>Ощущается как: {weather.temperatureFeelsLike}</p>
            <p>Влажность: {weather.humidity}</p>
            <p>Описание: {weather.description}</p>
            <p>Ветер: {weather.wind}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
