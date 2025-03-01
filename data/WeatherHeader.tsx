
import React from 'react';
import { Sun, Thermometer, CloudRain, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const WeatherHeader = () => {
  const today = new Date();
  
  return (
    <header className="w-full bg-gradient-to-r from-weather-green-light to-weather-orange-light p-6 rounded-2xl mb-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <Sun className="h-10 w-10 mr-3 text-weather-orange-DEFAULT animate-pulse-subtle" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-weather-green-dark" />
            <span className="text-sm font-medium">{format(today, 'EEEE, MMMM d, yyyy')}</span>
          </div>
          
          <div className="flex items-center">
            <Thermometer className="h-5 w-5 mr-2 text-weather-orange-DEFAULT" />
            <span className="text-sm font-medium">28°C</span>
          </div>
          
          <div className="flex items-center">
            <CloudRain className="h-5 w-5 mr-2 text-weather-green-DEFAULT" />
            <span className="text-sm font-medium">30% Chance</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center md:text-left">
        <p className="text-sm max-w-3xl">
          Monitor weather conditions for optimal planting times, with alerts for unsuitable 
          conditions and recommendations for postponing sowing activities.
        </p>
      </div>
    </header>
  );
};

export default WeatherHeader;
