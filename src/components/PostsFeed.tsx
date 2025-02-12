import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, BriefcaseIcon, GraduationCap, BadgeCheck, Send, Bell, UserIcon, Image as ImageIcon, X } from 'lucide-react';

type PostType = 'recruitment' | 'training' | 'general';
type Profile = 'developer' | 'designer' | 'marketing' | 'teacher';

interface Post {
  id: number;
  type: PostType;
  author: {
    name: string;
    avatar: string;
    verified?: boolean;
    profile?: Profile[];
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  salary?: string;
  location?: string;
  requirements?: string[];
  price?: number;
  duration?: string;
  level?: string;
}

const posts: Post[] = [
  {
    id: 1,
    type: 'recruitment',
    author: {
      name: 'TechCorp',
      avatar: 'https://images.unsplash.com/photo-1549924231-f129b911e442',
      verified: true
    },
    content: 'Nous recherchons un développeur React senior pour rejoindre notre équipe.',
    likes: 45,
    comments: 12,
    timestamp: 'Il y a 2 heures',
    salary: '55-65k€',
    location: 'Paris, France',
    requirements: ['5+ ans d\'expérience', 'React', 'TypeScript', 'Node.js'],
  },
  {
    id: 2,
    type: 'training',
    author: {
      name: 'Marie Dubois',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      verified: true,
      profile: ['teacher']
    },
    content: 'Nouvelle formation React avancée disponible ! Apprenez les dernières fonctionnalités et les meilleures pratiques.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    likes: 128,
    comments: 34,
    timestamp: 'Il y a 3 heures',
    price: 299,
    duration: '12 heures',
    level: 'Avancé'
  }
];

export function PostsFeed() {
  const [newPost, setNewPost] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userProfile] = useState<Profile>('developer');
  const [notifications, setNotifications] = useState<string[]>([]);

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      // Logique d'ajout de post
      setNewPost('');
      setSelectedImage(null);
    }
  };

  const handleImageSelect = () => {
    // Simuler la sélection d'image
    setSelectedImage('https://images.unsplash.com/photo-1633356122544-f134324a6cee');
  };

  const canApplyForJob = (requirements: string[]) => {
    // Simuler la vérification des compétences de l'utilisateur
    return userProfile === 'developer';
  };

  const canCreateTraining = () => {
    // Vérifier si l'utilisateur est autorisé à créer des formations
    return false;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Création de post */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-start space-x-4">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
            alt="Your avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Partagez quelque chose..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
            {selectedImage && (
              <div className="relative mt-2">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="flex items-center justify-between mt-3">
              <div className="flex space-x-2">
                <button
                  onClick={handleImageSelect}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handlePostSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{post.author.name}</h3>
                      {post.author.verified && (
                        <BadgeCheck className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {post.type === 'recruitment' && (
                    <BriefcaseIcon className="w-5 h-5 text-gray-500" />
                  )}
                  {post.type === 'training' && (
                    <GraduationCap className="w-5 h-5 text-gray-500" />
                  )}
                  <Bell className="w-5 h-5 text-gray-500 cursor-pointer" />
                </div>
              </div>

              <p className="text-gray-800 mb-4">{post.content}</p>

              {post.type === 'recruitment' && post.requirements && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Détails du poste</span>
                    <span className="text-green-600 font-medium">{post.salary}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{post.location}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                  {canApplyForJob(post.requirements) && (
                    <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                      Postuler
                    </button>
                  )}
                </div>
              )}

              {post.type === 'training' && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Détails de la formation</span>
                    <span className="text-green-600 font-medium">{post.price}€</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{post.duration}</span>
                    <span>•</span>
                    <span>{post.level}</span>
                  </div>
                  <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Voir la formation
                  </button>
                </div>
              )}

              {post.image && (
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                    <Heart className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Zone de commentaire */}
            <div className="px-4 py-3 bg-gray-50 border-t">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                  alt="Your avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    placeholder="Écrire un commentaire..."
                    className="flex-1 bg-white border rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 text-white p-2 rounded-r-full hover:bg-blue-700">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}