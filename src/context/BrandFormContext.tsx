import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BrandFormData, initialBrandFormData } from '../types/brandFormTypes';
import { useBrandFormValidation } from '../hooks/useBrandFormValidation';

interface BrandFormState {
  data: BrandFormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

interface BrandFormContextType {
  formState: BrandFormState;
  updateFormData: (name: string, value: any) => void;
  setFieldTouched: (name: string) => void;
  isFormValid: boolean;
  submitForm: () => Promise<void>;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

const BrandFormContext = createContext<BrandFormContextType | undefined>(undefined);

interface BrandFormProviderProps {
  children: ReactNode;
}

export const BrandFormProvider: React.FC<BrandFormProviderProps> = ({ children }) => {
  const [formState, setFormState] = useState<BrandFormState>({
    data: initialBrandFormData,
    errors: {},
    touched: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { errors, isFormValid, setFieldTouched, touchAll, touched } = useBrandFormValidation(formState.data);

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
    touchAll();
    
    if (isFormValid) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("Brand form submitted successfully", formState.data);
        setIsSubmitted(true);
      } catch (error) {
        console.error("Brand form submission failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <BrandFormContext.Provider value={{
      formState: { ...formState, errors, touched },
      updateFormData,
      setFieldTouched,
      isFormValid,
      submitForm,
      isSubmitting,
      isSubmitted
    }}>
      {children}
    </BrandFormContext.Provider>
  );
};

export const useBrandFormContext = (): BrandFormContextType => {
  const context = useContext(BrandFormContext);
  if (context === undefined) {
    throw new Error('useBrandFormContext must be used within a BrandFormProvider');
  }
  return context;
};