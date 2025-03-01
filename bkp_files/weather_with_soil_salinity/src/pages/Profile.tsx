
import React from 'react';
import CommunityHeader from '@/components/CommunityHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { MapPin, Mail, Calendar, Edit, Settings, User } from 'lucide-react';
import { format } from 'date-fns';
import PostCard, { PostProps } from '@/components/PostCard';

// Sample user data
const userData = {
  name: 'Rajesh Kumar',
  username: 'RajeshFarmer',
  avatar: '/placeholder.svg',
  location: 'Punjab, India',
  email: 'rajesh.kumar@example.com',
  joinDate: new Date(2021, 5, 15),
  bio: 'Wheat and rice farmer with 20 years of experience. Specializing in organic farming methods and sustainable agriculture. Always looking to learn and share knowledge with the community.',
  stats: {
    posts: 42,
    comments: 156,
    reputation: 1250
  }
};

// Sample posts data
const userPosts: PostProps[] = [
  {
    id: '101',
    title: 'My experience with drip irrigation for wheat farming',
    content: 'After switching to drip irrigation last season, I've seen a 30% reduction in water usage while maintaining the same yield. Here's how I set it up and what you need to know...',
    author: userData.username,
    createdAt: new Date(2023, 1, 15),
    votes: 32,
    commentCount: 7,
    tags: ['wheat', 'irrigation', 'water-conservation'],
    category: 'crops'
  },
  {
    id: '102',
    title: 'Organic pest control methods that actually work',
    content: 'After years of experimenting, I've found these effective organic solutions for common pests affecting rice and wheat crops in northern India...',
    author: userData.username,
    createdAt: new Date(2023, 0, 28),
    votes: 47,
    commentCount: 13,
    tags: ['organic', 'pest-control', 'sustainable'],
    category: 'crops'
  }
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <CommunityHeader />
      
      <main className="container px-4 py-6">
        {/* Profile header */}
        <div className="bg-white rounded-lg border border-border overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-weather-green-light to-weather-orange-light"></div>
          <div className="px-6 pb-6 relative">
            <Avatar className="h-24 w-24 absolute -top-12 ring-4 ring-white">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>{userData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-soil-brown-dark">{userData.name}</h1>
                <p className="text-muted-foreground">@{userData.username}</p>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
            
            <div className="mt-4 flex flex-col sm:flex-row gap-4 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {userData.location}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Mail className="h-4 w-4 mr-1" />
                {userData.email}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                Joined {format(userData.joinDate, 'MMMM yyyy')}
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm">{userData.bio}</p>
            </div>
            
            <div className="flex justify-between mt-6 pt-6 border-t border-border">
              <div className="text-center">
                <div className="font-bold text-lg">{userData.stats.posts}</div>
                <div className="text-xs text-muted-foreground">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{userData.stats.comments}</div>
                <div className="text-xs text-muted-foreground">Comments</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{userData.stats.reputation}</div>
                <div className="text-xs text-muted-foreground">Reputation</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-lg border border-border p-4">
              <h2 className="font-semibold mb-3 flex items-center">
                <User className="h-4 w-4 mr-2" />
                About
              </h2>
              <Separator className="my-2" />
              <div className="text-sm space-y-2 text-muted-foreground">
                <p>Farming experience: 20 years</p>
                <p>Specialization: Wheat and Rice</p>
                <p>Farming approach: Organic</p>
                <p>Location: Punjab, Northern India</p>
                <p>Farm size: 15 acres</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-border p-4">
              <h2 className="font-semibold mb-3">Badges</h2>
              <Separator className="my-2" />
              <div className="flex flex-wrap gap-2">
                <Badge title="Top Contributor" className="bg-amber-100 border-amber-300 text-amber-800 rounded-full px-3 py-1 text-xs">
                  Top Contributor
                </Badge>
                <Badge title="Verified Farmer" className="bg-emerald-100 border-emerald-300 text-emerald-800 rounded-full px-3 py-1 text-xs">
                  Verified Farmer
                </Badge>
                <Badge title="Knowledge Sharer" className="bg-blue-100 border-blue-300 text-blue-800 rounded-full px-3 py-1 text-xs">
                  Knowledge Sharer
                </Badge>
                <Badge title="Helpful Member" className="bg-purple-100 border-purple-300 text-purple-800 rounded-full px-3 py-1 text-xs">
                  Helpful Member
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <Tabs defaultValue="posts">
              <TabsList className="w-full bg-muted">
                <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
                <TabsTrigger value="comments" className="flex-1">Comments</TabsTrigger>
                <TabsTrigger value="marketplace" className="flex-1">Marketplace Listings</TabsTrigger>
                <TabsTrigger value="saved" className="flex-1">Saved</TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts" className="mt-6 space-y-4">
                {userPosts.map(post => (
                  <PostCard key={post.id} {...post} />
                ))}
                
                {userPosts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No posts yet</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="comments" className="mt-6">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No comments to display</p>
                </div>
              </TabsContent>
              
              <TabsContent value="marketplace" className="mt-6">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No marketplace listings</p>
                </div>
              </TabsContent>
              
              <TabsContent value="saved" className="mt-6">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No saved items</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

const Badge: React.FC<BadgeProps> = ({ title, className, ...props }) => {
  return (
    <div className={className} {...props}>
      {title}
    </div>
  );
};

export default Profile;
