import React, { useState, useRef, useEffect } from 'react';
import { Play, CheckCircle2, MessageSquare, X, Send, Heart, Bell, Users, ThumbsUp, Share2, Download, Image as ImageIcon, Mic, Video as VideoIcon, FileText, ChevronRight, Lock, MessageCircle } from 'lucide-react';
import { Course, CurrentLesson, Message, Teacher } from '../types';

interface CourseViewerProps {
  course: Course;
  currentLesson: CurrentLesson | null;
  onLessonSelect: (chapterId: number, lessonId: number) => void;
  isChatOpen: boolean;
  onToggleChat: () => void;
  messages: Message[];
  onSendMessage: (content: string, type?: 'text' | 'image' | 'video' | 'audio', fileUrl?: string) => void;
  teachers: Teacher[];
  onMessageReview: (messageId: number, status: 'approved' | 'rejected', teacherId: string) => void;
}

export function CourseViewer({ 
  course, 
  currentLesson, 
  onLessonSelect, 
  isChatOpen, 
  onToggleChat, 
  messages, 
  onSendMessage, 
  teachers, 
  onMessageReview 
}: CourseViewerProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [uploadType, setUploadType] = useState<'image' | 'audio' | 'video' | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const currentChapter = course.chapters.find(chapter => chapter.id === currentLesson?.chapterId);
  const lesson = currentChapter?.lessons.find(lesson => lesson.id === currentLesson?.lessonId);

  const handleFileUpload = (type: 'image' | 'audio' | 'video') => {
    const fileUrls = {
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
      audio: 'https://example.com/audio.mp3',
      video: 'https://example.com/video.mp4'
    };
    
    onSendMessage(`Fichier ${type} envoyé`, type, fileUrls[type]);
    setUploadType(null);
  };

  const comments = [
    {
      id: 1,
      author: "Sophie Martin",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
      content: "Excellente explication des concepts de base. J'ai beaucoup appris !",
      likes: 24,
      timestamp: "Il y a 2 jours"
    },
    {
      id: 2,
      author: "Lucas Dubois",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
      content: "Pourriez-vous approfondir la partie sur les sélecteurs CSS ?",
      likes: 15,
      timestamp: "Il y a 3 jours"
    }
  ];

  return (
    <div className="flex h-[calc(100vh-5rem)]">
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
              alt="Student"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold">Zé Mariam</h3>
              <p className="text-sm text-gray-500">Étudiant</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h4 className="font-medium mb-4">Mes formations</h4>
            <div className="space-y-3">
              {course.chapters.map((chapter) => (
                <div key={chapter.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-sm">{chapter.title}</h5>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    {chapter.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => !lesson.isLocked && onLessonSelect(chapter.id, lesson.id)}
                        className={`w-full flex items-center justify-between p-2 rounded text-sm ${
                          currentLesson?.lessonId === lesson.id
                            ? 'bg-blue-50 text-blue-600'
                            : lesson.isLocked
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {lesson.isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : lesson.isLocked ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                          <span>{lesson.title}</span>
                        </div>
                        <span>{lesson.duration}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`flex-1 bg-gray-50 ${isChatOpen ? 'mr-80' : ''} overflow-y-auto`}>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="aspect-video rounded-xl overflow-hidden bg-black mb-6">
            {lesson?.videoUrl ? (
              <video src={course.url} className="w-full h-full object-cover" controls />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Play className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold mb-2">{lesson?.title || course.title}</h1>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={course.authorAvatar}
                  alt={course.author}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{course.author}</h3>
                  <p className="text-sm text-gray-500">{course.students} étudiants</p>
                </div>
                <button
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className={`ml-4 px-4 py-2 rounded-full ${
                    isSubscribed
                      ? 'bg-gray-200 text-gray-800'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {isSubscribed ? 'Abonné' : "S'abonner"}
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{course.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                  <Share2 className="w-6 h-6" />
                  <span>Partager</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                  <Download className="w-6 h-6" />
                  <span>Télécharger</span>
                </button>
              </div>
            </div>
            <p className="text-gray-700">{course.description}</p>
          </div>

          <button
            onClick={onToggleChat}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
          >
            <MessageCircle className="w-6 h-6" />
          </button>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Commentaires ({comments.length})</h2>
            
            <div className="flex items-start space-x-4 mb-8">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
                alt="Your avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  placeholder="Ajouter un commentaire..."
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Commenter
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{comment.author}</h4>
                      <span className="text-sm text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{comment.content}</p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{comment.likes}</span>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 text-sm">
                        Répondre
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isChatOpen && (
        <div className="fixed right-0 top-0 w-80 h-full bg-white shadow-lg flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <h3 className="font-semibold">Chat avec le professeur</h3>
              <Bell className="w-5 h-5 text-gray-500" />
            </div>
            <button onClick={onToggleChat} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isTeacher ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] ${message.isTeacher ? 'order-2 ml-2' : 'order-1 mr-2'}`}>
                  <div className={`rounded-lg p-3 ${
                    message.isTeacher ? 'bg-gray-100' : 'bg-blue-600 text-white'
                  }`}>
                    {message.type === 'image' && (
                      <img src={message.fileUrl} alt="Uploaded" className="rounded mb-2" />
                    )}
                    {message.content}
                  </div>
                  <div className={`text-xs mt-1 ${message.isTeacher ? 'text-left' : 'text-right'}`}>
                    {message.userName} • {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <img
                  src={message.userAvatar}
                  alt={message.userName}
                  className={`w-8 h-8 rounded-full ${message.isTeacher ? 'order-1' : 'order-2'}`}
                />
              </div>
            ))}
          </div>

          {uploadType && (
            <div className="p-4 border-t border-b bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Upload {uploadType}</span>
                <button
                  onClick={() => setUploadType(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => handleFileUpload(uploadType)}
                className="w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Sélectionner un fichier
              </button>
            </div>
          )}

          <div className="p-4 border-t">
            <div className="flex space-x-2 mb-2">
              <button
                onClick={() => setUploadType('image')}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setUploadType('audio')}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={() => setUploadType('video')}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <VideoIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <FileText className="w-5 h-5" />
              </button>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newMessage.trim()) {
                    onSendMessage(newMessage);
                    setNewMessage('');
                  }
                }}
              />
              <button
                onClick={() => {
                  if (newMessage.trim()) {
                    onSendMessage(newMessage);
                    setNewMessage('');
                  }
                }}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}