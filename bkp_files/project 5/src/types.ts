export interface User {
  id: string;
  name: string;
  avatar: string;
  farmType: string;
  location: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string;
  userAvatar: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category: 'ploughing' | 'fertilizers' | 'livestock' | 'general';
  userId: string;
  userName: string;
  userAvatar: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  image?: string;
}