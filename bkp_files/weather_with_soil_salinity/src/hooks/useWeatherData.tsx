
import { useState, useEffect } from 'react';
import { WeatherForecast, SoilData, SowingRecommendation } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

// This is a mock function that simulates fetching data from Supabase
// In a real application, you would use the Supabase JS client
const fetchWeatherData = async (): Promise<WeatherForecast[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock data based on the Python code
  return [
    {
      id: 1,
      date: '2023-03-02',
      max_temp: 32,
      min_temp: 24,
      condition: 'Sunny',
      humidity: 45,
      wind_speed: 12,
      precipitation: 0
    },
    {
      id: 2,
      date: '2023-03-03',
      max_temp: 30,
      min_temp: 23,
      condition: 'Partly cloudy',
      humidity: 50,
      wind_speed: 10,
      precipitation: 0
    },
    {
      id: 3,
      date: '2023-03-04',
      max_temp: 29,
      min_temp: 22,
      condition: 'Light rain',
      humidity: 65,
      wind_speed: 15,
      precipitation: 8
    },
    {
      id: 4,
      date: '2023-03-05',
      max_temp: 27,
      min_temp: 21,
      condition: 'Moderate rain',
      humidity: 70,
      wind_speed: 18,
      precipitation: 15
    },
    {
      id: 5,
      date: '2023-03-06',
      max_temp: 26,
      min_temp: 20,
      condition: 'Heavy rain',
      humidity: 85,
      wind_speed: 25,
      precipitation: 30
    },
    {
      id: 6,
      date: '2023-03-07',
      max_temp: 28,
      min_temp: 21,
      condition: 'Light rain',
      humidity: 75,
      wind_speed: 16,
      precipitation: 12
    },
    {
      id: 7,
      date: '2023-03-08',
      max_temp: 31,
      min_temp: 23,
      condition: 'Sunny',
      humidity: 55,
      wind_speed: 8,
      precipitation: 0
    }
  ];
};

const fetchSoilData = async (): Promise<SoilData[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data based on the Python code
  return [
    {
      id: 1,
      polygon_id: "A1",
      moisture: 65,
      temperature: 28,
      date: '2023-03-02'
    },
    {
      id: 2,
      polygon_id: "A1",
      moisture: 70,
      temperature: 27,
      date: '2023-03-03'
    },
    {
      id: 3,
      polygon_id: "A1",
      moisture: 75,
      temperature: 26,
      date: '2023-03-04'
    },
    {
      id: 4,
      polygon_id: "A1",
      moisture: 85,
      temperature: 25,
      date: '2023-03-05'
    }
  ];
};

// Function to determine if weather is suitable for sowing
const getSowingRecommendation = (
  weather: WeatherForecast,
  soilData?: SoilData
): SowingRecommendation => {
  // Logic to determine if weather is suitable for sowing
  const rainyConditions = [
    'Light rain', 'Moderate rain', 'Heavy rain', 
    'Patchy rain possible', 'Moderate rain at times', 
    'Heavy rain at times', 'Light rain shower', 
    'Moderate or heavy rain shower', 'Torrential rain shower'
  ];
  
  const isTooWet = rainyConditions.includes(weather.condition) || 
                  weather.precipitation > 10 || 
                  (soilData && soilData.moisture > 80);
  
  const isTooHot = weather.max_temp > 35;
  const isTooCold = weather.min_temp < 15;
  
  let reason = '';
  let suitable = true;
  
  if (isTooWet) {
    reason = 'Excessive moisture/rainfall predicted';
    suitable = false;
  } else if (isTooHot) {
    reason = 'Temperature too high for optimal sowing';
    suitable = false;
  } else if (isTooCold) {
    reason = 'Temperature too low for optimal sowing';
    suitable = false;
  }
  
  // If not suitable, suggest alternative date
  let alternativeDate;
  if (!suitable) {
    // For demo purposes, suggest a date 3 days later
    const date = new Date(weather.date);
    date.setDate(date.getDate() + 3);
    alternativeDate = date.toISOString().split('T')[0];
  }
  
  return {
    suitable,
    reason: suitable ? 'Conditions favorable for sowing' : reason,
    alternative_date: alternativeDate
  };
};

export function useWeatherData() {
  const [weatherData, setWeatherData] = useState<WeatherForecast[]>([]);
  const [soilData, setSoilData] = useState<SoilData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [weather, soil] = await Promise.all([
          fetchWeatherData(),
          fetchSoilData()
        ]);
        
        setWeatherData(weather);
        setSoilData(soil);
        setError(null);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to load weather data. Please try again later.');
        toast({
          title: 'Error',
          description: 'Failed to load weather data. Please try again later.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [toast]);

  const getRecommendation = (date: string): SowingRecommendation | null => {
    const weather = weatherData.find(w => w.date === date);
    const soil = soilData.find(s => s.date === date);
    
    if (!weather) return null;
    
    return getSowingRecommendation(weather, soil);
  };

  return {
    weatherData,
    soilData,
    loading,
    error,
    getRecommendation
  };
}
