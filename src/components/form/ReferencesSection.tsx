import React from 'react';
import { FormData, Reference } from '../../types/formTypes';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface ReferencesSectionProps {
  formData: FormData;
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
  setFieldTouched: (name: string) => void;
}

const ReferencesSection: React.FC<ReferencesSectionProps> = ({
  formData,
  onChange,
  errors,
  setFieldTouched,
}) => {
  const updateReference = (index: number, field: keyof Reference, value: string) => {
    const updatedReferences = [...formData.references];
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value
    };
    onChange('references', updatedReferences);
  };

  const addReference = () => {
    if (formData.references.length < 3) {
      onChange('references', [
        ...formData.references,
        { brandName: '', website: '', contactEmail: '' }
      ]);
    }
  };

  const removeReference = (index: number) => {
    const updatedReferences = [...formData.references];
    updatedReferences.splice(index, 1);
    onChange('references', updatedReferences);
  };

  return (
    <Card title="Customer References" subtitle="Please provide up to 3 references" className="mb-6 animate-fadeIn">
      {formData.references.map((reference, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-sm font-medium">Reference #{index + 1}</h5>
            {formData.references.length > 1 && (
              <Button 
                variant="text" 
                size="sm" 
                onClick={() => removeReference(index)}
                className="text-red-500"
              >
                Remove
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id={`reference-brand-${index}`}
              label="Brand Name"
              value={reference.brandName}
              onChange={(e) => updateReference(index, 'brandName', e.target.value)}
              error={errors[`references.${index}.brandName`]}
              required
            />
            
            <Input
              id={`reference-website-${index}`}
              label="Website"
              type="url"
              value={reference.website}
              onChange={(e) => updateReference(index, 'website', e.target.value)}
              error={errors[`references.${index}.website`]}
              required
            />
          </div>
          
          <div className="mt-4">
            <Input
              id={`reference-email-${index}`}
              label="Contact Email"
              type="email"
              value={reference.contactEmail}
              onChange={(e) => updateReference(index, 'contactEmail', e.target.value)}
              error={errors[`references.${index}.contactEmail`]}
              required
            />
          </div>
        </div>
      ))}
      
      {formData.references.length < 3 && (
        <Button onClick={addReference} variant="outline" className="mt-2">
          Add Another Reference
        </Button>
      )}
    </Card>
  );
};

export default ReferencesSection;