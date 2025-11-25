
import React, { useState } from 'react';
import { Icons } from './ui/Icons';
import { motion, AnimatePresence } from 'framer-motion';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  {
    id: 'single',
    title: 'Single resume',
    description: 'Get a single ATS friendly resume',
    price: '₹50',
    highlight: false
  },
  {
    id: 'monthly',
    title: 'Monthly pack',
    description: 'Get access to AI features ATS friendly resume template and unlimited downloads for 30 days',
    price: '₹200',
    highlight: true
  },
  {
    id: 'yearly',
    title: 'Yearly pack',
    description: 'Get access to AI features ATS friendly resume template and unlimited downloads for an year',
    price: '₹600',
    highlight: false
  }
];

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10 transition-colors"
            >
              <Icons.X size={20} />
            </button>

            <div className="p-6 md:p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-2 leading-tight">
                  Job ready resume at <br/> fraction of cost
                </h2>
              </div>

              <div className="space-y-3">
                {plans.map((plan) => {
                  const isSelected = selectedPlan === plan.id;
                  const isHighlight = plan.highlight;

                  return (
                    <div 
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative cursor-pointer rounded-xl border transition-all duration-200 flex items-center p-3 md:p-4 gap-3 group
                        ${isHighlight && isSelected 
                          ? 'bg-[#6366f1] border-[#6366f1] text-white shadow-md scale-[1.01]' 
                          : isSelected 
                            ? 'bg-white border-navy-900 shadow-sm'
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      {/* Radio Circle */}
                      <div className={`
                        w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                        ${isHighlight && isSelected 
                           ? 'border-white' 
                           : isSelected ? 'border-navy-900' : 'border-gray-300'
                        }
                      `}>
                        {isSelected && (
                          <div className={`w-2 h-2 rounded-full ${isHighlight ? 'bg-white' : 'bg-navy-900'}`} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className={`font-bold text-base mb-0.5 ${isHighlight && isSelected ? 'text-white' : 'text-gray-900'}`}>
                          {plan.title}
                        </h3>
                        <p className={`text-xs leading-snug ${isHighlight && isSelected ? 'text-white/90' : 'text-gray-500'}`}>
                          {plan.description}
                        </p>
                      </div>

                      {/* Price */}
                      <div className={`text-xl font-bold ${isHighlight && isSelected ? 'text-white' : 'text-navy-900'}`}>
                        {plan.price}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <button className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-base py-3 rounded-lg shadow-lg shadow-blue-600/20 transition-all transform active:scale-[0.98]">
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
