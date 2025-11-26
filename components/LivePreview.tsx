import React, { useRef, useState, useEffect } from 'react';
import { useResume } from '../App';
import { TemplatesMap } from './templates';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { steps } from './builder/stepsConfig';

const A4_WIDTH_PX = 793.7; // 210mm at 96 DPI

const LivePreview: React.FC = () => {
  const { resumeData } = useResume();
  const navigate = useNavigate();
  const location = useLocation();
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const SelectedTemplate = TemplatesMap[resumeData.templateId] || TemplatesMap['professional'];

  useEffect(() => {
    const calculateScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.offsetWidth;
        setScale(containerWidth / A4_WIDTH_PX);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  const currentStepIndex = steps.findIndex(step => location.pathname.includes(step.path));
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleContinue = () => {
    if (currentStepIndex < steps.length - 1) {
      // Navigate to the next step
      const nextStep = steps[currentStepIndex + 1];
      navigate(nextStep.path);
    } else {
      // On the last step, navigate to the final preview page
      navigate('/preview');
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      const prevStep = steps[currentStepIndex - 1];
      navigate(prevStep.path);
    }
  };

  return (
    <div className="w-full">
      {/* Scaled Preview */}
      <div 
        ref={previewContainerRef}
        className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
        style={{ aspectRatio: '210 / 297' }}
      >
        <div 
          className="origin-top-left"
          style={{ 
            width: `${A4_WIDTH_PX}px`,
            height: '1122.5px',
            transform: `scale(${scale})`, 
            transformOrigin: 'top left',
          }}
        >
          <SelectedTemplate data={resumeData} />
        </div>
      </div>
      
      {/* Actions */}
      <div className="mt-6 flex flex-col items-center gap-4">
        <Link 
          to="/templates"
          className="text-center w-full text-sm font-semibold text-blue-600 hover:underline"
        >
          Change Template
        </Link>
        <div className="flex items-center justify-center gap-3 w-full max-w-xs">
          {currentStepIndex > 0 && (
            <button
              onClick={handleBack}
              className="flex-1 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
          <button 
            onClick={handleContinue}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            {isLastStep ? 'Preview & Download' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;