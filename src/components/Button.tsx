import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  variant = 'primary',
  className = ''
}) => {
  const baseClasses = "relative w-full h-12 px-6 rounded-brand font-medium text-button transition-all duration-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-accent/20";
  const variantClasses = variant === 'primary' 
    ? "bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg hover:shadow-xl hover:from-primary/90 hover:to-primary/80 disabled:bg-gray-300 disabled:text-gray-500 font-medium" 
    : "bg-white/80 backdrop-blur-sm text-primary border border-slate-200 hover:border-primary/30 hover:bg-white/90 hover:shadow-md font-medium";

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: disabled ? 1 : 1.005 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 3, opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Button Content */}
      <span className="relative flex items-center justify-center">
        {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
        {children}
      </span>
    </motion.button>
  );
};