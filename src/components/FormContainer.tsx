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
    isSubmitted,
    submitError
  } = useFormContext();

  const { data, errors } = formState;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
    if (onSuccess && !submitError) {
      // Only call onSuccess if there was no error
      setTimeout(() => {
        onSuccess();
      }, 2000); // Give time to show the success message
    }
  };

  if (isSubmitted && !submitError) {
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
        
        {/* Error Message */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">
              <strong>Error:</strong> {submitError}
            </p>
          </div>
        )}
        
        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg"
          >
            {isSubmitting ? 'Submitting to Database...' : 'Submit 3PL Application'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormContainer;