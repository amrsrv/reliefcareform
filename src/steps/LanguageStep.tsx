import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { StepProps } from '../types/form';
import { AnimatedInput } from '../components/AnimatedInput';

const languages = [
  { value: 'english', label: 'English', flag: '🇺🇸' },
  { value: 'french', label: 'French', flag: '🇫🇷' },
  { value: 'farsi', label: 'Farsi', flag: '🇮🇷' },
  { value: 'mandarin', label: 'Mandarin', flag: '🇨🇳' },
  { value: 'punjabi', label: 'Punjabi', flag: '🇮🇳' },
  { value: 'hindi', label: 'Hindi', flag: '🇮🇳' },
  { value: 'tamil', label: 'Tamil', flag: '🇮🇳' },
  { value: 'spanish', label: 'Spanish', flag: '🇪🇸' },
  { value: 'other', label: 'Other', flag: '🌍' },
];

export const LanguageStep: React.FC<StepProps> = ({ 
  formData, 
  updateFormData, 
  setCanProceed
}) => {
  const [showLanguages, setShowLanguages] = useState(formData.languagePreference === 'yes');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePreferenceChange = (value: string) => {
    updateFormData({ languagePreference: value });
    setShowLanguages(value === 'yes');
    if (value === 'no') {
      updateFormData({ specificLanguage: '' });
    }
  };

  const handleLanguageSelect = (value: string) => {
    updateFormData({ specificLanguage: value });
    setIsDropdownOpen(false);
    if (value !== 'other') {
      updateFormData({ specificLanguageOther: '' });
    }
  };

  const canProceed = formData.languagePreference && (
    formData.languagePreference === 'no' || 
    (formData.specificLanguage && (formData.specificLanguage !== 'other' || formData.specificLanguageOther))
  );

  useEffect(() => {
    setCanProceed(canProceed);
  }, [canProceed, setCanProceed]);

  const selectedLanguage = languages.find(lang => lang.value === formData.specificLanguage);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <Globe className="h-12 w-12 text-accent mx-auto mb-4" />
        <h2 className="text-heading font-poppins text-text mb-2">
          Do you prefer your caregiver speaks a&nbsp;specific&nbsp;language?
        </h2>
        <p className="text-placeholder text-sm">This is optional</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.button
          className={`h-12 p-4 border rounded-brand font-medium transition-all duration-200 flex items-center justify-center ${
            formData.languagePreference === 'no'
              ? 'border-accent bg-selected-bg text-primary shadow-selected'
              : 'border-gray-200 bg-white text-text hover:border-accent/30 hover:bg-brand-light'
          }`}
          onClick={() => handlePreferenceChange('no')}
          whileTap={{ scale: 0.98 }}
        >
          No 
        </motion.button>
        <motion.button
          className={`h-12 p-4 border rounded-brand font-medium transition-all duration-200 flex items-center justify-center ${
            formData.languagePreference === 'yes'
              ? 'border-accent bg-selected-bg text-primary shadow-selected'
              : 'border-gray-200 bg-white text-text hover:border-accent/30 hover:bg-brand-light'
          }`}
          onClick={() => handlePreferenceChange('yes')}
          whileTap={{ scale: 0.98 }}
        >
          Yes
        </motion.button>
      </div>

      {showLanguages && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="relative">
            <motion.button
              className="w-full h-12 px-4 py-3 border border-gray-200 rounded-brand text-left bg-white flex items-center justify-between hover:border-accent/30 hover:bg-brand-light transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              whileTap={{ scale: 0.98 }}
            >
              <span className={selectedLanguage ? 'text-text' : 'text-placeholder'}>
                {selectedLanguage ? (
                  <>
                    <span className="mr-2">{selectedLanguage.flag}</span>
                    {selectedLanguage.label}
                  </>
                ) : (
                  'Select preferred language...'
                )}
              </span>
              <motion.div
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-5 w-5 text-placeholder" />
              </motion.div>
            </motion.button>

            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-brand shadow-card z-10 max-h-60 overflow-y-auto"
              >
                {languages.map((language, index) => (
                  <motion.button
                    key={language.value}
                    className="w-full px-4 py-3 text-left hover:bg-brand-light transition-colors flex items-center text-sm"
                    onClick={() => handleLanguageSelect(language.value)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="mr-3">{language.flag}</span>
                    {language.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>

          {formData.specificLanguage === 'other' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <AnimatedInput
                placeholder="Please specify language..."
                value={formData.specificLanguageOther || ''}
                onChange={(value) => updateFormData({ specificLanguageOther: value })}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};