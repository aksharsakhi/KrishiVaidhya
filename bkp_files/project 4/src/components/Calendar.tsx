import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday,
  addMonths,
  subMonths,
  isSameDay
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ActivityEvent, CalendarDay } from '../types';

interface CalendarProps {
  events: ActivityEvent[];
  onDateClick: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events, onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const getDaysInMonth = (): CalendarDay[] => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = new Date(monthStart);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    const endDate = new Date(monthEnd);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    return days.map(day => {
      const dayEvents = events.filter(event => isSameDay(day, event.date));
      
      return {
        date: day,
        isCurrentMonth: isSameMonth(day, currentMonth),
        isToday: isToday(day),
        activities: dayEvents
      };
    });
  };

  const getActivityColor = (activity: string): string => {
    switch (activity) {
      case 'ploughing':
        return 'bg-yellow-100 text-yellow-800';
      case 'sowing':
        return 'bg-green-100 text-green-800';
      case 'watering':
        return 'bg-blue-100 text-blue-800';
      case 'fertilizing':
        return 'bg-purple-100 text-purple-800';
      case 'harvesting':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const days = getDaysInMonth();
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-green-600 text-white">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-green-700">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-green-700">
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center py-2 bg-gray-100 font-semibold">
            {day}
          </div>
        ))}
        
        {days.map((day, i) => (
          <div
            key={i}
            onClick={() => onDateClick(day.date)}
            className={`min-h-[80px] p-2 ${
              day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
            } ${day.isToday ? 'border-2 border-green-500' : ''} cursor-pointer hover:bg-gray-50`}
          >
            <div className="flex justify-between">
              <span className={`text-sm ${day.isToday ? 'font-bold' : ''}`}>
                {format(day.date, 'd')}
              </span>
              {day.activities.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                  {day.activities.length}
                </span>
              )}
            </div>
            <div className="mt-1 overflow-y-auto max-h-[50px]">
              {day.activities.slice(0, 2).map((event, idx) => (
                <div 
                  key={idx} 
                  className={`text-xs p-1 mb-1 rounded truncate ${getActivityColor(event.activity)}`}
                >
                  {event.title}
                </div>
              ))}
              {day.activities.length > 2 && (
                <div className="text-xs text-gray-500">+{day.activities.length - 2} more</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;