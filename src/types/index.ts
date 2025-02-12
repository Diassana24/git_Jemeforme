export type Tab = 'video' | 'posts' | 'shop' | 'courses' | 'viewer';
export type Profile = 'developer' | 'designer' | 'marketing' | 'teacher';
export type Level = 'Débutant' | 'Intermédiaire' | 'Avancé';

export interface Message {
  id: number;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'video' | 'audio';
  fileUrl?: string;
  isTeacher?: boolean;
  status?: 'pending' | 'approved' | 'rejected';
}

export interface Teacher {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  notificationCount: number;
  earnings: number;
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl?: string;
  isLocked?: boolean;
  isCompleted?: boolean;
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  url: string;
  title: string;
  author: string;
  authorAvatar?: string;
  likes: number;
  comments: number;
  students: number;
  price: number;
  description?: string;
  duration?: string;
  level?: Level;
  chapters: Chapter[];
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
}

export interface CurrentLesson {
  chapterId: number;
  lessonId: number;
}