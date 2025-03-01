import React, { useState } from 'react';
import { Search, Menu } from 'lucide-react';

interface CropSelectionProps {
  onSelect: (crops: string[]) => void;
}

const CropSelection: React.FC<CropSelectionProps> = ({ onSelect }) => {
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const crops = {
    popular: [
      { id: 'apple', name: 'Apple', icon: '🍎' },
      { id: 'grape', name: 'Grape', icon: '🍇' },
      { id: 'potato', name: 'Potato', icon: '🥔' },
      { id: 'corn', name: 'Corn', icon: '🌽' },
    ],
    other: [
      { id: 'tomato', name: 'Tomato', icon: '🍅' },
      { id: 'bellpepper', name: 'Bell Pepper', icon: '🫑' },
      { id: 'eggplant', name: 'Eggplant', icon: '🍆' },
      { id: 'onion', name: 'Onion', icon: '🧅' },
      { id: 'lemon', name: 'Lemon', icon: '🍋' },
      { id: 'potato2', name: 'Potato', icon: '🥔' },
      { id: 'radish', name: 'Radish', icon: '🥕' },
      { id: 'peas', name: 'Peas', icon: '🫛' },
      { id: 'turnip', name: 'Turnip', icon: '🫒' },
      { id: 'mango', name: 'Mango', icon: '🥭' },
      { id: 'grape', name: 'Grape', icon: '🍌' },
      { id: 'papaya', name: 'Papaya', icon: '🥭' },
    ]
  };

  const handleCropToggle = (cropId: string) => {
    if (selectedCrops.includes(cropId)) {
      setSelectedCrops(selectedCrops.filter(id => id !== cropId));
    } else {
      if (selectedCrops.length < 3) {
        setSelectedCrops([...selectedCrops, cropId]);
      }
    }
  };

  const handleNext = () => {
    if (selectedCrops.length > 0) {
      onSelect(selectedCrops);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
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

      {/* Search bar */}
      <div className="px-4 py-2">
        <div className="relative flex items-center bg-gray-100 rounded-full px-4 py-2">
          <Menu className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-gray-500 mr-2">Select Fruits or Vegetables</span>
          <Search className="w-5 h-5 text-gray-500 ml-auto" />
        </div>
      </div>

      {/* Crop selection */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Popular</h3>
          <div className="grid grid-cols-4 gap-4">
            {crops.popular.map((crop) => (
              <div 
                key={crop.id}
                className={`flex flex-col items-center ${
                  selectedCrops.includes(crop.id) ? 'opacity-100' : 'opacity-80'
                }`}
                onClick={() => handleCropToggle(crop.id)}
              >
                <div className={`w-14 h-14 flex items-center justify-center text-3xl rounded-full ${
                  selectedCrops.includes(crop.id) ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {crop.icon}
                </div>
                <span className="text-xs mt-1">{crop.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Other</h3>
          <div className="grid grid-cols-4 gap-4">
            {crops.other.map((crop) => (
              <div 
                key={crop.id}
                className={`flex flex-col items-center ${
                  selectedCrops.includes(crop.id) ? 'opacity-100' : 'opacity-80'
                }`}
                onClick={() => handleCropToggle(crop.id)}
              >
                <div className={`w-14 h-14 flex items-center justify-center text-3xl rounded-full ${
                  selectedCrops.includes(crop.id) ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {crop.icon}
                </div>
                <span className="text-xs mt-1">{crop.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next button */}
      <div className="p-4">
        <button
          onClick={handleNext}
          className={`w-full py-3 bg-gray-800 text-white rounded-md ${
            selectedCrops.length === 0 ? 'opacity-50' : 'opacity-100'
          }`}
          disabled={selectedCrops.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CropSelection;