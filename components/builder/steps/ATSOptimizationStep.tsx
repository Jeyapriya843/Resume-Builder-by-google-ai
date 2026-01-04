
import React, { useState } from 'react';
import { useAuth, useResume } from '../../../App';
import { Icons } from '../../ui/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from '../../AuthModal';
import PricingModal from '../../PricingModal';
import ATSJobDescriptionModal from '../../ATSJobDescriptionModal';
import { optimizeResumeForJD } from '../../../services/geminiService';
import { useNavigate } from 'react-router-dom';

const MotionDiv = motion.div as any;

const ATSOptimizationStep: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { resumeData, setResumeData } = useResume();
  const navigate = useNavigate();
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isJdOpen, setIsJdOpen] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const startAtsFlow = () => {
    if (!isLoggedIn) {
      setIsAuthOpen(true);
      return;
    }
    setIsPricingOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthOpen(false);
    setIsPricingOpen(true);
  };

  const handlePricingContinue = () => {
    setIsPricingOpen(false);
    setIsJdOpen(true);
  };

  const handleOptimize = async (jd: string) => {
    setIsJdOpen(false);
    setIsOptimizing(true);
    
    try {
      const optimizedData = await optimizeResumeForJD(resumeData, jd);
      if (optimizedData) {
        setResumeData(prev => ({ ...prev, ...optimizedData }));
      }
      // Give some visual feedback that it finished
      setTimeout(() => {
        setIsOptimizing(false);
        navigate('/preview');
      }, 1500);
    } catch (error) {
      console.error("Optimization failed", error);
      setIsOptimizing(false);
      navigate('/preview');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="text-center mb-12">
        <div className="inline-block p-4 bg-indigo-50 rounded-3xl text-indigo-600 mb-6 shadow-sm border border-indigo-100">
           <Icons.Sparkles size={40} className="animate-pulse" />
        </div>
        <h2 className="text-4xl font-bold text-navy-900 mb-4">Ultimate ATS Power-Up</h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Pass automated screening systems with 99% accuracy. Our AI will align your experience with your target job.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
         {[
           { title: "Keyword Injection", desc: "Automatically inserts missing industry terms.", icon: Icons.Target, color: "text-blue-500", bg: "bg-blue-50" },
           { title: "Quantified Impact", desc: "Rewrites bullets to focus on metrics.", icon: Icons.TrendingUp, color: "text-green-500", bg: "bg-green-50" },
           { title: "Smart Formatting", desc: "Ensures fonts and spacing are 100% parseable.", icon: Icons.Layout, color: "text-purple-500", bg: "bg-purple-50" },
           { title: "Job Description Match", desc: "Tailors every word to your specific role.", icon: Icons.Search, color: "text-amber-500", bg: "bg-amber-50" }
         ].map((feature, i) => (
           <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center shrink-0`}>
                 <feature.icon size={24} />
              </div>
              <div>
                 <h4 className="font-bold text-navy-900 mb-1">{feature.title}</h4>
                 <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="bg-navy-900 rounded-3xl p-8 text-center text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
         <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Ready to land that interview?</h3>
            <button 
              onClick={startAtsFlow}
              disabled={isOptimizing}
              className="px-10 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-xl transition-all transform active:scale-95 flex items-center gap-3 mx-auto disabled:opacity-50"
            >
              {isOptimizing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Optimizing Resume...
                </>
              ) : (
                <>
                  <Icons.Sparkles size={20} />
                  Boost ATS Score Now
                </>
              )}
            </button>
            <p className="text-blue-200/60 text-[10px] uppercase font-black tracking-widest mt-6">
              Powered by Gemini 3 Pro Engine
            </p>
         </div>
      </div>

      {/* Modals */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={handleAuthSuccess} />
      <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} onContinue={handlePricingContinue} />
      <ATSJobDescriptionModal 
        isOpen={isJdOpen} 
        onClose={() => setIsJdOpen(false)} 
        onOptimize={handleOptimize} 
        onSkip={() => navigate('/preview')} 
      />
    </div>
  );
};

export default ATSOptimizationStep;
