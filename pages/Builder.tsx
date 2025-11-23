import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Stepper from '../components/builder/Stepper';
import HeaderStep from '../components/builder/steps/HeaderStep';
import ExperienceStep from '../components/builder/steps/ExperienceStep';
import EducationStep from '../components/builder/steps/EducationStep';
import SkillsStep from '../components/builder/steps/SkillsStep';
import SummaryStep from '../components/builder/steps/SummaryStep';

const Builder: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on small mobile, visible on md+ */}
        <div className="hidden md:flex h-full">
           <Stepper />
        </div>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-white p-4 md:p-12">
           <Routes>
             <Route path="/" element={<Navigate to="header" replace />} />
             <Route path="header" element={<HeaderStep />} />
             <Route path="experience" element={<ExperienceStep />} />
             <Route path="education" element={<EducationStep />} />
             <Route path="skills" element={<SkillsStep />} />
             <Route path="summary" element={<SummaryStep />} />
           </Routes>
        </main>
      </div>
    </div>
  );
};

export default Builder;