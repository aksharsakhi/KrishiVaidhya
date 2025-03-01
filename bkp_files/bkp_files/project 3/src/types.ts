export interface CropActivity {
  name: string;
  daysAfter: number;
  requiredConditions: string[];
}

export interface CropSchedule {
  [key: string]: CropActivity[];
}

export interface WeatherForecast {
  date: string;
  condition: string;
  temperature: number;
  icon: string;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  activities: ActivityEvent[];
}

export interface ActivityEvent {
  id: string;
  title: string;
  crop: string;
  activity: string;
  date: Date;
  completed: boolean;
}