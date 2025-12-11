
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icons } from '../components/ui/Icons';
import Header from '../components/Header';

const JobTarget: React.FC = () => {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Here you would integrate with your AI service to optimize the resume based on the job description
    // For now, we simulate a delay and navigate to the success page
    setTimeout(() => {
      navigate('/success');
    }, 2000);
  };

  const handleSkip = () => {
    navigate('/success');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center relative overflow-hidden"
        >
           {/* Decor */}
           <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-500"></div>

           <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                 <Icons.Target size={40} strokeWidth={1.5} />
              </div>
           </div>

           <h1 className="text-3xl font-bold text-navy-900 mb-4">
             Target a specific job
           </h1>

           <p className="text-gray-500 leading-relaxed mb-8 text-sm md:text-base px-2">
             Paste the job description below. Our AI will optimize your keywords and phrasing to match this specific role.
           </p>

           <div className="relative mb-8">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description text here..."
                className="w-full h-40 p-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none resize-none text-sm text-gray-700 placeholder:text-gray-400"
              />
              <span className="absolute bottom-4 right-4 text-xs text-gray-400 font-medium pointer-events-none select-none">
                Optional
              </span>
           </div>

           <button 
             onClick={handleAnalyze}
             disabled={isAnalyzing}
             className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
           >
             {isAnalyzing ? (
               <>
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 Analyzing...
               </>
             ) : (
               <>
                 <Icons.Sparkles size={20} />
                 Analyze & Optimize
               </>
             )}
           </button>

           <button 
             onClick={handleSkip}
             className="text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors"
           >
             Skip this step
           </button>
        </motion.div>
      </main>
    </div>
  );
};

export default JobTarget;
