import React from 'react';
import { useFormContext } from '../context/FormContext';
import Button from './ui/Button';
import ContactInfoSection from './form/ContactInfoSection';
import CapabilitiesSection from './form/CapabilitiesSection';
import ReferencesSection from './form/ReferencesSection';
import MediaUploadsSection from './form/MediaUploadsSection';
import SuccessMessage from './SuccessMessage';

interface FormContainerProps {
  onSuccess?: () => void;
}

const FormContainer: React.FC<FormContainerProps> = ({ onSuccess }) => {
  const { 
    formState, 
    updateFormData, 
    setFieldTouched,
    submitForm,
    isSubmitting,
    isSubmitted
  } = useFormContext();

  const { data, errors } = formState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
    if (onSuccess) {
      onSuccess();
    }
  };

  if (isSubmitted) {
    return <SuccessMessage onContinue={onSuccess} />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Information */}
        <ContactInfoSection 
          formData={data} 
          onChange={updateFormData} 
          errors={errors} 
          setFieldTouched={setFieldTouched} 
        />
        
        {/* Capabilities */}
        <CapabilitiesSection 
          formData={data} 
          onChange={updateFormData} 
          errors={errors} 
          setFieldTouched={setFieldTouched} 
        />
        
        {/* References */}
        <ReferencesSection 
          formData={data} 
          onChange={updateFormData} 
          errors={errors} 
          setFieldTouched={setFieldTouched} 
        />
        
        {/* Media Uploads */}
        <MediaUploadsSection 
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
            className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg"
          >
            {isSubmitting ? 'Submitting...' : 'Submit 3PL Application'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormContainer;