import React from 'react';
import { useFormContext } from '../context/FormContext';
import ProgressBar from './ui/ProgressBar';
import Button from './ui/Button';
import ContactInfoSection from './form/ContactInfoSection';
import CapabilitiesSection from './form/CapabilitiesSection';
import ReferencesSection from './form/ReferencesSection';
import MediaUploadsSection from './form/MediaUploadsSection';
import FormReviewSection from './form/FormReviewSection';
import SuccessMessage from './SuccessMessage';

const FormContainer: React.FC = () => {
  const { 
    formState, 
    updateFormData, 
    nextStep, 
    prevStep, 
    setFieldTouched,
    submitForm,
    isSubmitting,
    isSubmitted
  } = useFormContext();

  const { currentStep, data, errors } = formState;

  const steps = [
    'Contact',
    'Capabilities',
    'References',
    'Media',
    'Review'
  ];

  if (isSubmitted) {
    return <SuccessMessage />;
  }

  const renderFormSection = () => {
    switch (currentStep) {
      case 0:
        return (
          <ContactInfoSection 
            formData={data} 
            onChange={updateFormData} 
            errors={errors} 
            setFieldTouched={setFieldTouched} 
          />
        );
      case 1:
        return (
          <CapabilitiesSection 
            formData={data} 
            onChange={updateFormData} 
            errors={errors} 
            setFieldTouched={setFieldTouched} 
          />
        );
      case 2:
        return (
          <ReferencesSection 
            formData={data} 
            onChange={updateFormData} 
            errors={errors} 
            setFieldTouched={setFieldTouched} 
          />
        );
      case 3:
        return (
          <MediaUploadsSection 
            formData={data} 
            onChange={updateFormData} 
            errors={errors} 
            setFieldTouched={setFieldTouched} 
          />
        );
      case 4:
        return <FormReviewSection formData={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <ProgressBar steps={steps} currentStep={currentStep} />
      
      <form onSubmit={(e) => e.preventDefault()}>
        {renderFormSection()}
        
        <div className="flex justify-between mt-8">
          {currentStep > 0 ? (
            <Button onClick={prevStep} variant="outline">
              Back
            </Button>
          ) : (
            <div></div> // Empty div for spacing
          )}
          
          {currentStep < steps.length - 1 ? (
            <Button onClick={nextStep} type="button">
              Continue
            </Button>
          ) : (
            <Button 
              onClick={submitForm} 
              type="button"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormContainer;