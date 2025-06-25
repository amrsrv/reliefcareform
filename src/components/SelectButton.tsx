import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface SelectButtonProps {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

export const SelectButton: React.FC<SelectButtonProps> = ({
  children,
  selected,
  onClick,
  icon,
  description,
  className = ''
}) => {
  return (
    <motion.button
      className={`relative w-full h-12 px-4 border rounded-2xl text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20 backdrop-blur-sm ${
        selected 
          ? 'border-accent bg-gradient-to-r from-accent/10 to-accent/5 text-primary shadow-selected' 
          : 'border-slate-200 bg-white/60 text-text hover:border-accent/30 hover:bg-white/80 hover:shadow-md'
      } ${className}`}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 bg-accent/10 rounded-2xl"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1.5, opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.4 }}
      />
      
      <div className="relative flex items-center justify-between h-full">
        <div className="flex items-center min-w-0 flex-1">
          {icon && <span className="mr-3 flex-shrink-0">{icon}</span>}
          <div className="min-w-0 flex-1">
            <span className="font-medium text-button block truncate">{children}</span>
            {description && (
              <span className="text-hint text-muted block truncate">{description}</span>
            )}
          </div>
        </div>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="flex-shrink-0 ml-2"
          >
            <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
              <Check className="h-3.5 w-3.5 text-white" />
            </div>
          </motion.div>
        )}
      </div>
    </motion.button>
  );
};