import React from 'react';
import { FormData } from '../../types/formTypes';
import Checkbox from '../ui/Checkbox';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Card from '../ui/Card';
import CheckboxGroup from '../ui/CheckboxGroup';

interface TechIntegrationsSectionProps {
  formData: FormData;
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
  setFieldTouched: (name: string) => void;
}

const wmsOptions = [
  { value: 'warehouse_os', label: 'Warehouse OS' },
  { value: 'skubana', label: 'Skubana' },
  { value: 'shipstation', label: 'ShipStation' },
  { value: 'shipbob', label: 'ShipBob' },
  { value: 'shipmonk', label: 'ShipMonk' },
  { value: 'logiwa', label: 'Logiwa' },
  { value: 'netsuite', label: 'NetSuite WMS' },
  { value: 'infor', label: 'Infor SCM' },
  { value: 'manhattan', label: 'Manhattan Associates' },
  { value: 'proprietary', label: 'Proprietary' },
  { value: 'other', label: 'Other' },
];

const integrationOptions = [
  { value: 'shopify', label: 'Shopify' },
  { value: 'amazon', label: 'Amazon' },
  { value: 'walmart', label: 'Walmart' },
  { value: 'woocommerce', label: 'WooCommerce' },
  { value: 'custom_api', label: 'Custom integrations (API)' },
];

const carrierOptions = [
  { value: 'ups', label: 'UPS' },
  { value: 'fedex', label: 'FedEx' },
  { value: 'usps', label: 'USPS' },
  { value: 'dhl', label: 'DHL' },
  { value: 'ontrac', label: 'OnTrac' },
  { value: 'lasership', label: 'LaserShip' },
  { value: 'amazon_logistics', label: 'Amazon Logistics' },
  { value: 'other', label: 'Other' },
];

const TechIntegrationsSection: React.FC<TechIntegrationsSectionProps> = ({
  formData,
  onChange,
  errors,
  setFieldTouched,
}) => {
  return (
    <Card title="Tech & Integrations" className="mb-6 animate-fadeIn">
      <div className="mb-4">
        <Select
          id="wmsSystem"
          label="What WMS do you use?"
          value={formData.wmsSystem}
          options={wmsOptions}
          onChange={(e) => onChange('wmsSystem', e.target.value)}
          onBlur={() => setFieldTouched('wmsSystem')}
          error={errors.wmsSystem}
          required
        />
        
        {formData.wmsSystem === 'other' && (
          <Input
            id="otherWms"
            label="Other WMS"
            value={formData.otherWms}
            onChange={(e) => onChange('otherWms', e.target.value)}
            onBlur={() => setFieldTouched('otherWms')}
            error={errors.otherWms}
            className="mt-2"
          />
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        <Checkbox
          id="hasClientPortal"
          label="Do you offer a client portal?"
          checked={formData.hasClientPortal}
          onChange={(e) => onChange('hasClientPortal', e.target.checked)}
        />
        
        <Checkbox
          id="hasProprietarySoftware"
          label="Any proprietary software/tools?"
          checked={formData.hasProprietarySoftware}
          onChange={(e) => onChange('hasProprietarySoftware', e.target.checked)}
        />
      </div>
      
      {formData.hasProprietarySoftware && (
        <Input
          id="proprietarySoftwareDetails"
          label="Please describe your proprietary software/tools"
          value={formData.proprietarySoftwareDetails}
          onChange={(e) => onChange('proprietarySoftwareDetails', e.target.value)}
          onBlur={() => setFieldTouched('proprietarySoftwareDetails')}
          error={errors.proprietarySoftwareDetails}
          className="mt-2"
        />
      )}
      
      <div className="mt-6">
        <CheckboxGroup
          label="Do you integrate with:"
          options={integrationOptions}
          selectedValues={formData.integrations}
          onChange={(values) => onChange('integrations', values)}
          error={errors.integrations}
        />
      </div>
      
      <div className="mt-6">
        <CheckboxGroup
          label="Which carriers do you primarily work with?"
          options={carrierOptions}
          selectedValues={formData.carriers}
          onChange={(values) => onChange('carriers', values)}
          error={errors.carriers}
        />
      </div>
    </Card>
  );
};

export default TechIntegrationsSection;