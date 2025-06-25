import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

interface AnimatedInputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onValidate?: (value: string) => boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onValidate,
  className = '',
  icon
}) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  
  const isValid = onValidate ? onValidate(value) : value.length > 0;
  const showValidation = touched && value.length > 0;
  const hasError = touched && value.length > 0 && !isValid;

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="relative"
        animate={{
          scale: focused ? 1.01 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-placeholder">
              {icon}
            </div>
          )}
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              setTouched(true);
            }}
            className={`w-full h-12 ${icon ? 'pl-12' : 'pl-4'} pr-12 border rounded-brand text-body placeholder-placeholder bg-card transition-all duration-200 focus:border-accent focus:outline-none focus:shadow-focus font-poppins ${
              hasError ? 'border-error' : focused ? 'border-accent shadow-md' : 'border-slate-200 bg-white/60 backdrop-blur-sm'
            }`}
          />
          
          {/* Validation Icons */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            {showValidation && isValid && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              </motion.div>
            )}
            {hasError && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <div className="w-5 h-5 bg-error rounded-full flex items-center justify-center">
                  <AlertCircle className="h-3 w-3 text-white" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};