import React, { useState } from 'react';
import { ArrowLeft, Play, Lock, BookOpen, Video, Users, Download } from 'lucide-react';
import { Course } from '../types';
import { useCart } from '../context/CartContext';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  isPurchased: boolean;
}

export function CourseDetail({ course, onBack, isPurchased }: CourseDetailProps) {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const { addToCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Retour</span>
      </button>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="aspect-video rounded-xl overflow-hidden mb-6">
            <video
              src={course.url}
              className="w-full h-full object-cover"
              controls
            />
          </div>

          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-6">{course.description}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Durée</p>
              <p className="font-semibold">{course.duration}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Niveau</p>
              <p className="font-semibold">{course.level}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Étudiants</p>
              <p className="font-semibold">{course.students}</p>
            </div>
          </div>

          <div className="space-y-4">
            {course.chapters.map((chapter, index) => (
              <div key={chapter.id} className="bg-white rounded-lg shadow">
                <button
                  onClick={() => setSelectedChapter(selectedChapter === chapter.id ? null : chapter.id)}
                  className="w-full flex items-center justify-between p-4"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-600 font-medium">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="text-left">
                      <h3 className="font-semibold">{chapter.title}</h3>
                      <p className="text-sm text-gray-500">{chapter.description}</p>
                    </div>
                  </div>
                  <BookOpen className={`w-5 h-5 transform transition-transform ${
                    selectedChapter === chapter.id ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {selectedChapter === chapter.id && (
                  <div className="border-t">
                    {chapter.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-3">
                          <Play className="w-4 h-4 text-blue-600" />
                          <span>{lesson.title}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-500">
                          <span>{lesson.duration}</span>
                          {lesson.isLocked && !isPurchased && (
                            <Lock className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="sticky top-24">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold mb-4">{course.price}€</div>
            {!isPurchased ? (
              <button
                onClick={() => addToCart({
                  id: course.id,
                  title: course.title,
                  price: course.price
                })}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mb-4"
              >
                Ajouter au panier
              </button>
            ) : (
              <div className="w-full bg-green-100 text-green-800 py-3 px-4 rounded-lg mb-4 text-center">
                Formation achetée
              </div>
            )}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Video className="w-5 h-5" />
                <span>{course.duration} de contenu vidéo</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Users className="w-5 h-5" />
                <span>{course.students} étudiants</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Download className="w-5 h-5" />
                <span>Accès à vie</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}