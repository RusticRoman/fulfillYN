import React from 'react';
import { FormData } from '../../types/formTypes';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';
import Card from '../ui/Card';

interface SlaSectionProps {
  formData: FormData;
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
  setFieldTouched: (name: string) => void;
}

const SlaSection: React.FC<SlaSectionProps> = ({
  formData,
  onChange,
  errors,
  setFieldTouched,
}) => {
  return (
    <Card title="SLA & Performance Metrics - Receiving" className="mb-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="averageReceivingTime"
          label="Average receiving time (in business days)"
          type="number"
          value={formData.averageReceivingTime}
          onChange={(e) => onChange('averageReceivingTime', parseInt(e.target.value))}
          onBlur={() => setFieldTouched('averageReceivingTime')}
          error={errors.averageReceivingTime}
          required
        />
        
        <Input
          id="maxReceivingTime"
          label="Max receiving time (peak season, in business days)"
          type="number"
          value={formData.maxReceivingTime}
          onChange={(e) => onChange('maxReceivingTime', parseInt(e.target.value))}
          onBlur={() => setFieldTouched('maxReceivingTime')}
          error={errors.maxReceivingTime}
          required
        />
      </div>
      
      <div className="mt-4">
        <Checkbox
          id="notifiesOnReceiving"
          label="Do you notify brands when inventory is received?"
          checked={formData.notifiesOnReceiving}
          onChange={(e) => onChange('notifiesOnReceiving', e.target.checked)}
        />
      </div>
      
      <h3 className="font-medium text-lg mt-8 mb-4">Order Fulfillment</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="cutoffTime"
          label="Cutoff time for same-day shipping (e.g., 2:00 PM local)"
          value={formData.cutoffTime}
          onChange={(e) => onChange('cutoffTime', e.target.value)}
          onBlur={() => setFieldTouched('cutoffTime')}
          error={errors.cutoffTime}
        />
        
        <Input
          id="dtcSla"
          label="SLA for standard DTC orders (e.g., 99% ship within 1 business day)"
          value={formData.dtcSla}
          onChange={(e) => onChange('dtcSla', e.target.value)}
          onBlur={() => setFieldTouched('dtcSla')}
          error={errors.dtcSla}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Input
          id="b2bSla"
          label="SLA for B2B/wholesale orders"
          value={formData.b2bSla}
          onChange={(e) => onChange('b2bSla', e.target.value)}
          onBlur={() => setFieldTouched('b2bSla')}
          error={errors.b2bSla}
        />
        
        <Input
          id="peakSeasonSla"
          label="Peak season fulfillment SLA (if different)"
          value={formData.peakSeasonSla}
          onChange={(e) => onChange('peakSeasonSla', e.target.value)}
          onBlur={() => setFieldTouched('peakSeasonSla')}
          error={errors.peakSeasonSla}
        />
      </div>
    </Card>
  );
};

export default SlaSection;