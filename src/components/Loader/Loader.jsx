import React, { useState, useEffect, memo } from 'react';
import './Loader.css';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [messages] = useState([
    "Preparing your table...",
    "Lighting the candles...",
    "Selecting the finest ingredients...",
    "Setting the ambiance...",
    "Almost ready..."
  ]);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [messages.length]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1));
    });

    return () => cancelAnimationFrame(frame);
  }, [progress]);

  return (
    <div 
      className="loader" 
      role="status" 
      aria-live="polite"
      aria-label="Loading restaurant page"
    >
      <div className="loader-content">
        <div className="loader-spinner" aria-hidden="true">
          <div className="loader-logo"></div>
        </div>
        <p className="loader-text">
          {messages[currentMessage]}
        </p>
        <div className="loader-progress" aria-hidden="true"></div>
      </div>
    </div>
  );
};

export default memo(Loader);