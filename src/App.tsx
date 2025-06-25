import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormData } from './types/form';
import { Button } from './components/Button';
import { ProgressBar } from './components/ProgressBar';
import { WelcomeStep } from './steps/WelcomeStep';
import { CareForStep } from './steps/CareForStep';
import { AgeStep } from './steps/AgeStep';
import { RelationshipStep } from './steps/RelationshipStep';
import { SupportTypeStep } from './steps/SupportTypeStep';
import { CareScheduleStep } from './steps/CareScheduleStep';
import { PreferredTimeStep } from './steps/PreferredTimeStep';
import { LanguageStep } from './steps/LanguageStep';
import { BudgetStep } from './steps/BudgetStep';
import { StartDateStep } from './steps/StartDateStep';
import { CaregiverTypeStep } from './steps/CaregiverTypeStep';
import { ContactInfoStep } from './steps/ContactInfoStep';
import { ConfirmationStep } from './steps/ConfirmationStep';

const TOTAL_STEPS = 13;

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [canProceed, setCanProceed] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    careFor: '',
    age: 0,
    relationship: '',
    supportTypes: [],
    careSchedule: '',
    preferredTimes: [],
    languagePreference: '',
    weeklyBudget: '',
    startDate: '',
    caregiverType: '',
    fullName: '',
    email: '',
    phoneNumber: '',
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    // Skip time preferences if live-in care is selected
    if (currentStep === 6 && formData.careSchedule === 'live_in') {
      setCurrentStep(8);
    } else {
      setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const handleBack = () => {
    // Handle backwards navigation with live-in skip logic
    if (currentStep === 8 && formData.careSchedule === 'live_in') {
      setCurrentStep(6);
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const stepProps = {
    formData,
    updateFormData,
    onNext: handleNext,
    onBack: handleBack,
    currentStep,
    totalSteps: TOTAL_STEPS,
    setCanProceed,
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <WelcomeStep onNext={handleNext} />;
      case 2: return <CareForStep {...stepProps} />;
      case 3: return <AgeStep {...stepProps} />;
      case 4: return <RelationshipStep {...stepProps} />;
      case 5: return <SupportTypeStep {...stepProps} />;
      case 6: return <CareScheduleStep {...stepProps} />;
      case 7: return <PreferredTimeStep {...stepProps} />;
      case 8: return <LanguageStep {...stepProps} />;
      case 9: return <BudgetStep {...stepProps} />;
      case 10: return <StartDateStep {...stepProps} />;
      case 11: return <CaregiverTypeStep {...stepProps} />;
      case 12: return <ContactInfoStep {...stepProps} />;
      case 13: return <ConfirmationStep formData={formData} />;
      default: return <WelcomeStep onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-poppins relative overflow-hidden">
      {/* Modern Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2341CAB5%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      {/* Brand Watermark */}
      <div className="fixed top-8 right-8 pointer-events-none z-0">
        <img
          src="https://tcjssqfkdqnqhgcibqxw.supabase.co/storage/v1/object/public/mediastorage/Asset%207@4x-8.png"
          alt=""
          className="w-32 h-32 opacity-[0.02] blur-[0.5px]"
        />
      </div>
      
      <div className="max-w-lg mx-auto px-4 py-6 relative z-10">
        {/* Header with Logo and Progress */}
        {currentStep > 1 && currentStep < 13 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            {/* Brand Icon */}
            <div className="text-center mb-4">
              <img
                src="https://tcjssqfkdqnqhgcibqxw.supabase.co/storage/v1/object/public/mediastorage/Asset%207@4x-8.png"
                alt="ReliefCare"
                className="w-7 h-7 mx-auto opacity-80"
              />
            </div>
            
            {/* Progress Bar */}
            <ProgressBar currentStep={currentStep - 1} totalSteps={11} />
          </motion.div>
        )}
        
        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 flex flex-col relative z-10 overflow-hidden" style={{ height: 'calc(100vh - 200px)', maxHeight: '600px' }}>
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Fixed Navigation Buttons */}
          {currentStep > 1 && currentStep < 13 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t border-slate-100 p-6 md:p-8 pt-4 md:pt-6 bg-white/60 backdrop-blur-sm"
            >
              <div className="flex gap-3">
                <Button variant="secondary" onClick={handleBack} className="flex-1">
                  Back
                </Button>
                <Button 
                  className="flex-[2]"
                  onClick={currentStep === 12 ? async () => {
                    // Handle form submission for contact info step
                    const contactStep = document.querySelector('[data-step="contact"]');
                    if (contactStep) {
                      const submitButton = contactStep.querySelector('button[type="submit"]');
                      if (submitButton) {
                        submitButton.click();
                        return;
                      }
                    }
                    
                    // Fallback to direct submission
                    try {
                      const response = await fetch('https://hook.us1.make.com/gbk8wiz1sn0ejecdg3daprwg3c2vp7mq', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                      });

                      if (response.ok) {
                        handleNext();
                      } else {
                        throw new Error('Failed to submit form');
                      }
                    } catch (error) {
                      console.error('Form submission error:', error);
                      alert('There was an error submitting your form. Please try again.');
                    }
                  } : handleNext} 
                  disabled={!canProceed}
                >
                  {currentStep === 12 ? 'Submit Request' : 'Continue'}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;