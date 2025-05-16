import React from 'react';
import { FormData } from '../../types/formTypes';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';
import Card from '../ui/Card';

interface ReturnsSectionProps {
  formData: FormData;
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
  setFieldTouched: (name: string) => void;
}

const ReturnsSection: React.FC<ReturnsSectionProps> = ({
  formData,
  onChange,
  errors,
  setFieldTouched,
}) => {
  return (
    <Card title="Returns Processing" className="mb-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="returnsProcessingTime"
          label="Average turnaround time for returns processing (in business days)"
          type="number"
          value={formData.returnsProcessingTime}
          onChange={(e) => onChange('returnsProcessingTime', parseInt(e.target.value))}
          onBlur={() => setFieldTouched('returnsProcessingTime')}
          error={errors.returnsProcessingTime}
          required
        />
        
        <div className="flex items-center">
          <Checkbox
            id="providesBrandedReturnPortals"
            label="Do you provide branded return portals?"
            checked={formData.providesBrandedReturnPortals}
            onChange={(e) => onChange('providesBrandedReturnPortals', e.target.checked)}
          />
        </div>
      </div>
    </Card>
  );
};

export default ReturnsSection;