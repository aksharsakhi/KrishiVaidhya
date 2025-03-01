import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import CommentSection from '../components/CommentSection';
import { Heart, MessageCircle, Share2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const PostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { posts, likePost } = usePosts();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  
  const post = posts.find(p => p.id === postId);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <p className="mb-4">The post you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="text-green-600 hover:underline">
          Return to home page
        </Link>
      </div>
    );
  }

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
    <div className="container mx-auto px-4 py-6">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-600 hover:text-green-700 mb-4"
      >
        <ArrowLeft size={18} className="mr-1" />
        Back
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <img 
              src={post.userAvatar} 
              alt={post.userName} 
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <p className="font-medium text-lg">{post.userName}</p>
              <p className="text-gray-500">{post.createdAt}</p>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
          
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${getCategoryColor(post.category)}`}>
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
          
          <p className="text-gray-700 text-lg mb-6 whitespace-pre-line">{post.content}</p>
          
          {post.image && (
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full max-h-96 object-cover rounded-lg mb-6"
            />
          )}
          
          <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
            <button 
              onClick={handleLike}
              className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
            >
              <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
              <span>{post.likes + (isLiked ? 1 : 0)} likes</span>
            </button>
            
            <div className="flex items-center space-x-2 text-gray-500">
              <MessageCircle size={20} />
              <span>{post.comments.length} comments</span>
            </div>
            
            <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>
          
          <CommentSection postId={post.id} comments={post.comments} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;