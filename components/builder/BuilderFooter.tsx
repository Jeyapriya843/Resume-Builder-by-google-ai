
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { steps } from './stepsConfig';
import { Icons } from '../ui/Icons';

const BuilderFooter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentStepIndex = steps.findIndex(step => location.pathname.includes(step.path));
  const activeIndex = currentStepIndex === -1 ? 0 : currentStepIndex;
  const isLastStep = activeIndex === steps.length - 1;

  const handleBack = () => {
    if (activeIndex > 0) {
      navigate(steps[activeIndex - 1].path);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      navigate(steps[activeIndex + 1].path);
    } else {
      // From ATS Boost, we go to final preview
      navigate('/preview');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 xl:right-[450px] bg-white border-t border-gray-200 z-30 transition-all duration-300">
      <div className="flex justify-between items-center p-4 md:px-8 max-w-7xl mx-auto">
        
        <button 
          onClick={handleBack}
          disabled={activeIndex === 0}
          className={`text-gray-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors ${activeIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          Back
        </button>

        <button 
          onClick={handleNext}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
        >
          {isLastStep ? 'Finish & Review' : 'Next Step'}
          <Icons.ChevronRight size={18} />
        </button>

      </div>
    </div>
  );
};

export default BuilderFooter;
