
import React from 'react';
import { format, parseISO } from 'date-fns';
import { WeatherForecast, SowingRecommendation } from '@/lib/types';
import { 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  CloudLightning, 
  Cloudy,
  ThermometerSun,
  Wind,
  Droplets
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeatherCardProps {
  weather: WeatherForecast;
  recommendation: SowingRecommendation | null;
  isToday?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ 
  weather, 
  recommendation,
  isToday = false
}) => {
  // Function to get the appropriate weather icon
  const getWeatherIcon = () => {
    const condition = weather.condition.toLowerCase();
    
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
      return <CloudRain className="h-8 w-8 text-blue-500" />;
    } else if (condition.includes('snow') || condition.includes('sleet') || condition.includes('ice')) {
      return <CloudSnow className="h-8 w-8 text-blue-300" />;
    } else if (condition.includes('thunder') || condition.includes('lightning')) {
      return <CloudLightning className="h-8 w-8 text-yellow-500" />;
    } else if (condition.includes('cloud') || condition.includes('overcast') || condition.includes('fog')) {
      return <Cloudy className="h-8 w-8 text-gray-400" />;
    } else if (condition.includes('sunny') || condition.includes('clear')) {
      return <Sun className="h-8 w-8 text-weather-orange-DEFAULT" />;
    } else {
      return <Cloud className="h-8 w-8 text-gray-400" />;
    }
  };
  
  const isSuitable = recommendation?.suitable ?? false;
  
  return (
    <div className={cn(
      "weather-card h-full",
      isToday ? "border-2 border-weather-green-DEFAULT" : "",
      isSuitable 
        ? "bg-gradient-to-b from-weather-green-light to-white" 
        : "bg-gradient-to-b from-weather-orange-light to-white"
    )}>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="data-label">
              {format(parseISO(weather.date), 'EEE')}
            </span>
            <h3 className="font-bold">
              {format(parseISO(weather.date), 'MMM d')}
            </h3>
            {isToday && (
              <span className="text-xs px-2 py-0.5 bg-weather-green-DEFAULT text-white rounded-full">
                Today
              </span>
            )}
          </div>
          {getWeatherIcon()}
        </div>
        
        <div className="mt-3">
          <p className="text-sm font-medium">{weather.condition}</p>
          <div className="flex items-center mt-1">
            <ThermometerSun className="h-4 w-4 mr-1 text-weather-orange-DEFAULT" />
            <span className="data-value">
              {weather.max_temp}°C / {weather.min_temp}°C
            </span>
          </div>
        </div>
        
        <div className="mt-2 space-y-1">
          <div className="flex items-center">
            <Droplets className="h-4 w-4 mr-1 text-blue-500" />
            <span className="data-value">{weather.humidity}% Humidity</span>
          </div>
          <div className="flex items-center">
            <Wind className="h-4 w-4 mr-1 text-gray-500" />
            <span className="data-value">{weather.wind_speed} km/h</span>
          </div>
          <div className="flex items-center">
            <CloudRain className="h-4 w-4 mr-1 text-blue-400" />
            <span className="data-value">{weather.precipitation}mm</span>
          </div>
        </div>
        
        <div className={cn(
          "mt-3 p-2 rounded-lg text-sm",
          isSuitable 
            ? "bg-green-100 text-green-800" 
            : "bg-orange-100 text-orange-800"
        )}>
          <p className="font-medium">
            {isSuitable ? "✓ Suitable for sowing" : "✗ Not recommended"}
          </p>
          <p className="text-xs mt-1">{recommendation?.reason}</p>
          
          {!isSuitable && recommendation?.alternative_date && (
            <p className="text-xs mt-1">
              Try on: {format(parseISO(recommendation.alternative_date), 'MMM d')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
