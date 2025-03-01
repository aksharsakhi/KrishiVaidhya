
import React from 'react';
import CommunityHeader from '@/components/CommunityHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Tag, MapPin, Phone, Tractor, Wheat } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MarketItem {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  seller: string;
  sellerAvatar?: string;
  contact: string;
  category: 'livestock' | 'fertilizer' | 'equipment' | 'seeds' | 'produce';
  images: string[];
}

const marketItems: MarketItem[] = [
  {
    id: '1',
    title: '5 Holstein Friesian Dairy Cows',
    description: 'Healthy dairy cows with excellent milk production records. Age: 3-5 years. All vaccinations up to date.',
    price: 175000,
    location: 'Punjab',
    seller: 'DairyFarmer123',
    contact: '+91 9876543210',
    category: 'livestock',
    images: ['/placeholder.svg'],
  },
  {
    id: '2',
    title: 'Premium NPK Fertilizer (20-20-20)',
    description: 'High-quality balanced fertilizer suitable for most crops. Available in bulk quantities.',
    price: 1200,
    location: 'Maharashtra',
    seller: 'AgroSuppliesPro',
    contact: '+91 8765432109',
    category: 'fertilizer',
    images: ['/placeholder.svg'],
  },
  {
    id: '3',
    title: 'Mahindra 575 DI Tractor',
    description: 'Used Mahindra tractor in excellent condition. 2000 hours run. All documents available.',
    price: 450000,
    location: 'Haryana',
    seller: 'TractorSeller',
    contact: '+91 7654321098',
    category: 'equipment',
    images: ['/placeholder.svg'],
  },
  {
    id: '4',
    title: 'Organic Wheat Seeds - High Yield Variety',
    description: 'Certified organic wheat seeds with germination rate above 95%. Suitable for most soil types.',
    price: 250,
    location: 'Uttar Pradesh',
    seller: 'OrganicSeedComp',
    contact: '+91 6543210987',
    category: 'seeds',
    images: ['/placeholder.svg'],
  },
];

const getCategoryColor = (category: MarketItem['category']) => {
  switch (category) {
    case 'livestock':
      return 'bg-soil-brown-light text-soil-brown-dark border-soil-brown-DEFAULT';
    case 'fertilizer':
      return 'bg-weather-green-light text-weather-green-dark border-weather-green-DEFAULT';
    case 'equipment':
      return 'bg-blue-50 text-blue-800 border-blue-200';
    case 'seeds':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    case 'produce':
      return 'bg-weather-orange-light text-weather-orange-dark border-weather-orange-DEFAULT';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const MarketplaceItem: React.FC<{ item: MarketItem }> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-md transition-all animate-fade-in">
      <div className="aspect-video bg-muted relative overflow-hidden">
        <img 
          src={item.images[0]} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
        <Badge className={`absolute top-2 left-2 ${getCategoryColor(item.category)}`}>
          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
        </Badge>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-soil-brown-dark mb-2">{item.title}</h3>
        <div className="flex items-center mb-2">
          <Tag className="h-4 w-4 mr-1 text-weather-orange-DEFAULT" />
          <span className="text-lg font-bold text-weather-orange-dark">₹{item.price.toLocaleString()}</span>
          {item.category === 'fertilizer' && <span className="text-xs text-muted-foreground ml-1">per quintal</span>}
          {item.category === 'seeds' && <span className="text-xs text-muted-foreground ml-1">per kg</span>}
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{item.location}</span>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={item.sellerAvatar} alt={item.seller} />
              <AvatarFallback className="text-[10px]">
                {item.seller.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium">{item.seller}</span>
          </div>
          
          <Button size="sm" className="bg-weather-green-DEFAULT text-white hover:bg-weather-green-dark">
            <Phone className="h-3 w-3 mr-1" />
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <CommunityHeader />
      
      <main className="container px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-soil-brown-DEFAULT">Farmer's Marketplace</h1>
            <p className="text-muted-foreground">Buy and sell livestock, fertilizers, equipment, and more</p>
          </div>
          
          <Button className="bg-weather-orange-DEFAULT hover:bg-weather-orange-dark text-white">
            <Package className="mr-2 h-4 w-4" />
            Post New Listing
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded-lg border border-border sticky top-20">
              <h2 className="font-medium mb-3">Filters</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="livestock">Livestock</SelectItem>
                      <SelectItem value="fertilizer">Fertilizers</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="seeds">Seeds</SelectItem>
                      <SelectItem value="produce">Farm Produce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Location</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="punjab">Punjab</SelectItem>
                      <SelectItem value="haryana">Haryana</SelectItem>
                      <SelectItem value="up">Uttar Pradesh</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Price Range</label>
                  <div className="flex items-center gap-2">
                    <Input type="number" placeholder="Min" className="w-full" />
                    <span>-</span>
                    <Input type="number" placeholder="Max" className="w-full" />
                  </div>
                </div>
                
                <Button className="w-full bg-soil-brown-DEFAULT hover:bg-soil-brown-dark text-white">
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-muted mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="livestock">Livestock</TabsTrigger>
                <TabsTrigger value="fertilizer">Fertilizers</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="seeds">Seeds</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketItems.map(item => (
                    <MarketplaceItem key={item.id} item={item} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="livestock" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketItems.filter(item => item.category === 'livestock').map(item => (
                    <MarketplaceItem key={item.id} item={item} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="fertilizer" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketItems.filter(item => item.category === 'fertilizer').map(item => (
                    <MarketplaceItem key={item.id} item={item} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="equipment" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketItems.filter(item => item.category === 'equipment').map(item => (
                    <MarketplaceItem key={item.id} item={item} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="seeds" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketItems.filter(item => item.category === 'seeds').map(item => (
                    <MarketplaceItem key={item.id} item={item} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
