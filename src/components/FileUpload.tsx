import React, { useRef } from 'react';
import Dropzone from 'dropzone';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const dropzoneRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (dropzoneRef.current) {
      const dropzone = new Dropzone(dropzoneRef.current, {
        url: '/',
        autoProcessQueue: false,
        acceptedFiles: '.mcap',
        init: function () {
          this.on('addedfile', (file) => {
            onFileSelect(file);
          });
        },
      });

      return () => {
        dropzone.destroy();
      };
    }
  }, [onFileSelect]);

  return (
    <div
      ref={dropzoneRef}
      className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors border-gray-300 hover:border-blue-400"
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        Drag and drop an MCAP file here, or click to select
      </p>
    </div>
  );
};