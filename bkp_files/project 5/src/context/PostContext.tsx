import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Post, Comment } from '../types';
import { getStoredPosts, storePosts, getCurrentUser } from '../data';
import { formatDistanceToNow } from 'date-fns';

interface PostContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'userId' | 'userName' | 'userAvatar' | 'createdAt' | 'likes' | 'comments'>) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  filterByCategory: (category: string | null) => void;
  filteredPosts: Post[];
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const storedPosts = getStoredPosts();
    setPosts(storedPosts);
    setFilteredPosts(storedPosts);
  }, []);

  useEffect(() => {
    storePosts(posts);
    filterByCategory(activeCategory);
  }, [posts, activeCategory]);

  const addPost = (post: Omit<Post, 'id' | 'userId' | 'userName' | 'userAvatar' | 'createdAt' | 'likes' | 'comments'>) => {
    const currentUser = getCurrentUser();
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      createdAt: formatDistanceToNow(new Date(), { addSuffix: true }),
      likes: 0,
      comments: []
    };
    
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const likePost = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const addComment = (postId: string, content: string) => {
    const currentUser = getCurrentUser();
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      createdAt: formatDistanceToNow(new Date(), { addSuffix: true })
    };

    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, comments: [newComment, ...post.comments] } 
          : post
      )
    );
  };

  const filterByCategory = (category: string | null) => {
    setActiveCategory(category);
    if (!category || category === 'all') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.category === category));
    }
  };

  return (
    <PostContext.Provider value={{ 
      posts, 
      addPost, 
      likePost, 
      addComment, 
      filterByCategory,
      filteredPosts
    }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};