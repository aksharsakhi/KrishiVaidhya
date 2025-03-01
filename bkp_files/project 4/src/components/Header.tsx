import React from 'react';
import { Sprout } from 'lucide-react';

interface HeaderProps {
  location: string;
}

const Header: React.FC<HeaderProps> = ({ location }) => {
  return (
    <header className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sprout size={24} />
          <h1 className="text-xl font-bold">AgriCalendar</h1>
        </div>
        <div className="text-sm">
          <p>{location}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;