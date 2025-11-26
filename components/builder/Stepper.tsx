import React from 'react';
import { Icons } from '../ui/Icons';
import { useLocation, Link } from 'react-router-dom';
import { steps } from './stepsConfig';

const Stepper: React.FC = () => {
  const location = useLocation();

  // Helper to determine if a step is "done" (simple logic: if we are past it in the list)
  const getStepStatus = (index: number) => {
    const currentStepIndex = steps.findIndex(s => location.pathname.includes(s.path));
    if (currentStepIndex > index) return 'completed';
    if (currentStepIndex === index) return 'active';
    return 'pending';
  };

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col">
      <div className="p-6">
        {/* Logo linked to Landing Page */}
        <Link to="/" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
            <Icons.FileText size={20} />
          </div>
          <span className="font-bold text-xl text-navy-900 tracking-tight">Resume</span>
        </Link>
        
        <nav className="space-y-1">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const isActive = status === 'active';
            const isCompleted = status === 'completed';
            const Icon = step.icon;
            
            return (
              <Link
                key={step.id}
                to={step.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-navy-900 text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-navy-900'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-gray-400'} />
                <span className="flex-1">{step.label}</span>
                {isCompleted && (
                  <div className="bg-navy-900 rounded-full p-0.5">
                    <Icons.Check size={10} className="text-white" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Stepper;
