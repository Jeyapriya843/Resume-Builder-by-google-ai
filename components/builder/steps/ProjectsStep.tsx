import React from 'react';
import { useResume } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../../ui/Icons';
import { Project } from '../../../types';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsStep: React.FC = () => {
  const { resumeData, updateField } = useResume();
  const navigate = useNavigate();

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      link: '',
      description: '',
      technologies: []
    };
    updateField('projects', [...resumeData.projects, newProject]);
  };

  const removeProject = (id: string) => {
    updateField('projects', resumeData.projects.filter(p => p.id !== id));
  };

  const updateProjectItem = (id: string, field: keyof Project, value: any) => {
    const updated = resumeData.projects.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    );
    updateField('projects', updated);
  };

  const handleTechChange = (id: string, value: string) => {
      // Simple comma separated string to array
      const techs = value.split(',').map(s => s.trim()).filter(s => s !== '');
      updateProjectItem(id, 'technologies', techs);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-navy-900 mb-2">Projects</h2>
        <p className="text-gray-500">Add relevant academic or personal projects.</p>
      </div>

      {/* Best Practice Banner */}
      <div className="flex items-center gap-3 mb-8">
         <span className="bg-navy-900 text-white text-xs font-bold px-2 py-1 rounded-sm">Best practice</span>
         <span className="text-sm text-gray-500">Include links to live demos or GitHub repositories</span>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {resumeData.projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="relative group"
            >
              {index > 0 && <hr className="border-gray-100 mb-8" />}
              <button 
                onClick={() => removeProject(project.id)}
                className="absolute -right-2 -top-2 text-gray-300 hover:text-red-500 transition-colors"
              >
                <Icons.Trash2 size={18} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                <div className="space-y-1.5">
                   <label className="text-sm font-medium text-gray-700">Project Title</label>
                   <input 
                     placeholder="e.g. E-commerce Dashboard" 
                     value={project.title}
                     onChange={(e) => updateProjectItem(project.id, 'title', e.target.value)}
                     className="w-full px-4 py-3.5 rounded-lg bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 outline-none"
                   />
                </div>
                <div className="space-y-1.5">
                   <label className="text-sm font-medium text-gray-700">Link</label>
                   <input 
                     placeholder="e.g. github.com/user/repo" 
                     value={project.link}
                     onChange={(e) => updateProjectItem(project.id, 'link', e.target.value)}
                     className="w-full px-4 py-3.5 rounded-lg bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 outline-none"
                   />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                   <label className="text-sm font-medium text-gray-700">Technologies used</label>
                   <input 
                     placeholder="React, Node.js, MongoDB (comma separated)" 
                     defaultValue={project.technologies.join(', ')}
                     onBlur={(e) => handleTechChange(project.id, e.target.value)}
                     className="w-full px-4 py-3.5 rounded-lg bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 outline-none"
                   />
                </div>
              </div>

              <div className="space-y-1.5">
                 <label className="text-sm font-medium text-gray-700">Description</label>
                 <textarea 
                   placeholder="Describe what you built, your role, and the outcome..." 
                   value={project.description}
                   onChange={(e) => updateProjectItem(project.id, 'description', e.target.value)}
                   className="w-full px-4 py-4 rounded-lg bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 outline-none h-24 resize-none"
                 />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex justify-center mt-8">
           <button 
             onClick={addProject}
             className="flex items-center gap-2 px-6 py-3 border border-navy-900 rounded-lg text-navy-900 font-semibold hover:bg-gray-50 transition-colors"
           >
             <Icons.Plus size={18} />
             Add Project
           </button>
        </div>
      </div>

    </div>
  );
};

export default ProjectsStep;
