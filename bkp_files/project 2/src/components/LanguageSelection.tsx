import React, { useState } from 'react';

interface LanguageSelectionProps {
  onSelect: (language: string) => void;
}

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onSelect }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  
  const languages = [
    { id: 'en', name: 'English' },
    { id: 'hi', name: 'हिंदी' },
    { id: 'ta', name: 'தமிழ்' },
    { id: 'kn', name: 'ಕನ್ನಡ' },
    { id: 'te', name: 'తెలుగు' },
  ];

  const handleNext = () => {
    onSelect(selectedLanguage);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Status bar */}
      <div className="bg-white p-2 flex justify-between items-center border-b">
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
      <div className="border-b p-4 flex items-center">
        <div className="flex items-center">
          <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-black mr-2">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
            <path d="M8 9l4-4 4 4"></path>
            <path d="M16 15l-4 4-4-4"></path>
            <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"></path>
          </svg>
          <h1 className="text-xl font-bold">KRISHI VAIDHYA</h1>
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-6 text-center">SELECT A LANGUAGE</h2>
        
        <div className="space-y-4 mb-auto">
          {languages.map((language) => (
            <button
              key={language.id}
              className={`w-full py-3 px-4 rounded-md flex items-center justify-between ${
                selectedLanguage === language.name ? 'bg-green-200' : 'bg-green-100'
              }`}
              onClick={() => setSelectedLanguage(language.name)}
            >
              <span>{language.name}</span>
              <div className={`w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center ${
                selectedLanguage === language.name ? 'bg-white' : 'bg-transparent'
              }`}>
                {selectedLanguage === language.name && (
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                )}
              </div>
            </button>
          ))}
        </div>
        
        <button
          onClick={handleNext}
          className="mt-6 bg-gray-800 text-white py-3 rounded-md hover:bg-gray-900 transition duration-300"
        >
          Next
        </button>
      </div>

      <div className="p-4 text-center text-sm text-gray-500">
        ©Krishi Vaidhya Pvt Ltd | 2025
      </div>
    </div>
  );
};

export default LanguageSelection;