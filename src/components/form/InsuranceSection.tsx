import React from 'react';
import { FormData } from '../../types/formTypes';
import Checkbox from '../ui/Checkbox';
import Input from '../ui/Input';
import Card from '../ui/Card';
import CheckboxGroup from '../ui/CheckboxGroup';

interface InsuranceSectionProps {
  formData: FormData;
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
  setFieldTouched: (name: string) => void;
}

const certificationOptions = [
  { value: 'gmp', label: 'GMP / cGMP' },
  { value: 'iso9001', label: 'ISO 9001' },
  { value: 'organic', label: 'Organic certified' },
  { value: 'other', label: 'Other' },
];

const InsuranceSection: React.FC<InsuranceSectionProps> = ({
  formData,
  onChange,
  errors,
  setFieldTouched,
}) => {
  return (
    <Card title="Insurance & Compliance" className="mb-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        <Checkbox
          id="fdaRegistered"
          label="Are you FDA registered?"
          checked={formData.fdaRegistered}
          onChange={(e) => onChange('fdaRegistered', e.target.checked)}
        />
        
        <Checkbox
          id="hasLiabilityInsurance"
          label="Do you carry warehouse liability insurance?"
          checked={formData.hasLiabilityInsurance}
          onChange={(e) => onChange('hasLiabilityInsurance', e.target.checked)}
        />
      </div>
      
      <div className="mt-6">
        <CheckboxGroup
          label="Are you certified in any of the following?"
          options={certificationOptions}
          selectedValues={formData.certifications}
          onChange={(values) => onChange('certifications', values)}
          error={errors.certifications}
        />
        
        {formData.certifications.includes('other') && (
          <Input
            id="otherCertification"
            label="Other certification"
            value={formData.otherCertification}
            onChange={(e) => onChange('otherCertification', e.target.value)}
            onBlur={() => setFieldTouched('otherCertification')}
            error={errors.otherCertification}
            className="mt-2 ml-6"
          />
        )}
      </div>
    </Card>
  );
};

export default InsuranceSection;