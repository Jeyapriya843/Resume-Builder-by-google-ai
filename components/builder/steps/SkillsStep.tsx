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
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Skills</h2>
        <p className="text-gray-500">List your professional skills and tools.</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a skill (e.g. React, Project Management)"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white"
          />
          <button 
            onClick={addSkill}
            className="bg-navy-900 text-white px-6 rounded-lg font-medium hover:bg-navy-800 transition-colors"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {resumeData.skills.map((skill) => (
              <motion.span 
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white border border-gray-200 text-navy-900 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm"
              >
                {skill}
                <button 
                  onClick={() => removeSkill(skill)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Icons.X size={14} />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
          {resumeData.skills.length === 0 && (
             <p className="text-gray-400 text-sm italic">No skills added yet.</p>
          )}
        </div>
      </div>

      {/* Suggested Skills Stub */}
      <div className="mt-6">
         <p className="text-sm font-semibold text-gray-500 mb-3">Popular Skills</p>
         <div className="flex flex-wrap gap-2">
            {['Leadership', 'Communication', 'Python', 'Figma', 'Problem Solving'].map(s => (
                <button 
                   key={s} 
                   onClick={() => {
                       if(!resumeData.skills.includes(s)) updateField('skills', [...resumeData.skills, s])
                   }}
                   className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                >
                    + {s}
                </button>
            ))}
         </div>
      </div>

      <div className="mt-10 flex justify-between">
        <button 
          onClick={() => navigate('/builder/education')}
          className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
        >
          Back
        </button>
        <button 
          onClick={() => navigate('/builder/summary')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default SkillsStep;