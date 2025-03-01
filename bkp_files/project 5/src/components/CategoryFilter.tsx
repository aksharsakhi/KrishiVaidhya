import React from 'react';
import { Tractor, Leaf, Cog as Cow, Globe } from 'lucide-react';
import { usePosts } from '../context/PostContext';

const CategoryFilter: React.FC = () => {
  const { filterByCategory } = usePosts();
  const [activeCategory, setActiveCategory] = React.useState<string | null>('all');

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
    filterByCategory(category);
  };

  const categories = [
    { id: 'all', name: 'All Topics', icon: <Globe size={18} /> },
    { id: 'ploughing', name: 'Ploughing', icon: <Tractor size={18} /> },
    { id: 'fertilizers', name: 'Fertilizers', icon: <Leaf size={18} /> },
    { id: 'livestock', name: 'Livestock', icon: <Cow size={18} /> },
    { id: 'general', name: 'General', icon: <Globe size={18} /> }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm transition-colors ${
              activeCategory === category.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.icon}
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;