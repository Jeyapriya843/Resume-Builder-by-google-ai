import React from 'react';
import { useResume } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../../ui/Icons';
import { Experience } from '../../../types';
import { motion, AnimatePresence } from 'framer-motion';

const ExperienceStep: React.FC = () => {
  const { resumeData, updateField } = useResume();
  const navigate = useNavigate();

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      employer: '',
      startDate: '',
      endDate: '',
      location: '',
      description: ''
    };
    updateField('experience', [...resumeData.experience, newExp]);
  };

  const removeExperience = (id: string) => {
    updateField('experience', resumeData.experience.filter(exp => exp.id !== id));
  };

  const updateExperienceItem = (id: string, field: keyof Experience, value: string) => {
    const updated = resumeData.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateField('experience', updated);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-navy-900 mb-2">Career Experience</h2>
        <p className="text-gray-500">List your roles, achievements, and impact at work</p>
      </div>

      {/* Best Practice Banner */}
      <div className="flex items-center gap-3 mb-8">
         <span className="bg-navy-900 text-white text-xs font-bold px-2 py-1 rounded-sm">Best practice</span>
         <span className="text-sm text-gray-500">The best practice goes here</span>
      </div>

      <div className="space-y-8">
        <AnimatePresence>
          {resumeData.experience.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="relative group"
            >
              {index > 0 && <hr className="border-gray-100 mb-8" />}
              <button 
                onClick={() => removeExperience(exp.id)}
                className="absolute -right-2 -top-2 text-gray-300 hover:text-red-500 transition-colors"
              >
                <Icons.Trash2 size={18} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                <div className="space-y-1.5">
                   <label className="text-sm font-medium text-gray-700">Job title</label>
                   <input 
                     value={exp.jobTitle}
                     onChange={(e) => updateExperienceItem(exp.id, 'jobTitle', e.target.value)}
                     className="w-full px-4 py-3.5 rounded-lg bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 outline-none"
                     placeholder="Frontend developer"
                   />
                </div>
                <div className="space-y-1.5">
                   <label className="text-sm font-medium text-gray-700">Employer</label>
                   <input 
                     value={exp.employer}
                     onChange={(e) => updateExperienceItem(exp.id, 'employer', e.target.value)}
                     className="w-full px-4 py-3.5 rounded-lg bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 outline-none"
                     placeholder="Anna university"
                   />
                </div>
                <div className="space-y-1.5">
                   <label className="text-sm font-medium text-gray-700">Start date</label>
                   <div className="relative">
                      <input 
                         type="text" 
                         onFocus={(e) => e.target.type = 'date'}
                         value={exp.startDate}
                         onChange={(e) => updateExperienceItem(exp.id, 'startDate', e.target.value)}
                         className="w-full px-4 py-3.5 rounded-lg bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 outline-none"
                         placeholder="Starting date"
                      />
                   </div>
                </div>
                <div className="space-y-1.5">
                   <label className="text-sm font-medium text-gray-700">End date</label>
                   <div className="relative">
                      <input 
                         type="text" 
                         onFocus={(e) => e.target.type = 'date'}
                         value={exp.endDate}
                         onChange={(e) => updateExperienceItem(exp.id, 'endDate', e.target.value)}
                         className="w-full px-4 py-3.5 rounded-lg bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 outline-none"
                         placeholder="Ended date"
                      />
                   </div>
                </div>
              </div>

              <div className="space-y-1.5">
                 <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">Summary</label>
                    <button className="flex items-center gap-1 bg-[#8B5CF6] text-white text-xs px-3 py-1.5 rounded-md hover:bg-[#7C3AED] transition-colors">
                       <Icons.Sparkles size={12} />
                       Generate
                    </button>
                 </div>
                 <textarea 
                   placeholder="Write your summary here" 
                   value={exp.description}
                   onChange={(e) => updateExperienceItem(exp.id, 'description', e.target.value)}
                   className="w-full px-4 py-4 rounded-lg bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 outline-none h-32 resize-none"
                 />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex justify-center mt-8">
           <button 
             onClick={addExperience}
             className="flex items-center gap-2 px-6 py-3 border border-navy-900 rounded-lg text-navy-900 font-semibold hover:bg-gray-50 transition-colors"
           >
             <Icons.Plus size={18} />
             Add experience
           </button>
        </div>
      </div>

      <div className="mt-12 flex justify-end">
        <button 
          onClick={() => navigate('/builder/education')}
          className="px-10 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ExperienceStep;