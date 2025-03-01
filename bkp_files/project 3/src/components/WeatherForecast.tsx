import React from 'react';
import { format } from 'date-fns';
import { WeatherForecast } from '../types';

interface WeatherForecastProps {
  forecast: WeatherForecast[];
}

const WeatherForecastComponent: React.FC<WeatherForecastProps> = ({ forecast }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">7-Day Weather Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
        {forecast.map((day, index) => (
          <div key={index} className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="font-semibold">{format(new Date(day.date), 'EEE')}</p>
            <p className="text-sm text-gray-600">{format(new Date(day.date), 'MMM d')}</p>
            <img src={day.icon} alt={day.condition} className="w-12 h-12 mx-auto my-2" />
            <p className="font-medium">{day.condition}</p>
            <p className="text-lg font-bold">{day.temperature}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecastComponent;