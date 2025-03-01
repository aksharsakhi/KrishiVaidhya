
import React from 'react';
import { SoilData as SoilDataType } from '@/lib/types';
import { Droplets, Thermometer } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface SoilDataProps {
  soilData: SoilDataType[];
  loading: boolean;
}

const SoilData: React.FC<SoilDataProps> = ({ soilData, loading }) => {
  if (loading) {
    return (
      <div className="animate-pulse rounded-xl bg-gray-100 p-6 h-64">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  if (!soilData.length) {
    return (
      <div className="rounded-xl border p-6">
        <h3 className="text-lg font-medium">Soil Conditions</h3>
        <p className="text-muted-foreground mt-2">No soil data available</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white/80 p-6 animate-slide-up backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-soil-brown-dark">Soil Conditions</h3>
        <span className="text-xs bg-soil-brown-light text-soil-brown-DEFAULT px-2 py-1 rounded-full">
          {soilData[0].polygon_id}
        </span>
      </div>
      
      <div className="space-y-4">
        {soilData.map((data) => (
          <div 
            key={data.id} 
            className="p-3 rounded-lg border border-soil-brown-light bg-gradient-to-r from-soil-brown-light/50 to-transparent"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-600">
                {format(parseISO(data.date), 'EEE, MMM d')}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                <div>
                  <span className="data-label">Moisture</span>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${data.moisture}%` }}
                      ></div>
                    </div>
                    <span className="data-value">{data.moisture}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Thermometer className="h-4 w-4 mr-2 text-weather-orange-DEFAULT" />
                <div>
                  <span className="data-label">Temperature</span>
                  <span className="data-value">{data.temperature}°C</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-muted-foreground">
        <p>Last updated: {format(new Date(), 'MMM d, yyyy h:mm a')}</p>
      </div>
    </div>
  );
};

export default SoilData;
