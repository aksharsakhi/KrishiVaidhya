
export interface WeatherForecast {
  id: number;
  date: string;
  max_temp: number;
  min_temp: number;
  condition: string;
  humidity: number;
  wind_speed: number;
  precipitation: number;
  created_at?: string;
}

export interface SoilData {
  id: number;
  polygon_id: string;
  moisture: number;
  temperature: number;
  date: string;
  created_at?: string;
}

export interface SowingRecommendation {
  suitable: boolean;
  reason: string;
  alternative_date?: string;
}

export type WeatherCondition = 
  | 'Sunny' 
  | 'Partly cloudy' 
  | 'Cloudy' 
  | 'Overcast' 
  | 'Mist' 
  | 'Patchy rain possible' 
  | 'Patchy snow possible' 
  | 'Patchy sleet possible' 
  | 'Patchy freezing drizzle possible' 
  | 'Thundery outbreaks possible' 
  | 'Blowing snow' 
  | 'Blizzard' 
  | 'Fog' 
  | 'Freezing fog' 
  | 'Patchy light drizzle' 
  | 'Light drizzle' 
  | 'Freezing drizzle' 
  | 'Heavy freezing drizzle' 
  | 'Patchy light rain' 
  | 'Light rain' 
  | 'Moderate rain at times' 
  | 'Moderate rain' 
  | 'Heavy rain at times' 
  | 'Heavy rain' 
  | 'Light freezing rain' 
  | 'Moderate or heavy freezing rain' 
  | 'Light sleet' 
  | 'Moderate or heavy sleet' 
  | 'Patchy light snow' 
  | 'Light snow' 
  | 'Patchy moderate snow' 
  | 'Moderate snow' 
  | 'Patchy heavy snow' 
  | 'Heavy snow' 
  | 'Ice pellets' 
  | 'Light rain shower' 
  | 'Moderate or heavy rain shower' 
  | 'Torrential rain shower' 
  | 'Light sleet showers' 
  | 'Moderate or heavy sleet showers' 
  | 'Light snow showers' 
  | 'Moderate or heavy snow showers' 
  | 'Light showers of ice pellets' 
  | 'Moderate or heavy showers of ice pellets' 
  | 'Patchy light rain with thunder' 
  | 'Moderate or heavy rain with thunder' 
  | 'Patchy light snow with thunder' 
  | 'Moderate or heavy snow with thunder';
