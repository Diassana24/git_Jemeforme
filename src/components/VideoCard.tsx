import React, { useState, useRef } from 'react';
import { Heart, MessageCircle, Users, Download, Share2, Play, Pause, EuroIcon } from 'lucide-react';
import { Course } from '../types';

interface VideoCardProps extends Course {
  onSelect: () => void;
}

export function VideoCard({ url, title, author, likes, comments, students, price, onSelect }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative bg-black h-full mb-4 rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-cover"
        loop
        onClick={togglePlay}
      />
      <button
        onClick={togglePlay}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 p-4 rounded-full"
      >
        {isPlaying ? (
          <Pause className="w-8 h-8 text-white" />
        ) : (
          <Play className="w-8 h-8 text-white" />
        )}
      </button>
      
      <div className="absolute bottom-0 left-0 right-16 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h3 className="text-white font-bold text-lg">{title}</h3>
        <p className="text-white/80">{author}</p>
        <button
          onClick={onSelect}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-colors"
        >
          <EuroIcon className="w-4 h-4" />
          <span>{price}€</span>
        </button>
      </div>

      <div className="absolute right-2 bottom-20 flex flex-col items-center space-y-4">
        <button className="group flex flex-col items-center">
          <div className="bg-black/50 p-2 rounded-full">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-sm mt-1">{likes}</span>
        </button>

        <button className="group flex flex-col items-center">
          <div className="bg-black/50 p-2 rounded-full">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-sm mt-1">{comments}</span>
        </button>

        <button className="group flex flex-col items-center">
          <div className="bg-black/50 p-2 rounded-full">
            <Users className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-sm mt-1">{students}</span>
        </button>

        <button className="group flex flex-col items-center">
          <div className="bg-black/50 p-2 rounded-full">
            <Download className="w-6 h-6 text-white" />
          </div>
        </button>

        <button className="group flex flex-col items-center">
          <div className="bg-black/50 p-2 rounded-full">
            <Share2 className="w-6 h-6 text-white" />
          </div>
        </button>
      </div>
    </div>
  );
}