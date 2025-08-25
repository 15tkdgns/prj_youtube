import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({ videos }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
