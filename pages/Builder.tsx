import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Stepper from '../components/builder/Stepper';
import HeaderStep from '../components/builder/steps/HeaderStep';
import ExperienceStep from '../components/builder/steps/ExperienceStep';
import EducationStep from '../components/builder/steps/EducationStep';
import SkillsStep from '../components/builder/steps/SkillsStep';
import SummaryStep from '../components/builder/steps/SummaryStep';
import ProjectsStep from '../components/builder/steps/ProjectsStep';

const Builder: React.FC = () => {
  const location = useLocation();
  
  // Map routes to step numbers
  const stepMap: Record<string, number> = {
    'header': 1,
    'experience': 2,
    'education': 3,
    'projects': 4, 
    'skills': 5,
    'summary': 6
  };

  const currentPath = location.pathname.split('/').pop() || 'header';
  const currentStep = stepMap[currentPath] || 1;
  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-col h-screen bg-white selection:bg-blue-100">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex h-full">
           <Stepper />
        </div>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-white">
           {/* Top Progress Header */}
           <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm pt-8 px-8 pb-4 border-b border-gray-100 md:border-none">
              <div className="max-w-3xl mx-auto">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Step {currentStep} of {totalSteps}</span>
                 </div>
                 <div className="h-1.5 w-48 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-navy-900 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                 </div>
              </div>
           </div>

           <div className="p-4 md:p-12 pt-4">
             <Routes>
               <Route path="/" element={<Navigate to="header" replace />} />
               <Route path="header" element={<HeaderStep />} />
               <Route path="experience" element={<ExperienceStep />} />
               <Route path="education" element={<EducationStep />} />
               <Route path="projects" element={<ProjectsStep />} />
               <Route path="skills" element={<SkillsStep />} />
               <Route path="summary" element={<SummaryStep />} />
             </Routes>
           </div>
        </main>
      </div>
    </div>
  );
};

export default Builder;