import React from 'react';

const VideoItem = ({ video }) => {
  return (
    <div className="border p-2 rounded shadow">
      <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover rounded" />
      <h3 className="mt-2 font-bold">{video.title}</h3>
    </div>
  );
};

export default VideoItem;
