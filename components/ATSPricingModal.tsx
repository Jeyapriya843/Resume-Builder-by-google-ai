

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from './ui/Icons';

const MotionDiv = motion.div as any;

interface ATSPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const ATSPricingModal: React.FC<ATSPricingModalProps> = ({ isOpen, onClose, onContinue }) => {
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 font-sans">
        <MotionDiv 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-white/80 backdrop-blur-sm"
        />

        <MotionDiv
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden p-8"
        >
           <div className="text-center mb-2">
              <h2 className="text-2xl font-bold text-navy-900">Unlock ATS Power</h2>
           </div>
           
           <div className="flex justify-center mb-8">
              <div className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                 <Icons.TrendingUp size={12} /> High Hire Rate
              </div>
           </div>

           <div className="space-y-4 mb-8">
              {/* Annual Plan */}
              <div 
                onClick={() => setSelectedPlan('annual')}
                className={`relative cursor-pointer border-2 rounded-xl p-4 flex items-center justify-between transition-all ${
                  selectedPlan === 'annual' 
                    ? 'border-blue-500 bg-blue-50/30' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                 <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'annual' ? 'border-blue-500' : 'border-gray-300'}`}>
                       {selectedPlan === 'annual' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                    </div>
                    <div>
                       <div className="font-bold text-navy-900 text-sm">Annual Plan</div>
                       <div className="text-xs text-gray-500">Billed yearly</div>
                    </div>
                 </div>
                 <div className="text-blue-600 font-bold text-sm">₹89<span className="text-gray-500 font-normal text-xs">/mo</span></div>
              </div>

              {/* Monthly Plan */}
              <div 
                onClick={() => setSelectedPlan('monthly')}
                className={`relative cursor-pointer border-2 rounded-xl p-4 flex items-center justify-between transition-all ${
                  selectedPlan === 'monthly' 
                    ? 'border-blue-500 bg-blue-50/30' 
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                 <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'monthly' ? 'border-blue-500' : 'border-gray-300'}`}>
                       {selectedPlan === 'monthly' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                    </div>
                    <div>
                       <div className="font-bold text-navy-900 text-sm">Monthly Plan</div>
                       <div className="text-xs text-gray-500">Billed monthly</div>
                    </div>
                 </div>
                 <div className="text-navy-900 font-bold text-sm">₹99</div>
              </div>
           </div>

           <button 
             onClick={onContinue}
             className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all"
           >
             Continue to Optimize
           </button>
        </MotionDiv>
      </div>
    </AnimatePresence>
  );
};

export default ATSPricingModal;