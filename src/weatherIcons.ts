export const getWeatherEmoji = (description: string) => {
    switch (description.toLowerCase()) {
        case 'ясно':
            return '☀️';
        case 'облачно с прояснениями':
            return '⛅️';
        case 'облачно':
            return '☁️';
        case 'переменная облачность':
            return '☁️';
        case 'небольшая облачность':
            return '☁️';
        case 'дождь':
            return '🌧️';
        case 'гроза':
            return '⛈️';
        case 'снег':
            return '❄️';
        case 'туман':
            return '🌫️';
        default:
            return '🌈';
    }
};
