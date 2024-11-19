import React from 'react';
import ReactPlayer from 'react-player';
import './VideoLesson.css';

function VideoLesson({ videoUrl }) {
  return (
    <div className="video-container">
      <ReactPlayer url={videoUrl} controls width="100%" />
    </div>
  );
}

export default VideoLesson;
