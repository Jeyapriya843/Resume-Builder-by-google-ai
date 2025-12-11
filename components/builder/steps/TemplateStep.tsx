
import React from 'react';
import { useResume } from '../../../App';
import { availableTemplates, TemplatesMap } from '../../templates';
import { Icons } from '../../ui/Icons';
import { motion } from 'framer-motion';

const TemplateStep: React.FC = () => {
  const { resumeData, updateField } = useResume();

  const handleSelectTemplate = (id: string) => {
    updateField('templateId', id);
    // Optional: Scroll to top or provide feedback
  };

  return (
    <div className="w-full">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-navy-900 mb-3">Job-winning resume templates</h2>
        <p className="text-gray-500 leading-relaxed">
          Each resume template is designed to follow the exact rules you need to get hired faster.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {availableTemplates.map((template, idx) => {
            const TemplateComponent = TemplatesMap[template.id];
            const isSelected = resumeData.templateId === template.id;
            
            return (
                <motion.div
                   key={template.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.05 }}
                   className={`group relative bg-white rounded-xl overflow-hidden border-2 transition-all duration-300 flex flex-col ${
                     isSelected 
                       ? 'border-blue-500 ring-4 ring-blue-500/10 shadow-xl scale-[1.02]' 
                       : 'border-gray-100 hover:border-blue-300 hover:shadow-lg'
                   }`}
                   onClick={() => handleSelectTemplate(template.id)}
                >
                   {/* Selection Indicator */}
                   <div className={`absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                     isSelected ? 'bg-blue-500 text-white shadow-lg scale-100' : 'bg-gray-100 text-gray-300 scale-90 opacity-0 group-hover:opacity-100'
                   }`}>
                      <Icons.Check size={16} strokeWidth={3} />
                   </div>

                   {/* Preview Container */}
                   <div className="relative h-[380px] bg-gray-100 overflow-hidden cursor-pointer">
                      {/* Scale Wrapper to fit A4 in card */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 scale-[0.35] origin-top shadow-xl pointer-events-none select-none mt-6">
                         <TemplateComponent data={resumeData} />
                      </div>
                      
                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 bg-navy-900/10 transition-opacity duration-300 ${isSelected ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`} />
                   </div>
                   
                   <div className="p-5 bg-white border-t border-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`font-bold text-lg ${isSelected ? 'text-blue-600' : 'text-navy-900'}`}>
                          {template.name}
                        </h3>
                        {isSelected && <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded">Selected</span>}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed mb-3">{template.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5">
                         {template.tags.slice(0, 3).map(tag => (
                           <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] uppercase font-bold tracking-wider rounded">
                             {tag}
                           </span>
                         ))}
                      </div>
                   </div>
                </motion.div>
            );
         })}
      </div>
    </div>
  );
};

export default TemplateStep;
