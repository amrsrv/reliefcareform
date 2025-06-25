import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Search } from 'lucide-react';
import { StepProps } from '../types/form';

const startDateOptions = [
  { 
    value: 'asap', 
    label: 'As soon as possible', 
    icon: <Clock className="h-6 w-6" />, 
    description: 'Ready to begin immediately' 
  },
  { 
    value: '1-2_weeks', 
    label: 'Within 1–2 weeks', 
    icon: <Calendar className="h-6 w-6" />, 
    description: 'Need time to prepare' 
  },
  { 
    value: 'within_month', 
    label: 'Within a month', 
    icon: <Calendar className="h-6 w-6" />, 
    description: 'Planning ahead' 
  },
  { 
    value: 'exploring', 
    label: 'Later / Just exploring', 
    icon: <Search className="h-6 w-6" />, 
    description: 'Gathering information' 
  },
];

export const StartDateStep: React.FC<StepProps> = ({ 
  formData, 
  updateFormData, 
  setCanProceed
}) => {
  const handleSelection = (value: string) => {
    updateFormData({ startDate: value });
  };

  const canProceed = formData.startDate;

  useEffect(() => {
    setCanProceed(canProceed);
  }, [canProceed, setCanProceed]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-heading text-text font-poppins mb-2">
          When would you like care&nbsp;to&nbsp;begin?
        </h2>
      </div>

      {/* Options Container */}
      <div className="max-h-options overflow-y-auto">
        <div className="space-y-3 pb-4">
          {startDateOptions.map((option, index) => {
            const isSelected = formData.startDate === option.value;
            return (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <motion.button
                  className={`w-full p-4 border rounded-brand text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 ${
                    isSelected 
                      ? 'border-accent bg-selected-bg shadow-selected' 
                      : 'border-gray-200 bg-card hover:border-accent/30 hover:bg-brand-light'
                  }`}
                  onClick={() => handleSelection(option.value)}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-brand mr-4 flex-shrink-0 ${
                      isSelected ? 'bg-accent text-white' : 'bg-gray-100 text-placeholder'
                    }`}>
                      {option.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-text text-button mb-1 truncate">{option.label}</h3>
                      <p className="text-hint text-muted truncate">{option.description}</p>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Exploring Message */}
      {formData.startDate === 'exploring' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-light border border-accent/20 rounded-brand p-4 text-center"
        >
          <p className="text-accent font-medium text-button">
            You're welcome to explore without committing today. We're here when&nbsp;you're&nbsp;ready.
          </p>
        </motion.div>
      )}
    </div>
  );
};