
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Wheat, ShoppingBag, Bell, UserCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CommunityHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Wheat className="w-8 h-8 text-weather-green-DEFAULT" />
            <span className="text-xl font-bold text-soil-brown-DEFAULT">Krishi Vaidhya</span>
          </Link>
        </div>
        
        <div className="hidden md:flex flex-1 mx-6">
          <div className="relative w-full max-w-sm lg:max-w-xl">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search discussions..."
              className="w-full pl-8 bg-muted/50"
            />
          </div>
        </div>
        
        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-weather-green-dark hover:text-weather-green-DEFAULT hover:bg-weather-green-light">
              <Users className="h-5 w-5" />
              <span className="sr-only">Community</span>
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button variant="ghost" size="icon" className="text-weather-orange-dark hover:text-weather-orange-DEFAULT hover:bg-weather-orange-light">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Marketplace</span>
            </Button>
          </Link>
          <Link to="/weather">
            <Button variant="ghost" size="icon" className="text-weather-green-dark hover:text-weather-green-DEFAULT hover:bg-weather-green-light">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Alerts</span>
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="text-soil-brown-DEFAULT hover:text-soil-brown-dark hover:bg-soil-brown-light">
              <UserCircle className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default CommunityHeader;
