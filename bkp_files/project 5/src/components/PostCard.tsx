import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Post } from '../types';
import { usePosts } from '../context/PostContext';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { likePost } = usePosts();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      likePost(post.id);
      setIsLiked(true);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ploughing':
        return 'bg-blue-100 text-blue-800';
      case 'fertilizers':
        return 'bg-green-100 text-green-800';
      case 'livestock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <img 
            src={post.userAvatar} 
            alt={post.userName} 
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div>
            <p className="font-medium">{post.userName}</p>
            <p className="text-gray-500 text-sm">{post.createdAt}</p>
          </div>
        </div>
        
        <Link to={`/post/${post.id}`}>
          <h2 className="text-xl font-bold mb-2 hover:text-green-700">{post.title}</h2>
        </Link>
        
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${getCategoryColor(post.category)}`}>
          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
        </span>
        
        <p className="text-gray-700 mb-4">{post.content.length > 200 
          ? `${post.content.substring(0, 200)}...` 
          : post.content}
        </p>
        
        {post.image && (
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
            <span>{post.likes + (isLiked ? 1 : 0)}</span>
          </button>
          
          <Link to={`/post/${post.id}`} className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
            <MessageCircle size={18} />
            <span>{post.comments.length}</span>
          </Link>
          
          <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;