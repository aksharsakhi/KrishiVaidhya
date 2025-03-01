import React, { useState } from 'react';
import { Phone, Search, Home, Calendar, AlertTriangle, User, Menu, Bell } from 'lucide-react';
import LoginScreen from './components/LoginScreen';
import LanguageSelection from './components/LanguageSelection';
import CropSelection from './components/CropSelection';
import Dashboard from './components/Dashboard';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'language' | 'crop' | 'dashboard'>('login');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

  const handleLogin = () => {
    setCurrentScreen('language');
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setCurrentScreen('crop');
  };

  const handleCropSelect = (crops: string[]) => {
    setSelectedCrops(crops);
    setCurrentScreen('dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      {currentScreen === 'login' && <LoginScreen onLogin={handleLogin} />}
      {currentScreen === 'language' && <LanguageSelection onSelect={handleLanguageSelect} />}
      {currentScreen === 'crop' && <CropSelection onSelect={handleCropSelect} />}
      {currentScreen === 'dashboard' && <Dashboard selectedCrops={selectedCrops} />}
    </div>
  );
}

export default App;