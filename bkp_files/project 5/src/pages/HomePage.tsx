import React from 'react';
import PostCard from '../components/PostCard';
import CategoryFilter from '../components/CategoryFilter';
import { usePosts } from '../context/PostContext';
import { Tractor, Leaf, Cog as Cow, Users } from 'lucide-react';

const HomePage: React.FC = () => {
  const { filteredPosts } = usePosts();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <CategoryFilter />
            
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h2 className="text-lg font-semibold mb-3">Community Stats</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Users size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Farmers</p>
                    <p className="font-semibold">1,245</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Tractor size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ploughing Discussions</p>
                    <p className="font-semibold">328</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <Leaf size={18} className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fertilizer Topics</p>
                    <p className="font-semibold">452</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <Cow size={18} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Livestock Listings</p>
                    <p className="font-semibold">187</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-gray-600 mb-4">There are no posts in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;