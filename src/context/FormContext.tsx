import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FormData, initialFormData } from '../types/formTypes';
import { useFormValidation } from '../hooks/useFormValidation';

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

  const submitForm = async (): Promise<void> => {
    touchAll(); // Touch all fields to show any validation errors
    
    if (isFormValid) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Form submitted successfully", formState.data);
        setIsSubmitted(true);
      } catch (error) {
        console.error("Form submission failed:", error);
        // Handle error appropriately
      } finally {
        setIsSubmitting(false);
      }
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