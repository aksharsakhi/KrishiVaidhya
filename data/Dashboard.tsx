import React from 'react';
import { Menu, Bell, Home, Search, Calendar, AlertTriangle, User, Calculator, FileText, Camera } from 'lucide-react';

interface DashboardProps {
  selectedCrops: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ selectedCrops }) => {
  // Map crop IDs to their emoji and name
  const cropMap: Record<string, { icon: string, name: string }> = {
    'apple': { icon: '🍎', name: 'Apple' },
    'banana': { icon: '🍇', name: 'Banana' },
    'potato': { icon: '🥔', name: 'Potato' },
    'corn': { icon: '🌽', name: 'Corn' },
    'tomato': { icon: '🍅', name: 'Tomato' },
    'bellpepper': { icon: '🫑', name: 'Bell Pepper' },
    'eggplant': { icon: '🍆', name: 'Eggplant' },
    'onion': { icon: '🧅', name: 'Onion' },
    'lemon': { icon: '🍋', name: 'Lemon' },
    'potato2': { icon: '🥔', name: 'Potato' },
    'radish': { icon: '🥕', name: 'Radish' },
    'peas': { icon: '🫛', name: 'Peas' },
    'turnip': { icon: '🫒', name: 'Turnip' },
    'mango': { icon: '🥭', name: 'Mango' },
    'grape': { icon: '🍌', name: 'Grape' },
    'papaya': { icon: '🥭', name: 'Papaya' },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Status bar */}
      <div className="bg-white p-2 flex justify-between items-center">
        <div className="text-sm">9:41</div>
        <div className="flex space-x-1">
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" width="100%" height="100%" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 10a8 8 0 0 1-16 0"></path>
              <path d="M22 10a10 10 0 0 1-20 0"></path>
            </svg>
          </div>
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" width="100%" height="100%" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 18h12"></path>
              <path d="M6 6h12"></path>
              <path d="M2 12h20"></path>
            </svg>
          </div>
          <div className="w-4 h-4">
            <svg viewBox="0 0 24 24" width="100%" height="100%" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 6v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1z"></path>
              <path d="M4 10v4"></path>
              <path d="M8 7v10"></path>
              <path d="M12 7v10"></path>
              <path d="M16 7v10"></path>
              <path d="M20 10v4"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white p-4 flex justify-between items-center shadow-sm">
        <Menu className="w-6 h-6" />
        <h1 className="text-xl font-bold">Krishi Vaidhya</h1>
        <Bell className="w-6 h-6" />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Weather and selected crops */}
        <div className="flex space-x-4">
          <div className="bg-blue-300 rounded-lg p-4 flex-1 flex flex-col items-center justify-center">
            <div className="text-4xl mb-1">☀️</div>
            <div className="text-xl font-bold">33°C</div>
            <div className="text-sm">Sunny</div>
          </div>
          <div className="bg-gray-200 rounded-lg p-4 flex-1">
            <div className="text-sm font-medium mb-2">Selected Crops</div>
            <div className="flex space-x-2">
              {selectedCrops.slice(0, 3).map((cropId) => (
                <div key={cropId} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl">
                  {cropMap[cropId]?.icon || '🌱'}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disease detection */}
        <div className="bg-green-100 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
            </div>
          </div>
          <button className="bg-black text-white rounded-md py-2 px-4 w-full">
            Take Picture
          </button>
        </div>

        {/* Kisaan Tools */}
        <div>
          <h2 className="text-lg font-bold mb-3">Kisaan Tools</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-200 rounded-lg p-4">
              <h3 className="font-medium mb-2">Fertilizer Calculator</h3>
              <div className="flex justify-between items-end">
                <div className="text-2xl">
                  <Calculator className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-green-200 rounded-lg p-4">
              <h3 className="font-medium mb-2">Pest & Diseases</h3>
              <div className="flex justify-between items-end">
                <div className="text-2xl">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-green-200 rounded-lg p-4">
              <h3 className="font-medium mb-2">Crop Calendar</h3>
              <div className="flex justify-between items-end">
                <div className="text-2xl">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-green-200 rounded-lg p-4">
              <h3 className="font-medium mb-2">Alerts</h3>
              <div className="flex justify-between items-end">
                <div className="text-2xl">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bg-white border-t flex justify-around py-2">
        <button className="p-2 flex flex-col items-center">
          <Home className="w-6 h-6" />
        </button>
        <button className="p-2 flex flex-col items-center">
          <Search className="w-6 h-6" />
        </button>
        <button className="p-2 flex flex-col items-center">
          <Calendar className="w-6 h-6" />
        </button>
        <button className="p-2 flex flex-col items-center">
          <User className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;