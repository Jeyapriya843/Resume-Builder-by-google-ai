import React from 'react';
import { useResume } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../../ui/Icons';
import { Education } from '../../../types';
import { motion, AnimatePresence } from 'framer-motion';

const EducationStep: React.FC = () => {
  const { resumeData, updateField } = useResume();
  const navigate = useNavigate();

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      location: ''
    };
    updateField('education', [...resumeData.education, newEdu]);
  };

  const removeEducation = (id: string) => {
    updateField('education', resumeData.education.filter(edu => edu.id !== id));
  };

  const updateEducationItem = (id: string, field: keyof Education, value: string) => {
    const updated = resumeData.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateField('education', updated);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Education</h2>
        <p className="text-gray-500">Add your academic background.</p>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {resumeData.education.map((edu, index) => (
            <motion.div 
              key={edu.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group"
            >
              <button 
                onClick={() => removeEducation(edu.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Icons.Trash2 size={18} />
              </button>
              
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Education {index + 1}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input 
                  placeholder="School / University" 
                  value={edu.school}
                  onChange={(e) => updateEducationItem(edu.id, 'school', e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white"
                />
                <input 
                  placeholder="Degree" 
                  value={edu.degree}
                  onChange={(e) => updateEducationItem(edu.id, 'degree', e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white"
                />
                <input 
                  placeholder="Field of Study" 
                  value={edu.fieldOfStudy}
                  onChange={(e) => updateEducationItem(edu.id, 'fieldOfStudy', e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white md:col-span-2"
                />
                <div className="grid grid-cols-2 gap-4">
                   <input 
                      type="text" 
                      placeholder="Start Date" 
                      onFocus={(e) => e.target.type = 'date'}
                      value={edu.startDate}
                      onChange={(e) => updateEducationItem(edu.id, 'startDate', e.target.value)}
                      className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white"
                   />
                   <input 
                      type="text" 
                      placeholder="End Date" 
                      onFocus={(e) => e.target.type = 'date'}
                      value={edu.endDate}
                      onChange={(e) => updateEducationItem(edu.id, 'endDate', e.target.value)}
                      className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white"
                   />
                </div>
                <input 
                  placeholder="City, Country" 
                  value={edu.location}
                  onChange={(e) => updateEducationItem(edu.id, 'location', e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <button 
          onClick={addEducation}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
        >
          <Icons.Plus size={20} />
          Add Education
        </button>
      </div>

      <div className="mt-10 flex justify-between">
        <button 
          onClick={() => navigate('/builder/experience')}
          className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
        >
          Back
        </button>
        <button 
          onClick={() => navigate('/builder/skills')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default EducationStep;