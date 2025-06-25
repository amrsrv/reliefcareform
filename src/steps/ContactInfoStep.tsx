import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, User } from 'lucide-react';
import { StepProps } from '../types/form';
import { AnimatedInput } from '../components/AnimatedInput';

export const ContactInfoStep: React.FC<StepProps> = ({ 
  formData, 
  updateFormData, 
  onNext, 
  setCanProceed
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ''));
  };

  const validateName = (name: string) => {
    return name.trim().length >= 2;
  };

  const canProceed = validateName(formData.fullName || '') && 
                     validateEmail(formData.email || '') && 
                     validatePhone(formData.phoneNumber || '');

  useEffect(() => {
    setCanProceed(canProceed && !isSubmitting);
  }, [canProceed, isSubmitting, setCanProceed]);

  const handleSubmit = async () => {
    if (!canProceed) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://hook.us1.make.com/gbk8wiz1sn0ejecdg3daprwg3c2vp7mq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onNext();
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-heading text-text font-poppins mb-2">
          Almost done! Where should we send&nbsp;your&nbsp;matches?
        </h2>
        <p className="text-label text-muted">We'll contact you with caregiver options</p>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <AnimatedInput
            placeholder="Full Name"
            value={formData.fullName || ''}
            onChange={(value) => updateFormData({ fullName: value })}
            onValidate={validateName}
            icon={<User className="h-5 w-5" />}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AnimatedInput
            type="email"
            placeholder="Email Address"
            value={formData.email || ''}
            onChange={(value) => updateFormData({ email: value })}
            onValidate={validateEmail}
            icon={<Mail className="h-5 w-5" />}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatedInput
            type="tel"
            placeholder="Phone Number"
            value={formData.phoneNumber || ''}
            onChange={(value) => updateFormData({ phoneNumber: value })}
            onValidate={validatePhone}
            icon={<Phone className="h-5 w-5" />}
          />
        </motion.div>
      </div>
    </div>
  );
};