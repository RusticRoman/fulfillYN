import React from 'react';
import { FormData } from '../../types/formTypes';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';
import Card from '../ui/Card';

interface SupportSectionProps {
  formData: FormData;
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
  setFieldTouched: (name: string) => void;
}

const SupportSection: React.FC<SupportSectionProps> = ({
  formData,
  onChange,
  errors,
  setFieldTouched,
}) => {
  return (
    <Card title="Support & Communication" className="mb-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        <Checkbox
          id="hasDedicatedManager"
          label="Dedicated account manager?"
          checked={formData.hasDedicatedManager}
          onChange={(e) => onChange('hasDedicatedManager', e.target.checked)}
        />
        
        <Checkbox
          id="hasWeekendSupport"
          label="Do you offer weekend or holiday support?"
          checked={formData.hasWeekendSupport}
          onChange={(e) => onChange('hasWeekendSupport', e.target.checked)}
        />
        
        <Checkbox
          id="requiresLongTermContracts"
          label="Do you require long-term contracts?"
          checked={formData.requiresLongTermContracts}
          onChange={(e) => onChange('requiresLongTermContracts', e.target.checked)}
        />
        
        <Checkbox
          id="providesOnboardingSupport"
          label="Do you provide onboarding support for new clients?"
          checked={formData.providesOnboardingSupport}
          onChange={(e) => onChange('providesOnboardingSupport', e.target.checked)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Input
          id="responseTime"
          label="Average response time to client inquiries"
          value={formData.responseTime}
          onChange={(e) => onChange('responseTime', e.target.value)}
          onBlur={() => setFieldTouched('responseTime')}
          error={errors.responseTime}
          required
        />
        
        <Input
          id="supportHours"
          label="Support hours (e.g., Mon–Fri, 9–6 EST)"
          value={formData.supportHours}
          onChange={(e) => onChange('supportHours', e.target.value)}
          onBlur={() => setFieldTouched('supportHours')}
          error={errors.supportHours}
          required
        />
      </div>
      
      {formData.providesOnboardingSupport && (
        <div className="mt-4">
          <Checkbox
            id="hasStandardOnboarding"
            label="Do you have a standard onboarding timeline or SOPs?"
            checked={formData.hasStandardOnboarding}
            onChange={(e) => onChange('hasStandardOnboarding', e.target.checked)}
          />
        </div>
      )}
    </Card>
  );
};

export default SupportSection;