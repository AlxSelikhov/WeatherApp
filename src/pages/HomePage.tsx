import React, { useEffect, useState } from 'react';
import { getWeatherByLocation } from '../services/weatherService';
import { getWeatherEmoji } from '../weatherIcons';
import '../styles/HomePage.scss';

const HomePage: React.FC = () => {
    const [weather, setWeather] = useState<any>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const weatherData = await getWeatherByLocation(position.coords.latitude, position.coords.longitude);
                setWeather(weatherData);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeather();
    }, []);

    if (!weather) return <div>Loading...</div>;

    return (
        <div className="home-page">
            <div className="main-content">
                <div className="current-weather">
                    <h1>{weather.location}</h1>
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
            </div>
        </div>
    );
};

export default HomePage;
