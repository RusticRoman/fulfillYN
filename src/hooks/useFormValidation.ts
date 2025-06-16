import { useState, useEffect } from 'react';
import { FormData } from '../types/formTypes';

export type ValidationErrors = Record<string, string>;

export const useFormValidation = (formData: FormData) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string): boolean => {
    if (!email) return true; // Email is optional
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateUrl = (url: string): boolean => {
    // Allow empty URL
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Basic Contact Info - all optional now
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.websiteUrl && !validateUrl(formData.websiteUrl)) {
      newErrors.websiteUrl = 'Please enter a valid URL';
    }

    // Minimum Order Volume - mandatory with specific range
    if (!formData.minimumOrderVolume || formData.minimumOrderVolume < 11 || formData.minimumOrderVolume > 99999) {
      newErrors.minimumOrderVolume = 'Minimum order volume must be between 11 and 99,999 units';
    }

    // Temperature control validation
    if (formData.temperatureControlled && formData.temperatureTypes.length === 0) {
      newErrors.temperatureTypes = 'Please select at least one temperature control type';
    }

    // B2B validation
    if (formData.supportsB2b && formData.b2bTypes.length === 0) {
      newErrors.b2bTypes = 'Please select at least one B2B type';
    }

    // Other validations for certification
    if (formData.certifications.includes('other') && !formData.otherCertification) {
      newErrors.otherCertification = 'Please specify the other certification';
    }

    // WMS validation - optional now
    if (formData.wmsSystem === 'other' && !formData.otherWms) {
      newErrors.otherWms = 'Please specify the other WMS system';
    }

    // Proprietary software validation
    if (formData.hasProprietarySoftware && !formData.proprietarySoftwareDetails) {
      newErrors.proprietarySoftwareDetails = 'Please provide details about your proprietary software';
    }

    // References validations - all optional now
    formData.references.forEach((reference, index) => {
      // Only validate if any field is filled (partial validation)
      const hasAnyField = reference.brandName || reference.website || reference.contactEmail;
      
      if (hasAnyField) {
        if (reference.website && !validateUrl(reference.website)) {
          newErrors[`references.${index}.website`] = 'Please enter a valid URL';
        }
        if (reference.contactEmail && !validateEmail(reference.contactEmail)) {
          newErrors[`references.${index}.contactEmail`] = 'Please enter a valid email address';
        }
      }
    });

    // Media validations
    if (formData.introVideo && !validateUrl(formData.introVideo)) {
      newErrors.introVideo = 'Please enter a valid URL for the video';
    }

    return newErrors;
  };

  useEffect(() => {
    const newErrors = validateForm();
    setErrors(newErrors);
  }, [formData]);

  const setFieldTouched = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const touchAll = () => {
    const allFields: Record<string, boolean> = {};
    
    // Basic fields
    Object.keys(formData).forEach(key => {
      allFields[key] = true;
    });
    
    // Nested fields
    formData.references.forEach((_, index) => {
      allFields[`references.${index}.brandName`] = true;
      allFields[`references.${index}.website`] = true;
      allFields[`references.${index}.contactEmail`] = true;
    });
    
    setTouched(allFields);
  };

  const isFormValid = Object.keys(errors).length === 0;

  // Return visible errors (only for touched fields)
  const visibleErrors: ValidationErrors = {};
  Object.keys(errors).forEach(key => {
    if (touched[key]) {
      visibleErrors[key] = errors[key];
    }
  });

  return {
    errors: visibleErrors,
    isFormValid,
    setFieldTouched,
    touchAll,
    touched
  };
};