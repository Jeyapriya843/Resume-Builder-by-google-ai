
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HeaderStep from '../components/builder/steps/HeaderStep';
import ExperienceStep from '../components/builder/steps/ExperienceStep';
import EducationStep from '../components/builder/steps/EducationStep';
import SkillsStep from '../components/builder/steps/SkillsStep';
import SummaryStep from '../components/builder/steps/SummaryStep';
import ProjectsStep from '../components/builder/steps/ProjectsStep';
import FinalizeStep from '../components/builder/steps/FinalizeStep';
import TemplateStep from '../components/builder/steps/TemplateStep';
import LivePreview from '../components/LivePreview';
import BuilderHeader from '../components/builder/BuilderHeader';
import BuilderFooter from '../components/builder/BuilderFooter';

const Builder: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-navy-900">
      
      {/* 1. Top Navigation */}
      <BuilderHeader />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 2. Form Section (Left/Top) */}
        <div className="flex-1 flex flex-col relative min-w-0">
           <main className="flex-1 overflow-y-auto pb-32 scroll-smooth"> {/* Padding bottom for fixed footer */}
              {/* Changed max-w-3xl to max-w-7xl to support wider Template step */}
              <div className="max-w-7xl mx-auto p-4 md:p-8 pt-10">
                 <Routes>
                   <Route path="/" element={<Navigate to="header" replace />} />
                   <Route path="header" element={<HeaderStep />} />
                   <Route path="experience" element={<ExperienceStep />} />
                   <Route path="education" element={<EducationStep />} />
                   <Route path="projects" element={<ProjectsStep />} />
                   <Route path="skills" element={<SkillsStep />} />
                   <Route path="summary" element={<SummaryStep />} />
                   <Route path="finalize" element={<FinalizeStep />} />
                   <Route path="template" element={<TemplateStep />} />
                 </Routes>

                 {/* Mobile/Tablet/Laptop Preview (Hidden on XL screens where sidebar exists) */}
                 <div className="mt-12 xl:hidden border-t border-gray-200 pt-10 max-w-3xl mx-auto">
                    <div className="flex items-center gap-2 mb-6">
                       <span className="bg-navy-900 w-2 h-2 rounded-full"></span>
                       <h3 className="text-xl font-bold text-navy-900">Resume Preview</h3>
                    </div>
                    <div className="bg-gray-200/50 p-4 rounded-xl border border-gray-200 shadow-inner">
                       <LivePreview />
                    </div>
                 </div>

              </div>
           </main>
           
           {/* 3. Fixed Footer for Navigation */}
           {/* The footer component itself handles the width/positioning */}
           <BuilderFooter />
        </div>

        {/* 4. Live Preview Sidebar (Visible only on XL screens) */}
        <aside className="hidden xl:block w-[450px] bg-gray-100 border-l border-gray-200 overflow-hidden relative">
           <div className="absolute inset-0 overflow-y-auto p-8 pb-32">
              <div className="sticky top-8">
                 <LivePreview />
              </div>
           </div>
        </aside>

      </div>
    </div>
  );
};

export default Builder;
