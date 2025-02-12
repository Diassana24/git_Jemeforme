import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Play, Lock, CheckCircle2 } from 'lucide-react';
import { courses } from '../data';
import { CourseViewer } from './CourseViewer';
import { Course, CurrentLesson } from '../types';

export function Courses() {
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<CurrentLesson | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  const handleCourseClick = (courseId: number) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
    setExpandedChapter(null);
  };

  const handleChapterClick = (chapterId: number) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  const handleLessonSelect = (course: Course, chapterId: number, lessonId: number) => {
    setSelectedCourse(course);
    setCurrentLesson({ chapterId, lessonId });
  };

  if (selectedCourse) {
    return (
      <CourseViewer
        course={selectedCourse}
        currentLesson={currentLesson}
        onLessonSelect={(chapterId, lessonId) => setCurrentLesson({ chapterId, lessonId })}
        isChatOpen={isChatOpen}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        messages={messages}
        onSendMessage={(content) => {
          setMessages([
            ...messages,
            {
              id: messages.length + 1,
              content,
              timestamp: new Date(),
              userId: 'student1',
              userName: 'Étudiant',
              userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
            }
          ]);
        }}
        teachers={[]}
        onMessageReview={() => {}}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Mes formations</h1>
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => handleCourseClick(course.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={course.authorAvatar}
                  alt={course.author}
                  className="w-12 h-12 rounded-full"
                />
                <div className="text-left">
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.author}</p>
                </div>
              </div>
              {expandedCourse === course.id ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedCourse === course.id && (
              <div className="border-t">
                {course.chapters.map((chapter) => (
                  <div key={chapter.id} className="border-b last:border-b-0">
                    <button
                      onClick={() => handleChapterClick(chapter.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-3">
                        {expandedChapter === chapter.id ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="font-medium">{chapter.title}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {chapter.lessons.length} leçons
                      </span>
                    </button>

                    {expandedChapter === chapter.id && (
                      <div className="bg-gray-50 px-4 pb-4">
                        {chapter.lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() => handleLessonSelect(course, chapter.id, lesson.id)}
                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100"
                          >
                            <div className="flex items-center space-x-3">
                              {lesson.isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              ) : lesson.isLocked ? (
                                <Lock className="w-4 h-4 text-gray-400" />
                              ) : (
                                <Play className="w-4 h-4 text-blue-600" />
                              )}
                              <span className="text-sm">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}