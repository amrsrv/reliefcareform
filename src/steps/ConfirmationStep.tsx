import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';
import { FormData } from '../types/form';
import { Button } from '../components/Button';

interface ConfirmationStepProps {
  formData: FormData;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ formData }) => {
  const firstName = formData.fullName?.split(' ')[0] || 'there';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-8 py-8"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="relative"
      >
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
          >
            <CheckCircle className="h-10 w-10 text-success" />
          </motion.div>
        </div>
        
        {/* Sparkles Animation */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <Sparkles className="h-6 w-6 text-accent" />
        </motion.div>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h1 className="text-2xl md:text-3xl font-semibold text-text font-poppins">
          We've got your request!
        </h1>
        <h2 className="text-heading text-primary">
          Thank you, {firstName}.
        </h2>
        <p className="text-body text-muted leading-relaxed max-w-md mx-auto">
          We're reviewing your needs and will contact you shortly with&nbsp;caregiver&nbsp;options.
        </p>
      </motion.div>

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-brand-light border border-accent/20 rounded-brand p-6"
      >
        <div className="flex items-center justify-center mb-3">
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "85%" }}
              transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>
        <p className="text-accent font-medium text-button">
          Matching you… 85% complete
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="pt-4"
      >
        <Button 
          variant="secondary"
          onClick={() => window.location.href = 'https://reliefcare.com/'}
        >
          Return to Homepage
        </Button>
      </motion.div>
    </motion.div>
  );
};