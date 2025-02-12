import { Teacher, Course } from '../types';

export const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
    rating: 4.8,
    notificationCount: 0,
    earnings: 0
  },
  {
    id: '2',
    name: 'Thomas Martin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
    rating: 4.5,
    notificationCount: 0,
    earnings: 0
  }
];

export const courses: Course[] = [
  {
    id: 1,
    url: 'https://player.vimeo.com/external/394678700.sd.mp4?s=30b62832f5ee894f86c5a53df9c69ac583c8eac8&profile_id=165&oauth2_token_id=57447761',
    title: 'Introduction au Développement Web',
    author: 'Marie Dubois',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
    likes: 1200,
    comments: 45,
    students: 320,
    price: 49.99,
    description: 'Apprenez les bases du développement web avec HTML, CSS et JavaScript. Ce cours complet vous guidera à travers les fondamentaux du web moderne.',
    duration: '6h 30min',
    level: 'Débutant',
    chapters: [
      {
        id: 1,
        title: 'Les bases du HTML',
        description: 'Découvrez les fondamentaux du HTML et la structure des pages web.',
        lessons: [
          { id: 1, title: 'Introduction au HTML', duration: '15min', videoUrl: 'https://example.com/video1', isCompleted: true },
          { id: 2, title: 'Structure d\'une page web', duration: '20min', videoUrl: 'https://example.com/video2' },
          { id: 3, title: 'Les balises essentielles', duration: '25min', videoUrl: 'https://example.com/video3', isLocked: true },
          { id: 4, title: 'Les formulaires', duration: '30min', videoUrl: 'https://example.com/video4', isLocked: true }
        ]
      },
      {
        id: 2,
        title: 'CSS Moderne',
        description: 'Maîtrisez les styles CSS modernes et le responsive design.',
        lessons: [
          { id: 5, title: 'Introduction au CSS', duration: '20min', videoUrl: 'https://example.com/video5' },
          { id: 6, title: 'Flexbox et Grid', duration: '35min', videoUrl: 'https://example.com/video6', isLocked: true },
          { id: 7, title: 'Animations CSS', duration: '25min', videoUrl: 'https://example.com/video7', isLocked: true }
        ]
      }
    ]
  }
];