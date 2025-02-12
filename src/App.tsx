import React, { useState } from 'react';
import { Video, FileText, ShoppingBag, GraduationCap, ShoppingCart } from 'lucide-react';
import { VideoFeed } from './components/VideoFeed';
import { PostsFeed } from './components/PostsFeed';
import { Shop } from './components/Shop';
import { Courses } from './components/Courses';
import { CourseDetail } from './components/CourseDetail';
import { CourseViewer } from './components/CourseViewer';
import { Cart } from './components/Cart';
import { CartProvider, useCart } from './context/CartContext';
import { Tab, Course, CurrentLesson, Message } from './types';
import { teachers, courses } from './data';

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('video');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [purchasedCourses, setPurchasedCourses] = useState<number[]>([]);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<CurrentLesson | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [teachersList, setTeachersList] = useState(teachers);

  const { cart, toggleCart } = useCart();

  const tabs = [
    { id: 'video', icon: Video, label: 'Vidéo' },
    { id: 'posts', icon: FileText, label: 'Posts' },
    { id: 'shop', icon: ShoppingBag, label: 'Shop' },
    { id: 'courses', icon: GraduationCap, label: 'Cours' },
  ];

  const handlePurchase = () => {
    const newPurchasedCourses = [...purchasedCourses, ...cart.map(item => item.id)];
    setPurchasedCourses(newPurchasedCourses);
    
    const firstPurchasedCourse = courses.find(course => cart.some(item => item.id === course.id));
    if (firstPurchasedCourse) {
      setCurrentCourse(firstPurchasedCourse);
      if (firstPurchasedCourse.chapters.length > 0 && firstPurchasedCourse.chapters[0].lessons.length > 0) {
        setCurrentLesson({
          chapterId: firstPurchasedCourse.chapters[0].id,
          lessonId: firstPurchasedCourse.chapters[0].lessons[0].id
        });
      }
      setActiveTab('viewer');
    }
  };

  const handleSendMessage = (content: string, type: 'text' | 'image' | 'video' | 'audio' = 'text', fileUrl?: string) => {
    const newMsg: Message = {
      id: messages.length + 1,
      userId: 'student1',
      userName: 'Étudiant',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80',
      content,
      timestamp: new Date(),
      type,
      fileUrl,
      status: 'pending'
    };
    setMessages([...messages, newMsg]);

    const availableTeachers = teachersList.sort((a, b) => b.rating - a.rating);
    const selectedTeacher = availableTeachers[Math.floor(Math.random() * availableTeachers.length)];
    
    setTeachersList(teachers.map(teacher => 
      teacher.id === selectedTeacher.id 
        ? { ...teacher, notificationCount: teacher.notificationCount + 1 }
        : teacher
    ));
  };

  const handleMessageReview = (messageId: number, status: 'approved' | 'rejected', teacherId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, status } : msg
    ));

    setTeachersList(teachers.map(teacher => 
      teacher.id === teacherId 
        ? { 
            ...teacher, 
            notificationCount: Math.max(0, teacher.notificationCount - 1),
            earnings: status === 'approved' ? teacher.earnings + 5 : teacher.earnings
          }
        : teacher
    ));
  };

  const renderContent = () => {
    if (activeTab === 'viewer' && currentCourse) {
      return (
        <CourseViewer
          course={currentCourse}
          currentLesson={currentLesson}
          onLessonSelect={(chapterId, lessonId) => setCurrentLesson({ chapterId, lessonId })}
          isChatOpen={isChatOpen}
          onToggleChat={() => setIsChatOpen(!isChatOpen)}
          messages={messages}
          onSendMessage={handleSendMessage}
          teachers={teachersList}
          onMessageReview={handleMessageReview}
        />
      );
    }

    if (selectedCourse) {
      return (
        <CourseDetail
          course={selectedCourse}
          onBack={() => setSelectedCourse(null)}
          isPurchased={purchasedCourses.includes(selectedCourse.id)}
        />
      );
    }

    switch (activeTab) {
      case 'video':
        return <VideoFeed onCourseSelect={setSelectedCourse} />;
      case 'posts':
        return <PostsFeed />;
      case 'shop':
        return <Shop />;
      case 'courses':
        return <Courses />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex space-x-8">
              {tabs.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as Tab)}
                  className={`flex flex-col items-center space-y-1 ${
                    activeTab === id ? 'text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={toggleCart}
              className="relative p-2"
            >
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <Cart onPurchase={handlePurchase} />

      <main className="pt-20 pb-16">
        {renderContent()}
      </main>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;