import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bath, Users, Armchair as Wheelchair, Home, ChefHat, Pill, Brain, Plus } from 'lucide-react';
import { StepProps } from '../types/form';
import { AnimatedInput } from '../components/AnimatedInput';

const supportOptions = [
  { value: 'personal_care', label: 'Personal care (bathing, dressing, etc.)', icon: <Bath className="h-5 w-5" /> },
  { value: 'companionship', label: 'Companionship', icon: <Users className="h-5 w-5" /> },
  { value: 'mobility', label: 'Mobility support', icon: <Wheelchair className="h-5 w-5" /> },
  { value: 'housekeeping', label: 'Light housekeeping', icon: <Home className="h-5 w-5" /> },
  { value: 'meals', label: 'Meal preparation', icon: <ChefHat className="h-5 w-5" /> },
  { value: 'medication', label: 'Medication reminders', icon: <Pill className="h-5 w-5" /> },
  { value: 'dementia', label: 'Dementia/Alzheimer\'s care', icon: <Brain className="h-5 w-5" /> },
  { value: 'other', label: 'Other', icon: <Plus className="h-5 w-5" /> },
];

export const SupportTypeStep: React.FC<StepProps> = ({ 
  formData, 
  updateFormData, 
  setCanProceed
}) => {
  const [showOther, setShowOther] = useState(false);
  const supportTypes = formData.supportTypes || [];

  const toggleSupport = (value: string) => {
    const newTypes = supportTypes.includes(value)
      ? supportTypes.filter(type => type !== value)
      : [...supportTypes, value];
    
    updateFormData({ supportTypes: newTypes });
    
    if (value === 'other') {
      setShowOther(!supportTypes.includes(value));
      if (supportTypes.includes(value)) {
        updateFormData({ supportTypeOther: '' });
      }
    }
  };

  const canProceed = supportTypes.length > 0 && (!supportTypes.includes('other') || formData.supportTypeOther);

  useEffect(() => {
    setCanProceed(canProceed);
  }, [canProceed, setCanProceed]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-heading text-text font-poppins mb-2">
          What kind of help do&nbsp;they&nbsp;need?
        </h2>
        <p className="text-label text-muted">Select all that apply</p>
      </div>

      {/* Options Container */}
      <div className="max-h-options overflow-y-auto">
        <div className="space-y-3 pb-4">
          {supportOptions.map((option, index) => {
            const isSelected = supportTypes.includes(option.value);
            return (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <motion.button
                  className={`w-full h-12 px-4 border rounded-brand text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 ${
                    isSelected 
                      ? 'border-accent bg-selected-bg text-primary shadow-selected' 
                      : 'border-gray-200 bg-card text-text hover:border-accent/30 hover:bg-brand-light'
                  }`}
                  onClick={() => toggleSupport(option.value)}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="flex items-center justify-between h-full">
                    <div className="flex items-center min-w-0 flex-1">
                      <span className="mr-3 flex-shrink-0">{option.icon}</span>
                      <span className="text-button truncate">{option.label}</span>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="flex-shrink-0 ml-2"
                      >
                        <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                          <Plus className="h-3 w-3 text-white" />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Other Input */}
      {showOther && supportTypes.includes('other') && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <AnimatedInput
            placeholder="Please specify other support needed..."
            value={formData.supportTypeOther || ''}
            onChange={(value) => updateFormData({ supportTypeOther: value })}
          />
        </motion.div>
      )}
    </div>
  );
};