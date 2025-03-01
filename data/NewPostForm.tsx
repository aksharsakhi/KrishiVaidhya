import React, { useState } from 'react';
import { usePosts } from '../context/PostContext';
import { useNavigate } from 'react-router-dom';

const NewPostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'ploughing' | 'fertilizers' | 'livestock' | 'general'>('general');
  const [image, setImage] = useState('');
  const { addPost } = usePosts();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() && content.trim()) {
      addPost({
        title,
        content,
        category,
        image: image.trim() || undefined
      });
      
      navigate('/');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter a descriptive title"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="ploughing">Ploughing</option>
            <option value="fertilizers">Fertilizers</option>
            <option value="livestock">Livestock</option>
            <option value="general">General</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Share your knowledge, ask questions, or start a discussion..."
            rows={6}
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Image URL (optional)
          </label>
          <input
            type="url"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-gray-500 text-sm mt-1">
            Add an image URL to include with your post
          </p>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg mr-2 hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPostForm;