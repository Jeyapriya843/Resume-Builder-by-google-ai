import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Stepper from '../components/builder/Stepper';
import HeaderStep from '../components/builder/steps/HeaderStep';
import ExperienceStep from '../components/builder/steps/ExperienceStep';
import EducationStep from '../components/builder/steps/EducationStep';
import SkillsStep from '../components/builder/steps/SkillsStep';
import SummaryStep from '../components/builder/steps/SummaryStep';
import ProjectsStep from '../components/builder/steps/ProjectsStep';
import LivePreview from '../components/LivePreview';

const Builder: React.FC = () => {
  const location = useLocation();
  
  const stepMap: Record<string, number> = {
    'header': 1,
    'experience': 2,
    'education': 3,
    'projects': 4, 
    'skills': 5,
    'summary': 6
  };
  const totalSteps = Object.keys(stepMap).length;

  const currentPath = location.pathname.split('/').pop() || 'header';
  const currentStep = stepMap[currentPath] || 1;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* 1. Stepper Sidebar */}
      <div className="w-full lg:w-64 flex-shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-gray-100">
        <Stepper />
      </div>

      {/* Main Content (Forms & Preview) */}
      <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">
        
        {/* 2. Form Content Area (Scrollable) */}
        <main className="flex-1 overflow-y-auto bg-white">
           <div className="p-4 md:p-12 pt-8">
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

        {/* 3. Live Preview Pane */}
        <aside className="w-full xl:w-[450px] flex-shrink-0 bg-gray-50 border-t xl:border-t-0 xl:border-l border-gray-200 p-8 overflow-y-auto">
          <div className="xl:sticky xl:top-8">
             <LivePreview />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Builder;
