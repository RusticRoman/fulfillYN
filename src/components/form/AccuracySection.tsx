import React from 'react';
import { FormData } from '../../types/formTypes';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';
import Select from '../ui/Select';
import Card from '../ui/Card';

interface AccuracySectionProps {
  formData: FormData;
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
  setFieldTouched: (name: string) => void;
}

const cycleCountingOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'bi-monthly', label: 'Bi-monthly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'daily', label: 'Daily' },
  { value: 'other', label: 'Other' },
];

const billingFrequencyOptions = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
];

const AccuracySection: React.FC<AccuracySectionProps> = ({
  formData,
  onChange,
  errors,
  setFieldTouched,
}) => {
  return (
    <Card title="Accuracy & Reporting" className="mb-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="orderAccuracyRate"
          label="Order accuracy rate (e.g., 99.7%)"
          value={formData.orderAccuracyRate}
          onChange={(e) => onChange('orderAccuracyRate', e.target.value)}
          onBlur={() => setFieldTouched('orderAccuracyRate')}
          error={errors.orderAccuracyRate}
          required
        />
        
        <Input
          id="inventoryAccuracyRate"
          label="Inventory accuracy rate (e.g., 99.9%)"
          value={formData.inventoryAccuracyRate}
          onChange={(e) => onChange('inventoryAccuracyRate', e.target.value)}
          onBlur={() => setFieldTouched('inventoryAccuracyRate')}
          error={errors.inventoryAccuracyRate}
          required
        />
      </div>
      
      <div className="mt-4">
        <Select
          id="cycleCounting"
          label="How often is inventory cycle counted?"
          value={formData.cycleCounting}
          options={cycleCountingOptions}
          onChange={(e) => onChange('cycleCounting', e.target.value)}
          onBlur={() => setFieldTouched('cycleCounting')}
          error={errors.cycleCounting}
          required
        />
      </div>
      
      <div className="mt-4">
        <Checkbox
          id="providesRealTimeTracking"
          label="Do you provide real-time tracking and inventory visibility?"
          checked={formData.providesRealTimeTracking}
          onChange={(e) => onChange('providesRealTimeTracking', e.target.checked)}
        />
      </div>
      
      <div className="mt-6">
        <Select
          id="billingFrequency"
          label="How often do you bill clients?"
          value={formData.billingFrequency}
          options={billingFrequencyOptions}
          onChange={(e) => onChange('billingFrequency', e.target.value)}
          onBlur={() => setFieldTouched('billingFrequency')}
          error={errors.billingFrequency}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mt-4">
        <Checkbox
          id="hasOnboardingFees"
          label="Do you charge onboarding/setup fees?"
          checked={formData.hasOnboardingFees}
          onChange={(e) => onChange('hasOnboardingFees', e.target.checked)}
        />
        
        <Checkbox
          id="transparentFees"
          label="Are fees fully transparent (line-itemized)?"
          checked={formData.transparentFees}
          onChange={(e) => onChange('transparentFees', e.target.checked)}
        />
      </div>
    </Card>
  );
};

export default AccuracySection;