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
  const [readHeaderStamp, setReadHeaderStamp] = useState(true);


  const handleFileSelect = async (file: File) => {
    setLoading(true);
    try {
      // Get the file path from the File object
      const filePath = (file as any).path;
      if (!filePath) {
        throw new Error('File path not available');
      }

      // Send the file path and readHeaderStamp option to the main process for parsing
      const result = await ipcRenderer.invoke('parse-mcap', filePath, readHeaderStamp);
      
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

  const handleCloseMCAP = () => {
    setTopics([]);
    setCurrentTime(0);
    setTimeRange({ start: 0, end: 0 });
  };

  const openLinkInBrowser = (url: string) => {
    ipcRenderer.invoke('open-external', url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative pb-24">
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
              <>
                <FileUpload onFileSelect={handleFileSelect} />
                <div className="mt-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={readHeaderStamp}
                      onChange={() => setReadHeaderStamp(!readHeaderStamp)}
                    />
                    <span className="ml-2">Read Header Stamp</span>
                  </label>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Timeline</h2>
                <button
                  onClick={handleCloseMCAP}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Close MCAP
                </button>
              </div>
              <Timeline
                topics={topics}
                currentTime={currentTime}
                onTimeChange={handleTimeChange}
                startTime={timeRange.start}
                endTime={timeRange.end}
              />
            </div>
          </div>
        )}
      </div>
      <footer className="absolute bottom-0 left-0 w-full py-6 text-gray shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} MCAP Timeline Viewer. All rights reserved.
            </p>
            <p className="text-sm">
              Developed with ❤️ by <button onClick={() => openLinkInBrowser('https://federicosarrocco.com')} className="text-blue-700 hover:underline transition duration-300">Federico Sarrocco</button>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;