import { WeatherForecast } from '../types';
import { addDays, format } from 'date-fns';

// Mock weather data for the next 7 days
export const generateMockWeatherData = (): WeatherForecast[] => {
  const conditions = ['Sunny', 'Clear', 'Cloudy', 'Rain', 'Partly Cloudy'];
  const today = new Date();
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = addDays(today, i);
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const randomTemp = Math.floor(Math.random() * 15) + 20; // Random temp between 20-35°C
    
    return {
      date: format(date, 'yyyy-MM-dd'),
      condition: randomCondition,
      temperature: randomTemp,
      icon: getWeatherIcon(randomCondition)
    };
  });
};

const getWeatherIcon = (condition: string): string => {
  switch (condition) {
    case 'Sunny':
      return 'https://cdn.weatherapi.com/weather/64x64/day/113.png';
    case 'Clear':
      return 'https://cdn.weatherapi.com/weather/64x64/night/113.png';
    case 'Cloudy':
      return 'https://cdn.weatherapi.com/weather/64x64/day/119.png';
    case 'Rain':
      return 'https://cdn.weatherapi.com/weather/64x64/day/308.png';
    case 'Partly Cloudy':
      return 'https://cdn.weatherapi.com/weather/64x64/day/116.png';
    default:
      return 'https://cdn.weatherapi.com/weather/64x64/day/113.png';
  }
};