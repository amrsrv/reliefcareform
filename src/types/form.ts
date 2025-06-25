export interface FormData {
  // Page 2
  careFor: string;
  careForOther?: string;
  
  // Page 3
  ageGroup: string;
  
  // Page 4
  relationship: string;
  relationshipOther?: string;
  
  // Page 5
  supportTypes: string[];
  supportTypeOther?: string;
  
  // Page 6
  careSchedule: string;
  
  // Page 7
  preferredTimes: string[];
  
  // Page 8
  languagePreference: string;
  specificLanguage?: string;
  
  // Page 9
  weeklyBudget: string;
  
  // Page 10
  startDate: string;
  
  // Page 11
  caregiverType: string;
  specificCaregiverType?: string;
  
  // Page 12
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  setCanProceed: (can: boolean) => void;
}