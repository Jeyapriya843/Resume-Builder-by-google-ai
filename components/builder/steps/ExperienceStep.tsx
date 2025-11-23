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
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Work Experience</h2>
        <p className="text-gray-500">Highlight your career journey and achievements.</p>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {resumeData.experience.map((exp, index) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group"
            >
              <button 
                onClick={() => removeExperience(exp.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Icons.Trash2 size={18} />
              </button>
              
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Position {index + 1}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input 
                  placeholder="Job Title" 
                  value={exp.jobTitle}
                  onChange={(e) => updateExperienceItem(exp.id, 'jobTitle', e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white"
                />
                <input 
                  placeholder="Employer" 
                  value={exp.employer}
                  onChange={(e) => updateExperienceItem(exp.id, 'employer', e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white"
                />
                <div className="grid grid-cols-2 gap-4">
                   <input 
                      type="text" 
                      placeholder="Start Date" 
                      onFocus={(e) => e.target.type = 'date'}
                      value={exp.startDate}
                      onChange={(e) => updateExperienceItem(exp.id, 'startDate', e.target.value)}
                      className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white"
                   />
                   <input 
                      type="text" 
                      placeholder="End Date" 
                      onFocus={(e) => e.target.type = 'date'}
                      value={exp.endDate}
                      onChange={(e) => updateExperienceItem(exp.id, 'endDate', e.target.value)}
                      className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white"
                   />
                </div>
                <input 
                  placeholder="City, Country" 
                  value={exp.location}
                  onChange={(e) => updateExperienceItem(exp.id, 'location', e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white"
                />
              </div>
              <textarea 
                placeholder="Description of your achievements..." 
                value={exp.description}
                onChange={(e) => updateExperienceItem(exp.id, 'description', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white h-32 resize-none"
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <button 
          onClick={addExperience}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
        >
          <Icons.Plus size={20} />
          Add Experience
        </button>
      </div>

      <div className="mt-10 flex justify-between">
        <button 
          onClick={() => navigate('/builder/header')}
          className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
        >
          Back
        </button>
        <button 
          onClick={() => navigate('/builder/education')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default ExperienceStep;