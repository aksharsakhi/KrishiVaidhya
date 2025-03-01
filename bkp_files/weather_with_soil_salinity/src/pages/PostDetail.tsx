
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import CommunityHeader from '@/components/CommunityHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ThumbsUp, MessageSquare, Share2, Flag, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { PostProps } from '@/components/PostCard';

// Sample posts data - in a real app, this would be fetched from an API
const posts: PostProps[] = [
  {
    id: '1',
    title: 'Best practices for organic rice farming during monsoon',
    content: 'I\'ve been farming rice for over 10 years using organic methods. This monsoon season is approaching and I\'d like to share some tips that have worked well for me over the years.\n\nFirst, ensure proper drainage systems are in place before the rains begin. Waterlogging can be detrimental to rice crops, especially in the early stages.\n\nSecond, use neem-based organic pesticides as a preventative measure against common monsoon pests. Apply once every two weeks.\n\nThird, increase the height of bunds around your fields to prevent overflow during heavy rains.\n\nFourth, consider using SRI (System of Rice Intensification) method which requires less water and gives better yields.\n\nFinally, incorporate green manure crops like dhaincha or sunhemp before transplanting rice seedlings. This enriches the soil naturally.\n\nI hope these tips help! Would love to hear what methods work for other farmers in different regions.',
    author: 'RiceFarmerGuru',
    createdAt: new Date(2023, 2, 5),
    votes: 42,
    commentCount: 15,
    tags: ['rice', 'organic', 'monsoon'],
    category: 'crops'
  }
];

interface Comment {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  createdAt: Date;
  votes: number;
}

const comments: Comment[] = [
  {
    id: 'c1',
    author: 'OrganicFarmer123',
    content: 'Thanks for sharing! I've been struggling with pest control during monsoon. Have you tried using any specific neem formulations that work better than others?',
    createdAt: new Date(2023, 2, 5, 14, 35),
    votes: 7
  },
  {
    id: 'c2',
    author: 'RiceMaster',
    content: 'Great tips! I would add that monitoring water pH during monsoon is crucial as heavy rains can change soil chemistry dramatically. I check mine weekly.',
    createdAt: new Date(2023, 2, 5, 15, 22),
    votes: 12
  },
  {
    id: 'c3',
    author: 'NewFarmer2023',
    content: 'As someone new to farming, could you explain more about the SRI method? How much does it reduce water usage compared to traditional methods?',
    createdAt: new Date(2023, 2, 6, 9, 15),
    votes: 3
  }
];

const getCategoryColor = (category: PostProps['category']) => {
  switch (category) {
    case 'crops':
      return 'bg-weather-green-light text-weather-green-dark border-weather-green-DEFAULT';
    case 'livestock':
      return 'bg-soil-brown-light text-soil-brown-dark border-soil-brown-DEFAULT';
    case 'equipment':
      return 'bg-blue-50 text-blue-800 border-blue-200';
    case 'market':
      return 'bg-weather-orange-light text-weather-orange-dark border-weather-orange-DEFAULT';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <div className="bg-white rounded-lg border border-border p-4 mb-4">
      <div className="flex">
        <div className="flex flex-col items-center mr-4">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ArrowUp className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium my-1">{comment.votes}</span>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={comment.authorAvatar} alt={comment.author} />
              <AvatarFallback className="text-[10px]">
                {comment.author.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm">{comment.author}</span>
            <span className="mx-1 text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
            </span>
          </div>
          
          <p className="text-sm">{comment.content}</p>
          
          <div className="flex mt-2">
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              <MessageSquare className="h-3 w-3 mr-1" />
              Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostDetail = () => {
  const { postId } = useParams();
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-muted/30">
        <CommunityHeader />
        <main className="container px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-6">The post you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Community
            </Link>
          </Button>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-muted/30">
      <CommunityHeader />
      
      <main className="container px-4 py-6">
        <div className="mb-4">
          <Button variant="ghost" asChild className="text-muted-foreground">
            <Link to="/">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Community
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 space-y-6">
            {/* Post */}
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              <div className="flex">
                {/* Voting sidebar */}
                <div className="flex flex-col items-center py-6 px-3 bg-muted/30">
                  <Button variant="ghost" size="icon">
                    <ArrowUp className="h-6 w-6" />
                  </Button>
                  <span className="font-medium text-lg my-2">{post.votes}</span>
                  <Button variant="ghost" size="icon">
                    <ArrowDown className="h-6 w-6" />
                  </Button>
                </div>
                
                {/* Main content */}
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="outline" className={`${getCategoryColor(post.category)}`}>
                      {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </Badge>
                    
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-gray-100">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h1 className="text-2xl font-bold text-soil-brown-dark mb-4">{post.title}</h1>
                  
                  <div className="flex items-center mb-6">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="" alt={post.author} />
                      <AvatarFallback>
                        {post.author.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{post.author}</div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatDistanceToNow(post.createdAt, { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none mb-6">
                    {post.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Like
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Flag className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Comments */}
            <div className="bg-white rounded-lg border border-border p-6">
              <h2 className="font-semibold text-lg mb-4">Comments ({comments.length})</h2>
              
              <div className="mb-6">
                <textarea
                  className="w-full p-3 border border-border rounded-md min-h-24 focus:outline-none focus:ring-1 focus:ring-weather-green-DEFAULT"
                  placeholder="Add your comment..."
                ></textarea>
                <div className="flex justify-end mt-2">
                  <Button className="bg-weather-green-DEFAULT hover:bg-weather-green-dark text-white">
                    Post Comment
                  </Button>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                {comments.map(comment => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white rounded-lg border border-border p-4">
              <h3 className="font-medium mb-3">About the Author</h3>
              <div className="flex items-center mb-3">
                <Avatar className="h-12 w-12 mr-3">
                  <AvatarImage src="" alt={post.author} />
                  <AvatarFallback>
                    {post.author.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author}</div>
                  <div className="text-xs text-muted-foreground">Member since 2020</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Experienced rice farmer from Kerala with 15+ years of organic farming experience.</p>
              <Button variant="outline" className="w-full">View Profile</Button>
            </div>
            
            <div className="bg-gradient-to-br from-weather-green-light via-white to-weather-orange-light rounded-lg border border-border p-4">
              <h3 className="font-medium mb-3">Krishi Vaidhya Community</h3>
              <p className="text-sm text-muted-foreground mb-3">Join thousands of farmers sharing knowledge and supporting each other.</p>
              <div className="flex items-center text-sm mb-3">
                <span className="font-medium mr-2">12.5k</span>
                <span className="text-muted-foreground">Members</span>
              </div>
              <div className="flex items-center text-sm mb-4">
                <span className="font-medium mr-2">423</span>
                <span className="text-muted-foreground">Online now</span>
              </div>
              <Separator className="my-3" />
              <p className="text-xs text-muted-foreground mb-2">Created Jan 15, 2020</p>
            </div>
            
            <div className="bg-white rounded-lg border border-border p-4">
              <h3 className="font-medium mb-3">Related Posts</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm hover:text-weather-green-DEFAULT">Tips for water conservation in paddy fields</a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-weather-green-DEFAULT">Organic pest control strategies for rice farmers</a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-weather-green-DEFAULT">How to select the right rice variety for your region</a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-weather-green-DEFAULT">Post-harvest techniques to maximize rice quality</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostDetail;
