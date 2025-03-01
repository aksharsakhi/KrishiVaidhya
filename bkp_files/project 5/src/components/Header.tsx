import React from 'react';
import { Link } from 'react-router-dom';
import { Tractor, User, PlusCircle } from 'lucide-react';
import { getCurrentUser } from '../data';

const Header: React.FC = () => {
  const currentUser = getCurrentUser();

  return (
    <header className="bg-green-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Tractor size={28} />
          <span className="text-xl font-bold">FarmConnect</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/new-post" 
            className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 px-3 py-1 rounded-full transition-colors"
          >
            <PlusCircle size={18} />
            <span>New Post</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
            <span className="hidden md:inline">{currentUser.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;