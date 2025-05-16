import { useState, useEffect } from 'react';
import { FormData } from '../types/formTypes';

export type ValidationErrors = Record<string, string>;

export const useFormValidation = (formData: FormData) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateEmail = (email: string): boolean => {
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

    // Basic Contact Info
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (formData.websiteUrl && !validateUrl(formData.websiteUrl)) {
      newErrors.websiteUrl = 'Please enter a valid URL';
    }

    // Company Overview
    if (!formData.yearFounded) newErrors.yearFounded = 'Year founded is required';
    if (!formData.headquartersAddress) newErrors.headquartersAddress = 'Headquarters address is required';
    
    // Warehouse locations
    formData.warehouseLocations.forEach((location, index) => {
      if (!location.address) {
        newErrors[`warehouseLocations.${index}.address`] = 'Warehouse address is required';
      }
      if (location.squareFootage <= 0) {
        newErrors[`warehouseLocations.${index}.squareFootage`] = 'Valid square footage is required';
      }
    });

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

    // WMS validation
    if (!formData.wmsSystem) {
      newErrors.wmsSystem = 'Please select a WMS system';
    }
    if (formData.wmsSystem === 'other' && !formData.otherWms) {
      newErrors.otherWms = 'Please specify the other WMS system';
    }

    // Proprietary software validation
    if (formData.hasProprietarySoftware && !formData.proprietarySoftwareDetails) {
      newErrors.proprietarySoftwareDetails = 'Please provide details about your proprietary software';
    }

    // SLA validations
    if (formData.averageReceivingTime <= 0) {
      newErrors.averageReceivingTime = 'Please enter a valid receiving time';
    }
    if (formData.maxReceivingTime <= 0) {
      newErrors.maxReceivingTime = 'Please enter a valid max receiving time';
    }
    if (!formData.dtcSla) {
      newErrors.dtcSla = 'DTC SLA information is required';
    }

    // Returns validation
    if (formData.handlesReturns && formData.returnsProcessingTime <= 0) {
      newErrors.returnsProcessingTime = 'Please enter a valid returns processing time';
    }

    // Accuracy validations
    if (!formData.orderAccuracyRate) {
      newErrors.orderAccuracyRate = 'Order accuracy rate is required';
    }
    if (!formData.inventoryAccuracyRate) {
      newErrors.inventoryAccuracyRate = 'Inventory accuracy rate is required';
    }
    if (!formData.cycleCounting) {
      newErrors.cycleCounting = 'Please select a cycle counting frequency';
    }
    if (!formData.billingFrequency) {
      newErrors.billingFrequency = 'Billing frequency is required';
    }

    // Support validations
    if (!formData.responseTime) {
      newErrors.responseTime = 'Response time information is required';
    }
    if (!formData.supportHours) {
      newErrors.supportHours = 'Support hours information is required';
    }

    // References validations
    formData.references.forEach((reference, index) => {
      if (!reference.brandName) {
        newErrors[`references.${index}.brandName`] = 'Brand name is required';
      }
      if (!reference.website) {
        newErrors[`references.${index}.website`] = 'Website is required';
      } else if (!validateUrl(reference.website)) {
        newErrors[`references.${index}.website`] = 'Please enter a valid URL';
      }
      if (!reference.contactEmail) {
        newErrors[`references.${index}.contactEmail`] = 'Contact email is required';
      } else if (!validateEmail(reference.contactEmail)) {
        newErrors[`references.${index}.contactEmail`] = 'Please enter a valid email address';
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
    formData.warehouseLocations.forEach((_, index) => {
      allFields[`warehouseLocations.${index}.address`] = true;
      allFields[`warehouseLocations.${index}.squareFootage`] = true;
    });
    
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