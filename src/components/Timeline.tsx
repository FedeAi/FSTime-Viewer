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
  topics: allTopics, // Rename original topics prop
  currentTime,
  onTimeChange,
  startTime,
  endTime
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const timeRange = (endTime - startTime) / zoomLevel;

  // State for displayed topics, initially all topics are displayed
  const [displayedTopics, setDisplayedTopics] = useState<TopicData[]>(allTopics);
  // State for unselected topics, initially empty
  const [unselectedTopics, setUnselectedTopics] = useState<TopicData[]>([]);

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize unselectedTopics and displayedTopics on component mount
  useEffect(() => {
    setDisplayedTopics(allTopics.slice(0, 3)); // Initially display first 3 topics
    setUnselectedTopics(allTopics.slice(3)); // Initially unselect the rest
  }, [allTopics]); // React to changes in allTopics prop


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
    // if(currentCenterTime < currentTime){
    //   setAdjustedTimes({
    //     start: currentCenterTime - timeRange * (2.0/3.0),
    //     end: currentTime + timeRange  * (1.0/3.0),
    //   });
    // }
    // else{
    //   setAdjustedTimes({
    //     start: currentTime - timeRange * (1.0/3.0),
    //     end: currentCenterTime + timeRange * (2.0/3.0),
    //   });
    // }
    setAdjustedTimes({
      start: currentCenterTime - timeRange * 0.5,
      end: currentTime + timeRange  * 0.5,
    });

  }, [zoomLevel, startTime, timeRange]); // Added currentTime to dependency array


  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = displayedTopics.length * 40 + 40; // Adjust height based on number of topics
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [displayedTopics.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawTimeline = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const topicHeight = 30;
      const padding = 10;
      const topPadding = 20; // Add top padding for labels

      // Draw time labels
      const labelCount = 10;
      const labelInterval = (adjustedTimes.end - adjustedTimes.start) / labelCount;
      ctx.fillStyle = '#000';
      ctx.font = '10px Arial';
      for (let i = 0; i <= labelCount; i++) {
        const time = adjustedTimes.start + i * labelInterval;
        const timeStr = new Date(time * 1000).toISOString().substr(11, 12);
        const x = (i / labelCount) * canvas.width;
        ctx.fillText(timeStr, x, 10);
        ctx.beginPath();
        ctx.moveTo(x, 15);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = '#ddd';
        ctx.stroke();
      }

      displayedTopics.forEach((topic, index) => { // Use displayedTopics here
        const y = index * (topicHeight + padding) + topPadding;

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
  }, [displayedTopics, currentTime, adjustedTimes]); // Use displayedTopics here

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
      setZoomLevel(prev => Math.min(prev * 1.1, 800));
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

  const handleRemoveTopic = (topicToRemove: TopicData) => {
    setDisplayedTopics(prevTopics => prevTopics.filter(topic => topic.name !== topicToRemove.name));
    setUnselectedTopics(prevUnselectedTopics => [...prevUnselectedTopics, topicToRemove]);
    setSearchQuery(''); // Clear search query when removing a topic
  };

  const handleAddTopic = (topicToAdd: TopicData) => {
    setUnselectedTopics(prevUnselectedTopics => prevUnselectedTopics.filter(topic => topic.name !== topicToAdd.name));
    setDisplayedTopics(prevDisplayedTopics => [...prevDisplayedTopics, topicToAdd]);
    setSearchQuery(''); // Clear search query when adding a topic
  };

  const filteredUnselectedTopics = unselectedTopics.filter(topic =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={containerRef} className="w-full h-full">

      {/* Topic Control Section */}
      <div className="mb-2">
        <h3 className="text-sm font-semibold mb-1">Displayed Topics</h3>
        <div className="flex flex-wrap gap-2">
          {displayedTopics.map(topic => (
            <div key={topic.name} className="flex items-center space-x-1 border rounded-md px-2 py-1 text-xs bg-gray-100">
              <span>{topic.name}</span>
              <button
                onClick={() => handleRemoveTopic(topic)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={`Remove topic ${topic.name}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas for Timeline */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="border rounded-lg w-full h-full"
      />

      {/* Add Unselected Topics Section */}
      <div className="mt-2">
        <h3 className="text-sm font-semibold mb-1">Add Topics</h3>
        {unselectedTopics.length > 3 ? (
          <div>
            <input
              type="text"
              placeholder="Search topics..."
              className="w-full px-3 py-2 border rounded-md text-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && filteredUnselectedTopics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {filteredUnselectedTopics.map(topic => (
                  <div key={topic.name} className="flex items-center space-x-1 border rounded-md px-2 py-1 text-xs bg-gray-100">
                    <span>{topic.name}</span>
                    <button
                      onClick={() => handleAddTopic(topic)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={`Add topic ${topic.name}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
             {searchQuery && filteredUnselectedTopics.length === 0 && (
              <div className="text-gray-500 text-xs mt-1">No topics found.</div>
            )}
          </div>
          
        ) : (
          <div className="flex flex-wrap gap-2">
            {unselectedTopics.map(topic => (
              <div key={topic.name} className="flex items-center space-x-1 border rounded-md px-2 py-1 text-xs bg-gray-100">
                <span>{topic.name}</span>
                <button
                  onClick={() => handleAddTopic(topic)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={`Add topic ${topic.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            ))}
            {unselectedTopics.length === 0 && <div className="text-gray-500 text-xs">No unselected topics.</div>}
          </div>
        )}
      </div>
      {/* Current Time Display */}
      <div className="mt-4 pt-2 border-t border-gray-200">
        <p className="text-s text-gray-500">
          Current Time: <span className="font-medium text-gray-700">{new Date(currentTime * 1000).toISOString().substr(11, 12)}</span>
        </p>
      </div>
    </div>
  );
};