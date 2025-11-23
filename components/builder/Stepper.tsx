import React from 'react';
import { Icons } from '../ui/Icons';
import { useLocation, Link } from 'react-router-dom';

const steps = [
  { id: 'header', label: 'Header', icon: Icons.User, path: '/builder/header' },
  { id: 'experience', label: 'Experience', icon: Icons.Briefcase, path: '/builder/experience' },
  { id: 'education', label: 'Education', icon: Icons.GraduationCap, path: '/builder/education' },
  { id: 'skills', label: 'Skills', icon: Icons.Wrench, path: '/builder/skills' },
  { id: 'summary', label: 'Summary', icon: Icons.FileText, path: '/builder/summary' },
];

const Stepper: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-100 flex-shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8 text-navy-900 font-bold text-xl">
           <Icons.FileText className="text-blue-500" />
           <span>Builder</span>
        </div>
        <nav className="space-y-2">
          {steps.map((step) => {
            const isActive = location.pathname.includes(step.path);
            const Icon = step.icon;
            
            return (
              <Link
                key={step.id}
                to={step.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-navy-900'
                }`}
              >
                <Icon size={18} />
                {step.label}
                {isActive && <Icons.ChevronRight className="ml-auto w-4 h-4" />}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-6 mt-auto border-t border-gray-100">
        <div className="bg-navy-900 rounded-xl p-4 text-white text-center">
            <p className="text-xs text-gray-300 mb-2">Completion Progress</p>
            <div className="w-full bg-navy-800 rounded-full h-2 mb-2">
               <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
            </div>
            <p className="text-xs font-semibold">60% Complete</p>
        </div>
      </div>
    </aside>
  );
};

export default Stepper;