import React, { useState } from 'react';
import { format } from 'date-fns';
import { ActivityEvent } from '../types';
import { Check, X, Filter } from 'lucide-react';

interface ActivityListProps {
  activities: ActivityEvent[];
  onToggleComplete: (id: string) => void;
  onDeleteActivity: (id: string) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({ 
  activities, 
  onToggleComplete,
  onDeleteActivity
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'completed') return activity.completed;
    if (filter === 'pending') return !activity.completed;
    if (filter === 'watering') return activity.activity === 'watering';
    if (filter === 'harvesting') return activity.activity === 'harvesting';
    return true;
  });

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">Upcoming Activities</h2>
        <p className="text-gray-500">No activities scheduled yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Upcoming Activities</h2>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <Filter size={18} className="text-gray-700" />
        </button>
      </div>

      {showFilters && (
        <div className="mb-4 flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded-full ${
              filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 text-sm rounded-full ${
              filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 text-sm rounded-full ${
              filter === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Completed
          </button>
          <button 
            onClick={() => setFilter('watering')}
            className={`px-3 py-1 text-sm rounded-full ${
              filter === 'watering' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Watering
          </button>
          <button 
            onClick={() => setFilter('harvesting')}
            className={`px-3 py-1 text-sm rounded-full ${
              filter === 'harvesting' ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Harvesting
          </button>
        </div>
      )}

      <div className="space-y-3">
        {filteredActivities.map((activity) => (
          <div 
            key={activity.id} 
            className={`border-l-4 ${
              activity.completed ? 'border-green-500 bg-green-50' : 
              activity.activity === 'watering' ? 'border-blue-500 bg-blue-50' :
              activity.activity === 'harvesting' ? 'border-amber-500 bg-amber-50' :
              'border-yellow-500 bg-yellow-50'
            } p-3 rounded-r-lg flex justify-between items-center`}
          >
            <div>
              <h3 className="font-medium">
                {activity.title}
              </h3>
              <p className="text-sm text-gray-600">
                {format(activity.date, 'MMMM d, yyyy')}
              </p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => onToggleComplete(activity.id)}
                className={`p-1 rounded-full ${
                  activity.completed ? 'bg-green-200' : 'bg-gray-200'
                }`}
                aria-label={activity.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                <Check size={16} className={activity.completed ? 'text-green-700' : 'text-gray-600'} />
              </button>
              <button 
                onClick={() => onDeleteActivity(activity.id)}
                className="p-1 rounded-full bg-red-200"
                aria-label="Delete activity"
              >
                <X size={16} className="text-red-700" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;