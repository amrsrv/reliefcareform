import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="w-full bg-slate-200/60 rounded-full h-2 mb-3 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full shadow-sm"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      {/* Progress Text */}
      <div className="text-center">
        <span className="text-progress text-placeholder">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
};