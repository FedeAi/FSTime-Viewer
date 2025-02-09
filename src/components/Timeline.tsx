// Language: TypeScript
import React, { useRef, useEffect, useState } from 'react';
import { TopicData } from '../types/mcap';

interface TimelineProps {
  topics: TopicData[];
  currentTime: number;
  onTimeChange: (time: number) => void;
  startTime: number;
  endTime: number;
}

export const Timeline: React.FC<TimelineProps> = ({
  topics,
  currentTime,
  onTimeChange,
  startTime,
  endTime
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const timeRange = (endTime - startTime) / zoomLevel;

  // Store adjusted times in state so they're preserved across renders.
  const [adjustedTimes, setAdjustedTimes] = useState({
    start: startTime,
    end: startTime + timeRange,
  });

  // States for dragging
  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);


  // Update adjusted times when zoomLevel changes.
  useEffect(() => {
    const currentCenterTime = (adjustedTimes.start + adjustedTimes.end) / 2;
    if(currentCenterTime < currentTime){
      setAdjustedTimes({
        start: currentCenterTime - timeRange * (2.0/3.0),
        end: currentTime + timeRange  * (1.0/3.0),
      });
    }
    else{
      setAdjustedTimes({
        start: currentTime - timeRange * (1.0/3.0),
        end: currentCenterTime + timeRange * (2.0/3.0),
      });
    }

  }, [zoomLevel, startTime, timeRange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawTimeline = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const topicHeight = 30;
      const padding = 10;
      
      topics.forEach((topic, index) => {
        const y = index * (topicHeight + padding);
        
        // Draw topic name
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.fillText(topic.name, 5, y + 15);
        
        // Draw messages
        topic.messages.forEach(msg => {
          const x = ((msg.timestamp - adjustedTimes.start) / (adjustedTimes.end - adjustedTimes.start)) * canvas.width;
          ctx.fillStyle = '#2563eb';
          ctx.fillRect(x, y + 20, 2, 8);
          
          if (msg.headerStamp) {
            const stampX = ((msg.headerStamp - adjustedTimes.start) / (adjustedTimes.end - adjustedTimes.start)) * canvas.width;
            ctx.strokeStyle = '#2563eb';
            ctx.beginPath();
            ctx.moveTo(x, y + 24);
            ctx.lineTo(stampX, y + 24);
            ctx.stroke();
          }
        });
      });
      
      // Draw current time indicator
      const timeX = ((currentTime - adjustedTimes.start) / (adjustedTimes.end - adjustedTimes.start)) * canvas.width;
      ctx.strokeStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(timeX, 0);
      ctx.lineTo(timeX, canvas.height);
      ctx.stroke();
    };

    drawTimeline();
  }, [topics, currentTime, adjustedTimes]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const time = adjustedTimes.start + (x / canvas.width) * (adjustedTimes.end - adjustedTimes.start);
    onTimeChange(time);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (e.deltaY < 0) {
      setZoomLevel(prev => Math.min(prev * 1.1, 500));
    } else {
      setZoomLevel(prev => Math.max(prev / 1.1, 1));
    }
  };

  // Drag event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setLastX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !canvasRef.current) return;
    const dx = e.clientX - lastX;
    setLastX(e.clientX);
    const canvas = canvasRef.current;
    const deltaTime = (dx / canvas.width) * (adjustedTimes.end - adjustedTimes.start);
    setAdjustedTimes(prev => ({
      start: prev.start - deltaTime,
      end: prev.end - deltaTime,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={topics.length * 40}
      onClick={handleCanvasClick}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className="border rounded-lg"
    />
  );
};

