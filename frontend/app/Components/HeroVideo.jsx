"use client"; 

import React, { useEffect, useRef } from 'react';

const HeroVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const savedTime = sessionStorage.getItem('videoCurrentTime');
    if (savedTime && videoRef.current) {
      videoRef.current.currentTime = parseFloat(savedTime);
    }

    const handleTimeUpdate = () => {
      sessionStorage.setItem('videoCurrentTime', videoRef.current.currentTime);
    };

    const videoElement = videoRef.current;
    videoElement?.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoElement?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      // poster="/poster12.png"
      className="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source src="/bbgg.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default HeroVideo;




