
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ThumbsUp, ThumbsDown, MessageSquare, Share2, 
  User, Clock, ArrowUp, ArrowDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

export interface PostProps {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar?: string;
  createdAt: Date;
  votes: number;
  commentCount: number;
  tags: string[];
  category: 'crops' | 'livestock' | 'equipment' | 'general' | 'market';
}

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

const PostCard: React.FC<PostProps> = ({
  id,
  title,
  content,
  author,
  authorAvatar,
  createdAt,
  votes,
  commentCount,
  tags,
  category,
}) => {
  return (
    <article className="bg-white rounded-lg border border-border hover:shadow-md transition-shadow duration-200 overflow-hidden animate-fade-in">
      <div className="flex">
        {/* Voting sidebar */}
        <div className="flex flex-col items-center py-4 px-2 bg-muted/30">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowUp className="h-5 w-5" />
          </Button>
          <span className="font-medium text-sm my-1">{votes}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowDown className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Main content */}
        <div className="flex flex-col p-4 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={`${getCategoryColor(category)}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Avatar className="h-5 w-5 mr-1">
                <AvatarImage src={authorAvatar} alt={author} />
                <AvatarFallback className="text-[10px]">
                  {author.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span>{author}</span>
              <span className="mx-1">•</span>
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
            </div>
          </div>
          
          <Link to={`/post/${id}`}>
            <h3 className="text-lg font-semibold mb-2 text-soil-brown-dark hover:text-soil-brown-DEFAULT">{title}</h3>
          </Link>
          
          <p className="text-sm text-muted-foreground mb-3">{content.length > 180 ? content.substring(0, 180) + '...' : content}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs bg-gray-100">
                #{tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center gap-2 mt-auto">
            <Button variant="ghost" size="sm" className="text-xs">
              <MessageSquare className="h-4 w-4 mr-1" />
              {commentCount} Comments
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
