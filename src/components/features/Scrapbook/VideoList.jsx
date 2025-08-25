import React from "react";
import VideoItem from "./VideoItem";

const VideoList = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
