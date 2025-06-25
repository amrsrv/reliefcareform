import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Users, Heart, Baby, UserCheck, UserPlus, Briefcase, HelpCircle } from 'lucide-react';
import { StepProps } from '../types/form';
import { SelectButton } from '../components/SelectButton';
import { AnimatedInput } from '../components/AnimatedInput';
import { Button } from '../components/Button';

const careForOptions = [
  { value: 'myself', label: 'Myself', icon: <User className="h-5 w-5" /> },
  { value: 'parent', label: 'My Parent', icon: <Users className="h-5 w-5" /> },
  { value: 'spouse', label: 'My Spouse or Partner', icon: <Heart className="h-5 w-5" /> },
  { value: 'child', label: 'My Child', icon: <Baby className="h-5 w-5" /> },
  { value: 'grandparent', label: 'My Grandparent', icon: <UserCheck className="h-5 w-5" /> },
  { value: 'sibling', label: 'My Sibling', icon: <UserPlus className="h-5 w-5" /> },
  { value: 'friend', label: 'My Friend', icon: <Users className="h-5 w-5" /> },
  { value: 'client', label: 'My Client', icon: <Briefcase className="h-5 w-5" /> },
  { value: 'other', label: 'Someone Else', icon: <HelpCircle className="h-5 w-5" /> },
];

export const CareForStep: React.FC<StepProps> = ({ 
  formData, 
  updateFormData, 
  setCanProceed
}) => {
  const handleSelection = (value: string) => {
    updateFormData({ careFor: value });
    if (value !== 'other') {
      updateFormData({ careForOther: '' });
    }
  };

  const canProceed = formData.careFor && (formData.careFor !== 'other' || formData.careForOther);

  useEffect(() => {
    setCanProceed(canProceed);
  }, [canProceed, setCanProceed]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-heading text-text font-poppins mb-2">
          Who is this&nbsp;care&nbsp;for?
        </h2>
      </div>

      {/* Options Container */}
      <div className="max-h-options overflow-y-auto">
        <div className="space-y-3 pb-4">
          {careForOptions.map((option, index) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <SelectButton
                selected={formData.careFor === option.value}
                onClick={() => handleSelection(option.value)}
                icon={option.icon}
              >
                {option.label}
              </SelectButton>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Other Input */}
      {formData.careFor === 'other' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <AnimatedInput
            placeholder="Please specify..."
            value={formData.careForOther || ''}
            onChange={(value) => updateFormData({ careForOther: value })}
          />
        </motion.div>
      )}
    </div>
  );
};