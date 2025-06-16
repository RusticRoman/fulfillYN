import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FormData, initialFormData } from '../types/formTypes';
import { useFormValidation } from '../hooks/useFormValidation';
import { DatabaseService } from '../services/DatabaseService';

interface FormState {
  data: FormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

// Define the context type
interface FormContextType {
  formState: FormState;
  updateFormData: (name: string, value: any) => void;
  setFieldTouched: (name: string) => void;
  isFormValid: boolean;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError: string | null;
}

// Create the context with a default value
const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>({
    data: initialFormData,
    errors: {},
    touched: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const { errors, isFormValid, setFieldTouched, touchAll, touched } = useFormValidation(formState.data);
  const databaseService = new DatabaseService();

  const updateFormData = (name: string, value: any) => {
    setFormState(prevState => ({
      ...prevState,
      data: {
        ...prevState.data,
        [name]: value
      }
    }));
  };

  const submitForm = async (): Promise<void> => {
    touchAll(); // Touch all fields to show any validation errors
    setSubmitError(null);
    
    if (isFormValid) {
      setIsSubmitting(true);
      try {
        console.log("Submitting form data to Supabase:", formState.data);
        
        // Create the company profile in Supabase
        const result = await databaseService.createCompanyProfile(formState.data);
        
        console.log("Form submitted successfully to Supabase:", result);
        setIsSubmitted(true);
      } catch (error) {
        console.error("Form submission failed:", error);
        setSubmitError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log("Form validation failed:", errors);
    }
  };

  return (
    <FormContext.Provider value={{
      formState: { ...formState, errors, touched },
      updateFormData,
      setFieldTouched,
      isFormValid,
      submitForm,
      isSubmitting,
      isSubmitted,
      submitError
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