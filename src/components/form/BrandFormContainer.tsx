import React from 'react';
import { useBrandFormContext } from '../../context/BrandFormContext';
import Button from '../ui/Button';
import BrandInfoSection from './BrandInfoSection';
import RequirementsSection from './RequirementsSection';
import BrandSuccessMessage from '../BrandSuccessMessage';

interface BrandFormContainerProps {
  onSuccess?: () => void;
}

const BrandFormContainer: React.FC<BrandFormContainerProps> = ({ onSuccess }) => {
  const { 
    formState, 
    updateFormData, 
    setFieldTouched,
    submitForm,
    isSubmitting,
    isSubmitted
  } = useBrandFormContext();

  const { data, errors } = formState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
    if (onSuccess) {
      onSuccess();
    }
  };

  if (isSubmitted) {
    return <BrandSuccessMessage onContinue={onSuccess} />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Brand Information */}
        <BrandInfoSection 
          formData={data} 
          onChange={updateFormData} 
          errors={errors} 
          setFieldTouched={setFieldTouched} 
        />
        
        {/* 3PL Requirements & Matching Criteria */}
        <RequirementsSection 
          formData={data} 
          onChange={updateFormData} 
          errors={errors} 
          setFieldTouched={setFieldTouched} 
        />
        
        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-lg"
          >
            {isSubmitting ? 'Creating Brand Profile...' : 'Create Brand Profile'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BrandFormContainer;