import { Post, User } from './types';
import { formatDistanceToNow } from 'date-fns';

// Mock users
export const users: User[] = [
  {
    id: '1',
    name: 'John Farmer',
    avatar: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    farmType: 'Crop Farming',
    location: 'Iowa, USA'
  },
  {
    id: '2',
    name: 'Sarah Fields',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    farmType: 'Livestock',
    location: 'Texas, USA'
  },
  {
    id: '3',
    name: 'Mike Plough',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    farmType: 'Mixed Farming',
    location: 'Nebraska, USA'
  }
];

// Mock posts
export const posts: Post[] = [
  {
    id: '1',
    title: 'Best practices for ploughing clay soil',
    content: 'I\'ve been struggling with clay soil on my new farm. Any tips on the best ploughing techniques and equipment for this soil type? I\'ve heard that timing is crucial, but I\'m not sure about the optimal moisture conditions.',
    category: 'ploughing',
    userId: '1',
    userName: 'John Farmer',
    userAvatar: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    createdAt: formatDistanceToNow(new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), { addSuffix: true }),
    likes: 24,
    comments: [
      {
        id: '1',
        content: 'I use a chisel plough for my clay soil. Works great when the soil is slightly dry but not too dry.',
        userId: '2',
        userName: 'Sarah Fields',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        createdAt: formatDistanceToNow(new Date(Date.now() - 1000 * 60 * 60 * 24), { addSuffix: true })
      }
    ],
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Organic fertilizers for corn - what\'s working for you?',
    content: 'I\'m looking to switch to organic fertilizers for my corn fields this season. Has anyone had success with specific brands or homemade solutions? I\'m particularly interested in cost-effective options that don\'t compromise yield.',
    category: 'fertilizers',
    userId: '2',
    userName: 'Sarah Fields',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    createdAt: formatDistanceToNow(new Date(Date.now() - 1000 * 60 * 60 * 36), { addSuffix: true }),
    likes: 18,
    comments: [
      {
        id: '2',
        content: 'I\'ve had great results with composted chicken manure. Affordable and effective!',
        userId: '3',
        userName: 'Mike Plough',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        createdAt: formatDistanceToNow(new Date(Date.now() - 1000 * 60 * 60 * 12), { addSuffix: true })
      }
    ],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    title: 'Looking to sell 20 head of Angus cattle',
    content: 'I have 20 Angus cattle for sale, all grass-fed and in excellent health. Located in central Texas. Can arrange transport within 200 miles. Please contact for pricing and more details.',
    category: 'livestock',
    userId: '3',
    userName: 'Mike Plough',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    createdAt: formatDistanceToNow(new Date(Date.now() - 1000 * 60 * 60 * 8), { addSuffix: true }),
    likes: 7,
    comments: [],
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    title: 'New sustainable ploughing techniques discussion',
    content: 'I\'ve been experimenting with conservation tillage methods to reduce soil erosion. Has anyone tried no-till or reduced tillage systems? What equipment modifications did you need to make?',
    category: 'ploughing',
    userId: '2',
    userName: 'Sarah Fields',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    createdAt: formatDistanceToNow(new Date(Date.now() - 1000 * 60 * 60 * 48), { addSuffix: true }),
    likes: 32,
    comments: [
      {
        id: '3',
        content: 'I switched to strip-tillage last year. It\'s a good compromise between conventional and no-till.',
        userId: '1',
        userName: 'John Farmer',
        userAvatar: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        createdAt: formatDistanceToNow(new Date(Date.now() - 1000 * 60 * 60 * 36), { addSuffix: true })
      }
    ],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    title: 'Bulk fertilizer supplier recommendations?',
    content: 'Looking for reliable bulk fertilizer suppliers in the Midwest. Need both NPK and micronutrient mixes. Preferably someone who can provide soil testing services as well.',
    category: 'fertilizers',
    userId: '1',
    userName: 'John Farmer',
    userAvatar: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
    createdAt: formatDistanceToNow(new Date(Date.now() - 1000 * 60 * 60 * 72), { addSuffix: true }),
    likes: 15,
    comments: [],
    image: 'https://images.unsplash.com/photo-1589923188651-268a9765e432?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

// Function to get current user (mock)
export const getCurrentUser = (): User => {
  return users[0];
};

// Local storage functions for posts
export const getStoredPosts = (): Post[] => {
  const storedPosts = localStorage.getItem('farmconnect-posts');
  return storedPosts ? JSON.parse(storedPosts) : posts;
};

export const storePosts = (updatedPosts: Post[]): void => {
  localStorage.setItem('farmconnect-posts', JSON.stringify(updatedPosts));
};