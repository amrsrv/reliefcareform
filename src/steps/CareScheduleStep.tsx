import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Moon, Phone } from 'lucide-react';
import { StepProps } from '../types/form';

const scheduleOptions = [
  { value: 'less_5', label: 'Less than 5 hrs/week', icon: <Clock className="h-6 w-6" />, description: 'Minimal support' },
  { value: '5_15', label: '5–15 hrs/week', icon: <Clock className="h-6 w-6" />, description: 'Part-time care' },
  { value: '16_30', label: '16–30 hrs/week', icon: <Calendar className="h-6 w-6" />, description: 'Regular support' },
  { value: '30_plus', label: '30+ hrs/week', icon: <Calendar className="h-6 w-6" />, description: 'Extensive care' },
  { value: 'full_time', label: 'Full-time (~40 hrs/week)', icon: <Calendar className="h-6 w-6" />, description: 'Full-time support' },
  { value: 'live_in', label: 'Live-in caregiver', icon: <Moon className="h-6 w-6" />, description: 'Stays overnight' },
  { value: 'on_demand', label: 'On-demand', icon: <Phone className="h-6 w-6" />, description: 'On-call with notice' },
];

export const CareScheduleStep: React.FC<StepProps> = ({ 
  formData, 
  updateFormData, 
  setCanProceed
}) => {
  const handleSelection = (value: string) => {
    updateFormData({ careSchedule: value });
  };

  const canProceed = formData.careSchedule;

  useEffect(() => {
    setCanProceed(canProceed);
  }, [canProceed, setCanProceed]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-heading text-text font-poppins mb-2">
          What kind of care schedule do&nbsp;you&nbsp;need?
        </h2>
      </div>

      {/* Options Container */}
      <div className="max-h-options overflow-y-auto">
        <div className="space-y-3 pb-4">
          {scheduleOptions.map((option, index) => {
            const isSelected = formData.careSchedule === option.value;
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
    </div>
  );
};