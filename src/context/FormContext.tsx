import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FormData, FormSection, initialFormData, FormState } from '../types/formTypes';
import { useFormValidation } from '../hooks/useFormValidation';

// Define the context type
interface FormContextType {
  formState: FormState;
  updateFormData: (name: string, value: any) => void;
  setFieldTouched: (name: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isStepValid: (step: number) => boolean;
  validateCurrentStep: () => boolean;
  submitForm: () => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

// Create the context with a default value
const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>({
    currentStep: 0,
    data: initialFormData,
    errors: {},
    touched: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { errors, isFormValid, setFieldTouched, touchAll, touched } = useFormValidation(formState.data);

  const updateFormData = (name: string, value: any) => {
    setFormState(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        [name]: value
      }
    }));
  };

  // Function to check if a specific step is valid
  const isStepValid = (step: number): boolean => {
    // Define which fields belong to each step
    const stepFields: Record<number, string[]> = {
      0: [], // Contact info is all optional now
      1: ['minimumOrderVolume'], // Only minimum order volume is mandatory in capabilities
      2: ['references'], // References are required
      3: [], // Media uploads are optional
      4: [] // Review step - no validation needed
    };

    const fieldsToCheck = stepFields[step] || [];
    
    if (fieldsToCheck.length === 0) {
      return true; // If no fields to check, step is valid
    }

    // Check if any of the fields for this step have errors
    return !fieldsToCheck.some(field => errors[field]);
  };

  const validateCurrentStep = (): boolean => {
    // Touch all fields in current step to show any validation errors
    const stepFields: Record<number, string[]> = {
      0: [], // Contact info is all optional
      1: ['minimumOrderVolume'], // Only minimum order volume is mandatory
      2: ['references'],
      3: [],
      4: []
    };
    
    const currentStepFields = stepFields[formState.currentStep] || [];
    currentStepFields.forEach(field => setFieldTouched(field));
    
    return isStepValid(formState.currentStep);
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setFormState(prevState => ({
        ...prevState,
        currentStep: prevState.currentStep + 1
      }));
    }
  };

  const prevStep = () => {
    setFormState(prevState => ({
      ...prevState,
      currentStep: Math.max(0, prevState.currentStep - 1)
    }));
  };

  const goToStep = (step: number) => {
    setFormState(prevState => ({
      ...prevState,
      currentStep: step
    }));
  };

  const submitForm = () => {
    touchAll(); // Touch all fields to show any validation errors
    
    if (isFormValid) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted successfully", formState.data);
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  return (
    <FormContext.Provider value={{
      formState: { ...formState, errors, touched },
      updateFormData,
      setFieldTouched,
      nextStep,
      prevStep,
      goToStep,
      isStepValid,
      validateCurrentStep,
      submitForm,
      isSubmitting,
      isSubmitted
    }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};