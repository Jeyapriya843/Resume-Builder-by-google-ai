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
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Professional Summary</h2>
        <p className="text-gray-500">Write a short professional summary to introduce yourself.</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-end">
           <button 
             onClick={handleGenerate}
             disabled={isGenerating}
             className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
           >
             <Icons.Sparkles size={16} />
             {isGenerating ? 'Generating...' : 'Generate with AI'}
           </button>
        </div>

        <textarea 
          value={resumeData.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          placeholder="Experienced professional with a proven track record..."
          className="w-full h-48 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-white resize-none text-base leading-relaxed"
        />
        
        <p className="text-xs text-gray-400 text-right">{resumeData.summary.length} characters</p>
      </div>

      <div className="mt-10 flex justify-between">
        <button 
          onClick={() => navigate('/builder/skills')}
          className="px-6 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
        >
          Back
        </button>
        <button 
          onClick={() => navigate('/preview')}
          className="px-8 py-3 bg-navy-900 text-white rounded-lg font-semibold hover:bg-navy-800 transition-colors shadow-lg shadow-navy-900/20"
        >
          Finish & Preview
        </button>
      </div>
    </div>
  );
};

export default SummaryStep;