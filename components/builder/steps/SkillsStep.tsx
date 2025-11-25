import React, { useState } from 'react';
import { useResume } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../../ui/Icons';
import { motion, AnimatePresence } from 'framer-motion';

const SkillsStep: React.FC = () => {
  const { resumeData, updateField } = useResume();
  const navigate = useNavigate();
  const [currentSkill, setCurrentSkill] = useState('');

  const addSkill = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (currentSkill.trim() && !resumeData.skills.includes(currentSkill.trim())) {
      updateField('skills', [...resumeData.skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateField('skills', resumeData.skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-navy-900 mb-2">Skills</h2>
        <p className="text-gray-500">List your roles, achievements, and impact at work</p>
      </div>

      {/* Best Practice Banner */}
      <div className="flex items-center gap-3 mb-8">
         <span className="bg-navy-900 text-white text-xs font-bold px-2 py-1 rounded-sm">Best practice</span>
         <span className="text-sm text-gray-500">The best practice goes here</span>
      </div>

      <div className="space-y-2">
         <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">Skills</label>
            <button className="flex items-center gap-1 bg-[#8B5CF6] text-white text-xs px-3 py-1.5 rounded-md hover:bg-[#7C3AED] transition-colors">
               <Icons.Sparkles size={12} />
               Generate
            </button>
         </div>
         
         <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 min-h-[120px]">
            <div className="flex flex-wrap gap-3 mb-4">
               <AnimatePresence>
                  {resumeData.skills.map((skill) => (
                  <motion.span 
                     key={skill}
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.8 }}
                     className="bg-white border border-navy-900 text-navy-900 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-3 shadow-sm"
                  >
                     {skill}
                     <button 
                        onClick={() => removeSkill(skill)}
                        className="text-gray-400 hover:text-navy-900"
                     >
                        <Icons.X size={16} />
                     </button>
                  </motion.span>
                  ))}
               </AnimatePresence>
            </div>
            
            <div className="relative">
               <input 
                  type="text" 
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a skill..."
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-500 outline-none"
               />
               <button 
                  onClick={addSkill}
                  className="absolute right-2 top-2 bg-navy-900 text-white px-4 py-1.5 rounded-md text-xs font-bold hover:bg-navy-800"
               >
                  ADD
               </button>
            </div>
         </div>
      </div>

      {/* Suggested Pills Stub */}
      <div className="mt-8">
         <div className="flex flex-wrap gap-2">
            {['Skills', 'Skills', 'Skills', 'Skills', 'Skills'].map((s, i) => (
                <button 
                   key={i} 
                   className="text-sm border border-navy-900 text-navy-900 px-4 py-1.5 rounded-full hover:bg-navy-50 transition-colors flex items-center gap-1"
                >
                    {s} <Icons.Plus size={14} />
                </button>
            ))}
         </div>
      </div>

      <div className="mt-12 flex justify-end">
        <button 
          onClick={() => navigate('/builder/summary')}
          className="px-10 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SkillsStep;