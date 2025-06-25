import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { StepProps } from '../types/form';
import { AnimatedInput } from '../components/AnimatedInput';

const relationshipOptions = [
  'Parent',
  'Spouse / Partner',
  'Child',
  'Sibling',
  'Grandparent',
  'Friend',
  'Client',
  'Other'
];

export const RelationshipStep: React.FC<StepProps> = ({ 
  formData, 
  updateFormData, 
  setCanProceed
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = (value: string) => {
    updateFormData({ relationship: value });
    setIsOpen(false);
    if (value !== 'Other') {
      updateFormData({ relationshipOther: '' });
    }
  };

  const canProceed = formData.relationship && (formData.relationship !== 'Other' || formData.relationshipOther);

  useEffect(() => {
    setCanProceed(canProceed);
  }, [canProceed, setCanProceed]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-heading font-poppins text-text mb-2">
          What is your relationship to&nbsp;this&nbsp;person?
        </h2>
      </div>

      <div className="relative">
        <motion.button
          className="w-full h-12 px-4 py-3 border border-gray-200 rounded-brand text-left bg-white flex items-center justify-between hover:border-accent/30 hover:bg-brand-light transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.98 }}
        >
          <span className={formData.relationship ? 'text-text' : 'text-placeholder'}>
            {formData.relationship || 'Select relationship...'}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-placeholder" />
          </motion.div>
        </motion.button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-brand shadow-card z-10 overflow-hidden"
          >
            {relationshipOptions.map((option, index) => (
              <motion.button
                key={option}
                className="w-full px-4 py-3 text-left hover:bg-brand-light transition-colors text-sm"
                onClick={() => handleSelection(option)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {option}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {formData.relationship === 'Other' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <AnimatedInput
            placeholder="Please specify..."
            value={formData.relationshipOther || ''}
            onChange={(value) => updateFormData({ relationshipOther: value })}
          />
        </motion.div>
      )}
    </motion.div>
  );
};