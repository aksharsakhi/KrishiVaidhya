import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { v4 as uuidv4 } from './utils/uuid';

import Header from './components/Header';
import Calendar from './components/Calendar';
import WeatherForecast from './components/WeatherForecast';
import ActivityList from './components/ActivityList';
import ActivityForm from './components/ActivityForm';
import Navigation from './components/Navigation';

import { ActivityEvent, WeatherForecast as WeatherForecastType } from './types';
import { generateMockWeatherData } from './data/mockWeather';
import { CROP_SCHEDULES } from './data/cropSchedules';

function App() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecastType[]>([]);
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showActivityForm, setShowActivityForm] = useState(false);

  // Initialize with mock data
  useEffect(() => {
    const mockWeather = generateMockWeatherData();
    setWeatherForecast(mockWeather);
    
    // Generate some sample activities
    const today = new Date();
    const sampleActivities: ActivityEvent[] = [
      {
        id: uuidv4(),
        title: 'Potato Ploughing',
        crop: 'potato',
        activity: 'ploughing',
        date: today,
        completed: false
      },
      {
        id: uuidv4(),
        title: 'Corn Sowing',
        crop: 'corn',
        activity: 'sowing',
        date: addDays(today, 3),
        completed: false
      },
      {
        id: uuidv4(),
        title: 'Wheat Fertilizing',
        crop: 'wheat',
        activity: 'fertilizing',
        date: addDays(today, 5),
        completed: true
      }
    ];
    
    setActivities(sampleActivities);
  }, []);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowActivityForm(true);
  };

  const handleAddActivity = ({ crop, activity, date }: { crop: string; activity: string; date: Date }) => {
    const newActivity: ActivityEvent = {
      id: uuidv4(),
      title: `${crop.charAt(0).toUpperCase() + crop.slice(1)} ${activity.charAt(0).toUpperCase() + activity.slice(1)}`,
      crop,
      activity,
      date,
      completed: false
    };
    
    setActivities([...activities, newActivity]);
    setShowActivityForm(false);
  };

  const handleAddMultipleActivities = (newActivities: ActivityEvent[]) => {
    setActivities([...activities, ...newActivities]);
    setShowActivityForm(false);
  };

  const handleToggleComplete = (id: string) => {
    setActivities(
      activities.map(activity => 
        activity.id === id 
          ? { ...activity, completed: !activity.completed } 
          : activity
      )
    );
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  // Sort activities by date
  const sortedActivities = [...activities].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <Header location="Jind, Haryana, India" />
      
      <main className="container mx-auto p-4 space-y-6">
        {activeTab === 'home' && (
          <>
            <WeatherForecast forecast={weatherForecast} />
            <ActivityList 
              activities={sortedActivities} 
              onToggleComplete={handleToggleComplete}
              onDeleteActivity={handleDeleteActivity}
            />
          </>
        )}
        
        {activeTab === 'calendar' && (
          <>
            <Calendar 
              events={activities} 
              onDateClick={handleDateClick} 
            />
            <div className="mt-4 flex justify-center">
              <button 
                onClick={() => {
                  setSelectedDate(new Date());
                  setShowActivityForm(true);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-full shadow-md flex items-center"
              >
                <span className="mr-2">+</span> Add Activity
              </button>
            </div>
          </>
        )}
        
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4">Crop Analytics</h2>
            <p className="text-gray-500">Analytics feature coming soon!</p>
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4">User Profile</h2>
            <p className="text-gray-500">Profile feature coming soon!</p>
          </div>
        )}
      </main>
      
      <Navigation activeTab={activeTab} onChangeTab={setActiveTab} />
      
      {showActivityForm && (
        <ActivityForm 
          selectedDate={selectedDate} 
          onAddActivity={handleAddActivity}
          onAddMultipleActivities={handleAddMultipleActivities}
          onCancel={() => setShowActivityForm(false)}
        />
      )}
    </div>
  );
}

export default App;