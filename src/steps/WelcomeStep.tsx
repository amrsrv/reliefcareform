import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Button } from '../components/Button';

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-8 py-8 flex flex-col justify-between min-h-full"
    >
      {/* Top Section - Logo and Content */}
      <div className="space-y-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img
            src="https://tcjssqfkdqnqhgcibqxw.supabase.co/storage/v1/object/public/mediastorage//reliefcarelogo.webp"
            alt="ReliefCare"
            className="w-28 h-auto mx-auto"
          />
        </motion.div>
        
        {/* Heart Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Heart className="h-6 w-6 text-accent fill-accent/20" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-3 px-6"
        >
          <h1 className="text-xl font-semibold text-text font-poppins leading-tight">
            Let's find care that feels&nbsp;like&nbsp;home
          </h1>
          <p className="text-sm text-muted leading-relaxed max-w-sm mx-auto">
            Answer a few quick questions and we'll match you with trusted caregivers&nbsp;near&nbsp;you.
          </p>
        </motion.div>
      </div>

      {/* Bottom Section - CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="px-6"
      >
        <motion.button
          className="w-full h-11 px-6 bg-gradient-to-r from-primary to-primary/90 text-white rounded-brand font-medium text-sm shadow-lg hover:shadow-xl hover:from-primary/90 hover:to-primary/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20"
          onClick={onNext}
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.005 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <span className="relative flex items-center justify-center">
            Let's Begin
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};