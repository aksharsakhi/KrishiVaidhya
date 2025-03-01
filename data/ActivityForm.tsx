import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { CROP_SCHEDULES } from '../data/cropSchedules';
import { v4 as uuidv4 } from '../utils/uuid';
import { ActivityEvent } from '../types';

interface ActivityFormProps {
  selectedDate: Date | null;
  onAddActivity: (activity: {
    crop: string;
    activity: string;
    date: Date;
  }) => void;
  onAddMultipleActivities: (activities: ActivityEvent[]) => void;
  onCancel: () => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ 
  selectedDate, 
  onAddActivity, 
  onAddMultipleActivities,
  onCancel 
}) => {
  const [crop, setCrop] = useState<string>('potato');
  const [activity, setActivity] = useState<string>('ploughing');
  const [includeSchedule, setIncludeSchedule] = useState<boolean>(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate) {
      if (includeSchedule) {
        // Add the current activity plus scheduled follow-up activities
        const activities: ActivityEvent[] = [];
        const cropSchedule = CROP_SCHEDULES[crop];
        
        // Find the current activity in the schedule
        const currentActivityIndex = cropSchedule.findIndex(act => act.name === activity);
        
        if (currentActivityIndex >= 0) {
          // Add the current activity
          activities.push({
            id: uuidv4(),
            title: `${crop.charAt(0).toUpperCase() + crop.slice(1)} ${activity.charAt(0).toUpperCase() + activity.slice(1)}`,
            crop,
            activity,
            date: selectedDate,
            completed: false
          });
          
          // Add subsequent activities based on the schedule
          for (let i = currentActivityIndex + 1; i < cropSchedule.length; i++) {
            const nextActivity = cropSchedule[i];
            const daysToAdd = nextActivity.daysAfter - (currentActivityIndex > 0 ? cropSchedule[currentActivityIndex].daysAfter : 0);
            
            activities.push({
              id: uuidv4(),
              title: `${crop.charAt(0).toUpperCase() + crop.slice(1)} ${nextActivity.name.charAt(0).toUpperCase() + nextActivity.name.slice(1)}`,
              crop,
              activity: nextActivity.name,
              date: addDays(selectedDate, daysToAdd),
              completed: false
            });
          }
          
          onAddMultipleActivities(activities);
        }
      } else {
        // Just add the single activity
        onAddActivity({
          crop,
          activity,
          date: selectedDate
        });
      }
    }
  };
  
  const cropOptions = Object.keys(CROP_SCHEDULES);
  const activityOptions = crop ? 
    CROP_SCHEDULES[crop].map(act => act.name) : 
    [];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          Add Activity for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Crop
            </label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select a crop</option>
              {cropOptions.map((cropName) => (
                <option key={cropName} value={cropName}>
                  {cropName.charAt(0).toUpperCase() + cropName.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity
            </label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select an activity</option>
              {activityOptions.map((act) => (
                <option key={act} value={act}>
                  {act.charAt(0).toUpperCase() + act.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeSchedule}
                onChange={(e) => setIncludeSchedule(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Add follow-up activities (watering, harvesting, etc.)
              </span>
            </label>
            {includeSchedule && (
              <div className="mt-2 text-xs text-gray-500 bg-green-50 p-2 rounded">
                This will automatically schedule all subsequent activities based on the crop's recommended timeline.
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              Add Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;