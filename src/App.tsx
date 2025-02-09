import React, { useState, useCallback } from 'react';
import { FileUpload } from './components/FileUpload';
import { Timeline } from './components/Timeline';
import { TopicData, McapMessage } from './types/mcap';
import { Clock } from 'lucide-react';
const { ipcRenderer } = window.require('electron');


interface Message {
  timestamp: number;
  headerStamp?: number;
  data: any;
}


function App() {
  const [topics, setTopics] = useState<TopicData[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [timeRange, setTimeRange] = useState<{ start: number; end: number }>({ start: 0, end: 0 });
  const [loading, setLoading] = useState(false);
  const [hoveredMessage, setHoveredMessage] = useState<Message | null>(null);


  const handleFileSelect = async (file: File) => {
    setLoading(true);
    try {
      // Get the file path from the File object
      console.log(file);
      const filePath = (file as any).path;
      if (!filePath) {
        throw new Error('File path not available');
      }

      // Send the file path to the main process for parsing
      const result = await ipcRenderer.invoke('parse-mcap', filePath);
      
      setTopics(result.topics);
      setTimeRange(result.timeRange);
      setCurrentTime(result.timeRange.start);
    } catch (error) {
      console.error('Error parsing MCAP file:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeChange = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="h-8 w-8 text-blue-500" />
            MCAP Timeline Viewer
          </h1>
        </header>

        {topics.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8">
            {loading ? (
              <div className="text-center text-gray-600">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p>Parsing MCAP file...</p>
              </div>
            ) : (
              <FileUpload onFileSelect={handleFileSelect} />
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Timeline</h2>
              <Timeline
                topics={topics}
                currentTime={currentTime}
                onTimeChange={handleTimeChange}
                startTime={timeRange.start}
                endTime={timeRange.end}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Current Message Data</h2>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-auto">
                {JSON.stringify(
                  topics
                    .flatMap(t => t.messages)
                    .find(m => m.timestamp === currentTime)?.data,
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;