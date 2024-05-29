import axios from 'axios';

const API_KEY = '25999bee65ede52fa3bf0b01d3ce47d0';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
* Получает информацию о погоде для заданной точки на карте по координатам.
*
* @param {number} lat - Широта точки на карте.
* @param {number} lon - Долгота точки на карте.
* @return {Promise<{
*   location: string;
*   temperature: string;
*   temperatureFeelsLike: string;
*   humidity: string;
*   description: string;
*   wind: string;
* }>} Информация о погоде для заданной точки на карте.
*/
export const getWeatherByLocation = async (lat: number, lon: number) => {
  const response = await axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`);
  console.log(response.data)
  return {
    location: response.data.name,
    temperature: `${response.data.main.temp} °C`,
    temperatureFeelsLike: `${response.data.main.feels_like} °C`,
    humidity: `${response.data.main.humidity} %`,
    description: response.data.weather[0].description,
    wind: `${response.data.wind.speed} м/с`,
  };
};

/**
* Получает информацию о погоде для заданного города.
*
* @param {string} city - Название города.
* @return {Promise<{
*   location: string;
*   temperature: string;
*   temperatureFeelsLike: string;
*   humidity: string;
*   description: string;
*   wind: string;
* }>} - Информация о погоде для города.
* @throws {Error} - Если город не найден.
*/
export const getWeatherByCity = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`);
    return {
      location: response.data.name,
      temperature: `${response.data.main.temp} °C`,
      temperatureFeelsLike: `${response.data.main.feels_like} °C`,
      humidity: `${response.data.main.humidity} %`,
      description: response.data.weather[0].description,
      wind: `${response.data.wind.speed} м/с`,
    };
  } catch (error) {
    throw new Error('City not found');
  }
};
