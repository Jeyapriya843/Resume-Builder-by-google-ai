import React, { useState } from 'react';
import { useResume } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../../ui/Icons';
import { generateResumeSummary } from '../../../services/geminiService';

const SummaryStep: React.FC = () => {
  const { resumeData, updateField } = useResume();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const summary = await generateResumeSummary(resumeData.jobTitle, resumeData.skills);
    updateField('summary', summary);
    setIsGenerating(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-navy-900 mb-2">Summary</h2>
        <p className="text-gray-500">List your roles, achievements, and impact at work</p>
      </div>

      {/* Best Practice Banner */}
      <div className="flex items-center gap-3 mb-8">
         <span className="bg-navy-900 text-white text-xs font-bold px-2 py-1 rounded-sm">Best practice</span>
         <span className="text-sm text-gray-500">The best practice goes here</span>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
           <label className="text-sm font-medium text-gray-700">Summary</label>
           <button 
             onClick={handleGenerate}
             disabled={isGenerating}
             className="flex items-center gap-1 bg-[#8B5CF6] text-white text-xs px-3 py-1.5 rounded-md hover:bg-[#7C3AED] transition-colors disabled:opacity-50"
           >
             <Icons.Sparkles size={12} />
             {isGenerating ? 'Generating...' : 'Generate'}
           </button>
        </div>

        <textarea 
          value={resumeData.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          placeholder="Write your summary here"
          className="w-full h-64 px-4 py-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 outline-none resize-none text-base leading-relaxed"
        />
      </div>

      {/* AI Suggestion Stub */}
      {resumeData.summary === '' && (
         <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-white">
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
               Front-End Developer with 3 years of experience building responsive, user-friendly web applications. Skilled in HTML5, CSS3, JavaScript (ES6+), and React.js...
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
               Front-End Developer with 3 years of experience building responsive, user-friendly web applications. Skilled in HTML5, CSS3, JavaScript (ES6+), and React.js...
            </p>
         </div>
      )}

    </div>
  );
};

export default SummaryStep;
