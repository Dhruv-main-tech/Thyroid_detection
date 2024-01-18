import React from 'react';
import ReactPlayer from 'react-player';

const VideoBackground = () => {
  return (
    <div className="video-background">
      <ReactPlayer
        url= "../assets/video_background"
        playing={true}
        loop={true}
        muted={true}
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </div>
  );
};

export default VideoBackground;
