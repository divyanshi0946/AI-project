export type User = {
  id: string;
  name: string;
  avatar: string;
  points: number;
  streak: number;
  studyTime: number; // in minutes
  level: number;
};

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
};

export type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
};

export type Room = {
  id: string;
  name: string;
  activeUsers: number;
  type: 'public' | 'private';
  tags: string[];
};

export type Reward = {
  id: string;
  name: string;
  cost: number;
  description: string;
  icon: string;
  category: 'theme' | 'avatar' | 'badge';
  unlocked: boolean;
};
