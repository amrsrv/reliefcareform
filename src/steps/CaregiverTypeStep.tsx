import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Search, ChevronDown } from 'lucide-react';
import { StepProps } from '../types/form';
import { AnimatedInput } from '../components/AnimatedInput';

const caregiverTypes = [
  { value: 'psw_hsw', label: 'Personal Support Worker / Home Support Worker (PSW/HSW)' },
  { value: 'home_care_aide', label: 'Home Care Aide' },
  { value: 'rn', label: 'Registered Nurse (RN)' },
  { value: 'rpn', label: 'Registered Practical Nurse (RPN)' },
  { value: 'np', label: 'Nurse Practitioner (NP)' },
  { value: 'geriatrician', label: 'Geriatrician' },
  { value: 'physiotherapist', label: 'Physiotherapist' },
  { value: 'massage_therapist', label: 'Massage Therapist' },
  { value: 'social_worker', label: 'Social Worker' },
  { value: 'therapist', label: 'Therapist' },
  { value: 'psychologist', label: 'Psychologist' },
  { value: 'psychiatrist', label: 'Psychiatrist' },
  { value: 'doctor_gp', label: 'Doctor (GP)' },
  { value: 'paediatrician', label: 'Paediatrician' },
  { value: 'counselor', label: 'Counselor' },
  { value: 'kinesiologist', label: 'Kinesiologist' },
  { value: 'doula', label: 'Doula' },
  { value: 'midwife', label: 'Midwife' },
  { value: 'pharmacist', label: 'Pharmacist' },
  { value: 'pharmacy_technician', label: 'Pharmacy Technician' },
  { value: 'chiropractor', label: 'Chiropractor' },
  { value: 'acupuncturist', label: 'Acupuncturist' },
  { value: 'dentist', label: 'Dentist' },
  { value: 'dental_hygienist', label: 'Dental Hygienist' },
  { value: 'dietitian', label: 'Dietitian/Nutritionist' },
];

export const CaregiverTypeStep: React.FC<StepProps> = ({ 
  formData, 
  updateFormData, 
  setCanProceed
}) => {
  const [showTypes, setShowTypes] = useState(formData.caregiverType === 'yes');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePreferenceChange = (value: string) => {
    updateFormData({ caregiverType: value });
    setShowTypes(value === 'yes');
    if (value === 'no') {
      updateFormData({ specificCaregiverType: '' });
    }
  };

  const handleTypeSelect = (value: string) => {
    updateFormData({ specificCaregiverType: value });
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  const filteredTypes = caregiverTypes.filter(type =>
    type.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canProceed = formData.caregiverType && (
    formData.caregiverType === 'no' || formData.specificCaregiverType
  );

  useEffect(() => {
    setCanProceed(canProceed);
  }, [canProceed, setCanProceed]);

  const selectedType = caregiverTypes.find(type => type.value === formData.specificCaregiverType);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <UserCheck className="h-12 w-12 text-accent mx-auto mb-4" />
        <h2 className="text-heading font-poppins text-text mb-2">
          Do you require a specific type&nbsp;of&nbsp;caregiver?
        </h2>
        <p className="text-placeholder text-sm">This is optional</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.button
          className={`h-12 p-4 border rounded-brand font-medium transition-all duration-200 flex items-center justify-center ${
            formData.caregiverType === 'no'
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
            formData.caregiverType === 'yes'
              ? 'border-accent bg-selected-bg text-primary shadow-selected'
              : 'border-gray-200 bg-white text-text hover:border-accent/30 hover:bg-brand-light'
          }`}
          onClick={() => handlePreferenceChange('yes')}
          whileTap={{ scale: 0.98 }}
        >
          Yes
        </motion.button>
      </div>

      {showTypes && (
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
              <span className={selectedType ? 'text-text' : 'text-placeholder'}>
                {selectedType ? selectedType.label : 'Select caregiver type...'}
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
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-brand shadow-card z-10"
              >
                <div className="p-3 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-placeholder" />
                    <input
                      type="text"
                      placeholder="Search caregiver types..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-brand text-sm focus:outline-none focus:border-accent font-poppins"
                    />
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredTypes.map((type, index) => (
                    <motion.button
                      key={type.value}
                      className="w-full px-4 py-3 text-left hover:bg-brand-light transition-colors text-sm"
                      onClick={() => handleTypeSelect(type.value)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                    >
                      {type.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {formData.caregiverType === 'yes' && !formData.specificCaregiverType && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-light border border-accent/20 rounded-brand p-4 text-center"
            >
              <p className="text-accent font-medium text-sm">
                💡 We'll default to a PSW if&nbsp;you're&nbsp;unsure
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};