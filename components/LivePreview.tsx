
import React, { useRef, useState, useEffect } from 'react';
import { useResume } from '../App';
import { TemplatesMap } from './templates';
import { Link } from 'react-router-dom';

const A4_WIDTH_PX = 793.7; // 210mm at 96 DPI

const LivePreview: React.FC = () => {
  const { resumeData } = useResume();
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.8); // Start with a safe default

  const SelectedTemplate = TemplatesMap[resumeData.templateId] || TemplatesMap['professional'];

  useEffect(() => {
    if (!previewContainerRef.current) return;

    const updateScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.offsetWidth;
        if (containerWidth > 0) {
          setScale(containerWidth / A4_WIDTH_PX);
        }
      }
    };

    // Initial calculation
    updateScale();

    // Use ResizeObserver to detect container size changes
    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    resizeObserver.observe(previewContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="w-full">
      {/* Header for Preview Pane */}
      <div className="flex justify-between items-center mb-4">
         <h3 className="font-bold text-gray-500 uppercase text-xs tracking-wider">Live Preview</h3>
         <Link 
            to="/templates"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Change Template
          </Link>
      </div>

      {/* Scaled Preview */}
      <div 
        ref={previewContainerRef}
        className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 transition-all duration-300"
        style={{ aspectRatio: '210 / 297' }}
      >
        <div 
          className="origin-top-left"
          style={{ 
            width: `${A4_WIDTH_PX}px`,
            minHeight: '1122.5px', // Standard A4 height px
            transform: `scale(${scale})`, 
            transformOrigin: 'top left',
          }}
        >
          <SelectedTemplate data={resumeData} />
        </div>
      </div>
      
      <div className="mt-4 text-center">
         <p className="text-xs text-gray-400">Preview scales automatically to fit screen</p>
      </div>
    </div>
  );
};

export default LivePreview;
