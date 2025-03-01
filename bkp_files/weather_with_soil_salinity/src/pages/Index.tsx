
import React, { useState } from 'react';
import WeatherHeader from '@/components/WeatherHeader';
import WeatherCard from '@/components/WeatherCard';
import SoilData from '@/components/SoilData';
import { useWeatherData } from '@/hooks/useWeatherData';
import { format, parseISO, isToday } from 'date-fns';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';

const Index = () => {
  const { weatherData, soilData, loading, error, getRecommendation } = useWeatherData();
  const [visibleDays, setVisibleDays] = useState(4); // Default for desktop

  // Calculate how many days to show based on screen size
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleDays(1);
      } else if (window.innerWidth < 768) {
        setVisibleDays(2);
      } else if (window.innerWidth < 1024) {
        setVisibleDays(3);
      } else {
        setVisibleDays(4);
      }
    };

    handleResize(); // Call once on mount
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + visibleDays < weatherData.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleWeather = weatherData.slice(startIndex, startIndex + visibleDays);

  return (
    <div className="min-h-screen bg-gradient-to-br from-weather-green-light via-white to-weather-orange-light">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <WeatherHeader />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse bg-white rounded-xl p-6 h-80">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-50 rounded-xl border border-red-200">
            <p className="text-red-600">{error}</p>
            <button 
              className="mt-4 px-4 py-2 bg-weather-orange-DEFAULT text-white rounded-lg hover:bg-weather-orange-dark transition-colors"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-weather-green-DEFAULT" />
                7-Day Weather Forecast
              </h2>
              
              <div className="flex space-x-2">
                <button 
                  onClick={handlePrev}
                  disabled={startIndex === 0}
                  className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleNext}
                  disabled={startIndex + visibleDays >= weatherData.length}
                  className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {visibleWeather.map(weather => (
                <WeatherCard 
                  key={weather.id} 
                  weather={weather} 
                  recommendation={getRecommendation(weather.date)}
                  isToday={isToday(parseISO(weather.date))}
                />
              ))}
            </div>

            <div className="mt-8">
              <SoilData soilData={soilData} loading={loading} />
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border animate-slide-up">
              <h3 className="text-lg font-medium mb-4 text-weather-green-dark">Sowing Guidelines</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                    <span>✓</span>
                  </div>
                  <p>Ideal sowing conditions: Low precipitation, moderate temperatures (18-30°C), and adequate soil moisture (40-70%).</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-100 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                    <span>✗</span>
                  </div>
                  <p>Avoid sowing during heavy rainfall or when soil is waterlogged to prevent seed rot and poor germination.</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-orange-100 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                    <span>✗</span>
                  </div>
                  <p>Temperatures below 15°C or above 35°C can inhibit germination and early growth for most crops.</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                    <span>✓</span>
                  </div>
                  <p>Check soil temperature at 5cm depth; most crops require soil temperatures of 18-24°C for optimal germination.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <footer className="mt-10 text-center text-sm text-muted-foreground">
          <p>© 2023 Sunny Sow Minder | Weather predictions are based on historical data and forecasts</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
