import { useState, useEffect } from 'react';
import { BrandFormData } from '../types/brandFormTypes';

export type BrandValidationErrors = Record<string, string>;

export const useBrandFormValidation = (formData: BrandFormData) => {
  const [errors, setErrors] = useState<BrandValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateUrl = (url: string): boolean => {
    if (!url) return true; // URL is optional
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = (): BrandValidationErrors => {
    const newErrors: BrandValidationErrors = {};

    // Required fields
    if (!formData.brandName.trim()) {
      newErrors.brandName = 'Brand name is required';
    }

    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!validateEmail(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    if (!formData.industry) {
      newErrors.industry = 'Industry is required';
    }

    if (!formData.monthlyVolume || formData.monthlyVolume < 1) {
      newErrors.monthlyVolume = 'Monthly volume must be at least 1 unit';
    }

    // Optional URL validation
    if (formData.websiteUrl && !validateUrl(formData.websiteUrl)) {
      newErrors.websiteUrl = 'Please enter a valid URL';
    }

    // Product types validation
    if (formData.productTypes.length === 0) {
      newErrors.productTypes = 'Please select at least one product type';
    }

    // Preferred locations validation
    if (formData.preferredLocations.length === 0) {
      newErrors.preferredLocations = 'Please select at least one preferred location';
    }

    // Performance requirements validation
    if (formData.maxReceivingTime && (formData.maxReceivingTime < 1 || formData.maxReceivingTime > 30)) {
      newErrors.maxReceivingTime = 'Receiving time must be between 1 and 30 days';
    }

    if (formData.minOrderAccuracy && (formData.minOrderAccuracy < 90 || formData.minOrderAccuracy > 100)) {
      newErrors.minOrderAccuracy = 'Order accuracy must be between 90% and 100%';
    }

    if (formData.minInventoryAccuracy && (formData.minInventoryAccuracy < 90 || formData.minInventoryAccuracy > 100)) {
      newErrors.minInventoryAccuracy = 'Inventory accuracy must be between 90% and 100%';
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
    
    // Touch all form fields
    Object.keys(formData).forEach(key => {
      allFields[key] = true;
    });
    
    setTouched(allFields);
  };

  const isFormValid = Object.keys(errors).length === 0;

  // Return visible errors (only for touched fields)
  const visibleErrors: BrandValidationErrors = {};
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