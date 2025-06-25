import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, HelpCircle } from 'lucide-react';
import { StepProps } from '../types/form';

const budgetOptions = [
  { value: '100-250', label: '$100–$250', description: 'Light support' },
  { value: '251-500', label: '$251–$500', description: 'Regular care' },
  { value: '500+', label: '$500+', description: 'Comprehensive care' },
  { value: 'not_sure', label: 'Not sure yet', description: 'We\'ll help you figure it out' },
];

export const BudgetStep: React.FC<StepProps> = ({ 
  formData, 
  updateFormData, 
  setCanProceed
}) => {
  const handleSelection = (value: string) => {
    updateFormData({ weeklyBudget: value });
  };

  const canProceed = formData.weeklyBudget;

  useEffect(() => {
    setCanProceed(canProceed);
  }, [canProceed, setCanProceed]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <DollarSign className="h-12 w-12 text-accent mx-auto mb-4" />
        <h2 className="text-heading text-text font-poppins mb-2">
          What is your weekly&nbsp;care&nbsp;budget?
        </h2>
        <p className="text-label text-muted">This helps us match you with appropriate options</p>
      </div>

      {/* Options Container */}
      <div className="max-h-options overflow-y-auto">
        <div className="space-y-3 pb-4">
          {budgetOptions.map((option, index) => {
            const isSelected = formData.weeklyBudget === option.value;
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
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-text text-button mb-1 truncate">{option.label}</h3>
                      <p className="text-hint text-muted truncate">{option.description}</p>
                    </div>
                    {option.value === 'not_sure' && (
                      <HelpCircle className="h-6 w-6 text-accent flex-shrink-0 ml-2" />
                    )}
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Not Sure Message */}
      {formData.weeklyBudget === 'not_sure' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-light border border-accent/20 rounded-brand p-4 text-center"
        >
          <p className="text-accent font-medium text-button">
            No worries — we'll match based on care needs and help you understand&nbsp;pricing&nbsp;options.
          </p>
        </motion.div>
      )}
    </div>
  );
};