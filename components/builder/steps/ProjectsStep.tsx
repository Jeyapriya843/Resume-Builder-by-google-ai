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
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Projects</h2>
        <p className="text-gray-500">Add relevant academic or personal projects.</p>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {resumeData.projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 p-6 rounded-xl border border-gray-200 relative group"
            >
              <button 
                onClick={() => removeProject(project.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Icons.Trash2 size={18} />
              </button>
              
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Project {index + 1}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input 
                  placeholder="Project Title" 
                  value={project.title}
                  onChange={(e) => updateProjectItem(project.id, 'title', e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white"
                />
                <input 
                  placeholder="Link (e.g. github.com/...)" 
                  value={project.link}
                  onChange={(e) => updateProjectItem(project.id, 'link', e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white"
                />
                <input 
                  placeholder="Technologies (comma separated)" 
                  defaultValue={project.technologies.join(', ')}
                  onBlur={(e) => handleTechChange(project.id, e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white md:col-span-2"
                />
              </div>
              <textarea 
                placeholder="Description of the project..." 
                value={project.description}
                onChange={(e) => updateProjectItem(project.id, 'description', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white h-24 resize-none"
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <button 
          onClick={addProject}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
        >
          <Icons.Plus size={20} />
          Add Project
        </button>
      </div>

      <div className="mt-10 flex justify-between">
        <button 
          onClick={() => navigate('/builder/education')}
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

export default ProjectsStep;