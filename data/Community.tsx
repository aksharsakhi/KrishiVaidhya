
import React from 'react';
import { Link } from 'react-router-dom';
import { Wheat, Tractor, Package, Users, Plus } from 'lucide-react';
import CommunityHeader from '@/components/CommunityHeader';
import PostCard, { PostProps } from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for posts
const samplePosts: PostProps[] = [
  {
    id: '1',
    title: 'Best practices for organic rice farming during monsoon',
    content: 'I\'ve been farming rice for over 10 years using organic methods. This monsoon season is approaching and I\'d like to share some tips that have worked well for me over the years. First, ensure proper drainage systems are in place before the rains begin...',
    author: 'RiceFarmerGuru',
    createdAt: new Date(2023, 2, 5),
    votes: 42,
    commentCount: 15,
    tags: ['rice', 'organic', 'monsoon'],
    category: 'crops'
  },
  {
    id: '2',
    title: 'Looking to sell 5 healthy dairy cows - Punjab region',
    content: 'I have 5 Holstein Friesian cross dairy cows for sale. All are healthy, vaccinated, and currently producing 15-20 liters of milk daily. Age ranges from 3-5 years. Located in Punjab, can arrange transportation...',
    author: 'DairyFarmer123',
    createdAt: new Date(2023, 2, 6),
    votes: 23,
    commentCount: 8,
    tags: ['dairy', 'cows', 'livestock', 'punjab'],
    category: 'livestock'
  },
  {
    id: '3',
    title: 'Review: New eco-friendly fertilizer that increased my yield by 30%',
    content: 'I recently tried the new BioCrop organic fertilizer on my wheat fields and I\'m amazed by the results. Not only did it increase my yield by nearly 30%, but the quality of the grain improved significantly...',
    author: 'WheatInnovator',
    createdAt: new Date(2023, 2, 7),
    votes: 67,
    commentCount: 24,
    tags: ['fertilizer', 'organic', 'wheat', 'review'],
    category: 'general'
  },
  {
    id: '4',
    title: 'Selling bulk quantities of high-quality NPK fertilizer at competitive prices',
    content: 'We have large quantities of premium NPK fertilizer (20-20-20) available for immediate purchase. Special discounts for orders above 500kg. Delivery available across all agricultural regions...',
    author: 'AgroSuppliesPro',
    createdAt: new Date(2023, 2, 3),
    votes: 15,
    commentCount: 7,
    tags: ['fertilizer', 'npk', 'bulk', 'sale'],
    category: 'market'
  },
  {
    id: '5',
    title: 'How to identify and treat common wheat diseases before they spread',
    content: 'Early detection of wheat diseases can save your entire crop. Here are the signs to look for and immediate treatment steps for common issues like rust, powdery mildew, and leaf blight...',
    author: 'PlantDoctorExpert',
    createdAt: new Date(2023, 2, 8),
    votes: 89,
    commentCount: 36,
    tags: ['wheat', 'disease', 'prevention', 'treatment'],
    category: 'crops'
  }
];

const Community = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <CommunityHeader />
      
      <main className="container px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-lg border border-border">
            <h2 className="font-semibold text-soil-brown-dark mb-3">Community</h2>
            <div className="space-y-1">
              <Link to="/" className="flex items-center px-2 py-1.5 rounded-md bg-weather-green-light text-weather-green-dark hover:bg-weather-green-light/80">
                <Wheat className="mr-2 h-4 w-4" />
                <span className="text-sm">All Posts</span>
              </Link>
              <Link to="/?category=crops" className="flex items-center px-2 py-1.5 rounded-md hover:bg-weather-green-light/50 text-muted-foreground hover:text-weather-green-dark">
                <Wheat className="mr-2 h-4 w-4" />
                <span className="text-sm">Crops & Farming</span>
              </Link>
              <Link to="/?category=livestock" className="flex items-center px-2 py-1.5 rounded-md hover:bg-soil-brown-light/50 text-muted-foreground hover:text-soil-brown-dark">
                <Users className="mr-2 h-4 w-4" />
                <span className="text-sm">Livestock</span>
              </Link>
              <Link to="/?category=equipment" className="flex items-center px-2 py-1.5 rounded-md hover:bg-blue-50 text-muted-foreground hover:text-blue-800">
                <Tractor className="mr-2 h-4 w-4" />
                <span className="text-sm">Equipment</span>
              </Link>
              <Link to="/?category=market" className="flex items-center px-2 py-1.5 rounded-md hover:bg-weather-orange-light/50 text-muted-foreground hover:text-weather-orange-dark">
                <Package className="mr-2 h-4 w-4" />
                <span className="text-sm">Marketplace</span>
              </Link>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-weather-green-light to-weather-orange-light p-4 rounded-lg border border-border">
            <h2 className="font-semibold text-soil-brown-dark mb-2">Welcome to Krishi Vaidhya</h2>
            <p className="text-sm text-muted-foreground mb-3">A community where farmers can share knowledge, trade goods, and support each other.</p>
            <Button className="w-full bg-soil-brown-DEFAULT hover:bg-soil-brown-dark text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create New Post
            </Button>
          </div>
        </aside>
        
        {/* Main content */}
        <div className="md:col-span-3 space-y-4">
          <Tabs defaultValue="popular" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-soil-brown-DEFAULT">Community for Farmers</h1>
              <TabsList className="bg-muted">
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="discussed">Most Discussed</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="popular" className="space-y-4 mt-0">
              {samplePosts.sort((a, b) => b.votes - a.votes).map(post => (
                <PostCard key={post.id} {...post} />
              ))}
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-4 mt-0">
              {samplePosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map(post => (
                <PostCard key={post.id} {...post} />
              ))}
            </TabsContent>
            
            <TabsContent value="discussed" className="space-y-4 mt-0">
              {samplePosts.sort((a, b) => b.commentCount - a.commentCount).map(post => (
                <PostCard key={post.id} {...post} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Community;
