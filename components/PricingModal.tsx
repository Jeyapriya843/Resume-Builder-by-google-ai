
import React, { useState } from 'react';
import { Icons } from './ui/Icons';
import { motion, AnimatePresence } from 'framer-motion';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  {
    id: 'free',
    title: 'Free Plan – "Starter"',
    price: '₹0',
    subtitle: '• Watermark • No DOCX',
    warning: 'No ATS optimised',
    isPopular: false
  },
  {
    id: 'pro',
    title: 'Pro Plan – "14-Day Access"',
    price: '₹99',
    subtitle: 'Unlimited downloads, No Watermark, ATS Optimized',
    warning: null,
    isPopular: false
  },
  {
    id: 'annual',
    title: 'Annual Plan – "Pro Yearly"',
    price: '₹89/Month',
    subtitle: 'Billed yearly. ATS Optimized.',
    warning: null,
    isPopular: true
  }
];

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState('annual');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 font-sans">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10 transition-colors bg-white/50 rounded-full p-1"
            >
              <Icons.X size={20} />
            </button>

            <div className="px-6 py-8 md:px-8 md:py-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-[#0f172a] mb-5 tracking-tight">
                  Make It <span className="text-[#3b82f6]">ATS Friendly</span>
                </h2>
                
                <div className="bg-[#ecfdf5] border border-[#d1fae5] rounded-full py-2.5 px-4 inline-flex items-center gap-2.5 text-[#047857] text-[11px] md:text-xs font-bold shadow-sm leading-tight max-w-[95%]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                  <span className="text-left">75% of people get hired faster with an ATS-friendly resume</span>
                </div>
              </div>

              {/* Plans */}
              <div className="space-y-4">
                {plans.map((plan) => {
                  const isSelected = selectedPlan === plan.id;
                  
                  return (
                    <div 
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative cursor-pointer rounded-2xl border-2 transition-all duration-200 p-4 flex items-start gap-4 group
                        ${isSelected 
                            ? plan.isPopular 
                                ? 'bg-[#eff6ff] border-[#3b82f6] shadow-md ring-1 ring-blue-100' // Popular Selected
                                : 'bg-white border-[#3b82f6] shadow-sm' // Standard Selected
                            : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm' // Unselected
                        }
                      `}
                    >
                      {/* Most Popular Badge */}
                      {plan.isPopular && (
                        <div className="absolute -top-3 right-0 rounded-tl-lg rounded-bl-lg rounded-tr-lg bg-[#3b82f6] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider shadow-md flex items-center gap-1 transform translate-x-2">
                           <Icons.Sparkles size={10} fill="currentColor" /> MOST POPULAR
                        </div>
                      )}

                      {/* Radio Circle */}
                      <div className={`mt-1 w-6 h-6 rounded-full border-[2.5px] flex items-center justify-center flex-shrink-0 transition-colors
                        ${isSelected ? 'border-[#3b82f6]' : 'border-gray-200 group-hover:border-gray-300'}
                      `}>
                        {isSelected && (
                          <div className="w-3 h-3 rounded-full bg-[#3b82f6]" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-center mb-0.5">
                             <h3 className="font-bold text-[#0f172a] text-[15px]">{plan.title}</h3>
                             <span className="font-bold text-[#0f172a] text-[15px] ml-2">{plan.price}</span>
                         </div>
                         
                         <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{plan.subtitle}</p>

                         {plan.warning && (
                           <div className="mt-2.5 inline-flex items-center gap-1.5 bg-[#fef2f2] text-[#dc2626] px-2.5 py-1 rounded-md text-[10px] font-bold border border-[#fee2e2]">
                             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                               <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                               <line x1="12" y1="9" x2="12" y2="13"></line>
                               <line x1="12" y1="17" x2="12.01" y2="17"></line>
                             </svg>
                             {plan.warning}
                           </div>
                         )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Button */}
              <div className="mt-8">
                <button 
                  onClick={onClose}
                  className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-[0.98] outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Continue
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PricingModal;
