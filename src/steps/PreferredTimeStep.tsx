import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Sunset, Moon, Clock } from 'lucide-react';
import { StepProps } from '../types/form';

const timeOptions = [
  { value: 'morning', label: 'Morning', icon: <Sun className="h-5 w-5" />, time: '6 AM - 12 PM' },
  { value: 'afternoon', label: 'Afternoon', icon: <Sunset className="h-5 w-5" />, time: '12 PM - 6 PM' },
  { value: 'evening', label: 'Evening', icon: <Sunset className="h-5 w-5" />, time: '6 PM - 10 PM' },
  { value: 'overnight', label: 'Overnight', icon: <Moon className="h-5 w-5" />, time: '10 PM - 6 AM' },
  { value: 'mix', label: 'Mix', icon: <Clock className="h-5 w-5" />, time: 'Flexible hours' },
];

export const PreferredTimeStep: React.FC<StepProps> = ({ 
  formData, 
  updateFormData, 
  setCanProceed
}) => {
  const preferredTimes = formData.preferredTimes || [];

  const toggleTime = (value: string) => {
    const newTimes = preferredTimes.includes(value)
      ? preferredTimes.filter(time => time !== value)
      : [...preferredTimes, value];
    
    updateFormData({ preferredTimes: newTimes });
  };

  const canProceed = preferredTimes.length > 0;

  useEffect(() => {
    setCanProceed(canProceed);
  }, [canProceed, setCanProceed]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-heading text-text font-poppins mb-2">
          What time of day should care&nbsp;be&nbsp;provided?
        </h2>
        <p className="text-label text-muted">Select all that apply</p>
      </div>

      {/* Options Container */}
      <div className="max-h-options overflow-y-auto">
        <div className="space-y-3 pb-4">
          {timeOptions.map((option, index) => {
            const isSelected = preferredTimes.includes(option.value);
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
                  onClick={() => toggleTime(option.value)}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="flex items-center justify-between h-full">
                    <div className="flex items-center min-w-0 flex-1">
                      <span className="mr-3 flex-shrink-0">{option.icon}</span>
                      <div className="min-w-0 flex-1">
                        <span className="text-button block truncate">{option.label}</span>
                        <p className="text-hint text-muted truncate">{option.time}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="flex-shrink-0 ml-2"
                      >
                        <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
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

      {/* Selected Times Summary */}
      {preferredTimes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-light border border-accent/20 rounded-brand p-4"
        >
          <p className="text-accent font-medium text-center text-button">
            Selected times: {preferredTimes.map(time => 
              timeOptions.find(opt => opt.value === time)?.label
            ).join(', ')}
          </p>
        </motion.div>
      )}
    </div>
  );
};