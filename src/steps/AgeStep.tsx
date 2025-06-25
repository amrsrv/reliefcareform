import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Baby, User, Users, HelpCircle } from 'lucide-react';
import { StepProps } from '../types/form';

const ageGroups = [
  { 
    value: 'child', 
    label: 'Child (Under 18)', 
    icon: <Baby className="h-6 w-6" />, 
    description: 'Pediatric care needs' 
  },
  { 
    value: 'adult', 
    label: 'Adult (18–64)', 
    icon: <User className="h-6 w-6" />, 
    description: 'Working age adult' 
  },
  { 
    value: 'senior', 
    label: 'Senior (65+)', 
    icon: <Users className="h-6 w-6" />, 
    description: 'Senior care services' 
  },
  { 
    value: 'not_sure', 
    label: 'Not Sure', 
    icon: <HelpCircle className="h-6 w-6" />, 
    description: 'We\'ll help you figure it out' 
  },
];

export const AgeStep: React.FC<StepProps> = ({ 
  formData, 
  updateFormData, 
  setCanProceed
}) => {
  const handleSelection = (value: string) => {
    updateFormData({ ageGroup: value });
  };

  const canProceed = formData.ageGroup;

  useEffect(() => {
    setCanProceed(canProceed);
  }, [canProceed, setCanProceed]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-heading text-text font-poppins mb-2">
          What's the age group of the person&nbsp;needing&nbsp;care?
        </h2>
      </div>

      {/* Age Group Options */}
      <div className="max-h-options overflow-y-auto">
        <div className="space-y-3 pb-4">
          {ageGroups.map((group, index) => {
            const isSelected = formData.ageGroup === group.value;
            return (
              <motion.div
                key={group.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <motion.button
                  className={`w-full p-4 border rounded-2xl text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 backdrop-blur-sm ${
                    isSelected 
                      ? 'border-accent bg-gradient-to-r from-accent/10 to-accent/5 shadow-selected' 
                      : 'border-slate-200 bg-white/60 hover:border-accent/30 hover:bg-white/80 hover:shadow-md'
                  }`}
                  onClick={() => handleSelection(group.value)}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-xl mr-4 flex-shrink-0 ${
                      isSelected ? 'bg-accent text-white' : 'bg-gray-100 text-placeholder'
                    }`}>
                      {group.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-text text-button mb-1 truncate">{group.label}</h3>
                      <p className="text-hint text-muted truncate">{group.description}</p>
                    </div>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Not Sure Message */}
      {formData.ageGroup === 'not_sure' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-light border border-accent/20 rounded-brand p-4 text-center"
        >
          <p className="text-accent font-medium text-button">
            No problem — we'll ask for more details later&nbsp;if&nbsp;needed.
          </p>
        </motion.div>
      )}

      {/* Senior Care Message */}
      {formData.ageGroup === 'senior' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-light border border-accent/20 rounded-brand p-4 text-center"
        >
          <p className="text-accent font-medium text-button">
            We specialize in senior care — you're in the&nbsp;right&nbsp;place.
          </p>
        </motion.div>
      )}

      {/* Progress Hint */}
      <div className="text-center">
        <p className="text-hint text-muted">
          Just 9 steps to go...
        </p>
      </div>
    </div>
  );
};