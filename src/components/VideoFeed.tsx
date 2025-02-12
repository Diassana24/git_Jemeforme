import React from 'react';
import { VideoCard } from './VideoCard';
import { courses } from '../data';
import { Course } from '../types';

interface VideoFeedProps {
  onCourseSelect: (course: Course) => void;
}

export function VideoFeed({ onCourseSelect }: VideoFeedProps) {
  return (
    <div className="max-w-md mx-auto h-[calc(100vh-8rem)]">
      {courses.map((video) => (
        <VideoCard key={video.id} {...video} onSelect={() => onCourseSelect(video)} />
      ))}
    </div>
  );
}