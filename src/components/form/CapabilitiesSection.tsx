import React from 'react';
import { FormData } from '../../types/formTypes';
import Checkbox from '../ui/Checkbox';
import Input from '../ui/Input';
import Card from '../ui/Card';
import CheckboxGroup from '../ui/CheckboxGroup';

interface CapabilitiesSectionProps {
  formData: FormData;
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
  setFieldTouched: (name: string) => void;
}

const temperatureOptions = [
  { value: 'refrigerated', label: 'Refrigerated' },
  { value: 'frozen', label: 'Frozen' },
  { value: 'ambient', label: 'Ambient' },
];

const marketplaceOptions = [
  { value: 'amazon', label: 'Amazon' },
  { value: 'walmart', label: 'Walmart' },
  { value: 'shopify', label: 'Shopify' },
  { value: 'ebay', label: 'eBay' },
  { value: 'etsy', label: 'Etsy' },
  { value: 'bigcommerce', label: 'BigCommerce' },
  { value: 'woocommerce', label: 'WooCommerce' },
  { value: 'other', label: 'Other' },
];

const b2bTypeOptions = [
  { value: 'retail', label: 'Retail' },
  { value: 'wholesale', label: 'Wholesale' },
  { value: 'both', label: 'Both Retail and Wholesale' },
];

const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  formData,
  onChange,
  errors,
  setFieldTouched,
}) => {
  return (
    <Card title="Warehouse & Capabilities" className="mb-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        <div>
          <Checkbox
            id="temperatureControlled"
            label="Do you offer temperature-controlled storage?"
            checked={formData.temperatureControlled}
            onChange={(e) => onChange('temperatureControlled', e.target.checked)}
          />
          
          {formData.temperatureControlled && (
            <div className="mt-2 ml-6">
              <CheckboxGroup
                label="Specify temperature control types:"
                options={temperatureOptions}
                selectedValues={formData.temperatureTypes}
                onChange={(values) => onChange('temperatureTypes', values)}
                error={errors.temperatureTypes}
              />
            </div>
          )}
        </div>
        
        <Checkbox
          id="supportsHazmat"
          label="Do you support Hazmat?"
          checked={formData.supportsHazmat}
          onChange={(e) => onChange('supportsHazmat', e.target.checked)}
        />
        
        <Checkbox
          id="supportsFbaProp"
          label="Do you support FBA Prep?"
          checked={formData.supportsFbaProp}
          onChange={(e) => onChange('supportsFbaProp', e.target.checked)}
        />
        
        <Checkbox
          id="handlesReturns"
          label="Do you handle returns?"
          checked={formData.handlesReturns}
          onChange={(e) => onChange('handlesReturns', e.target.checked)}
        />
        
        <Checkbox
          id="offersKitting"
          label="Do you offer kitting/light assembly?"
          checked={formData.offersKitting}
          onChange={(e) => onChange('offersKitting', e.target.checked)}
        />
        
        <Checkbox
          id="offersSubscriptionFulfillment"
          label="Do you offer subscription box fulfillment?"
          checked={formData.offersSubscriptionFulfillment}
          onChange={(e) => onChange('offersSubscriptionFulfillment', e.target.checked)}
        />
        
        <Checkbox
          id="offersSameDayShipping"
          label="Do you offer same-day shipping?"
          checked={formData.offersSameDayShipping}
          onChange={(e) => onChange('offersSameDayShipping', e.target.checked)}
        />
        
        <Checkbox
          id="supportsEdi"
          label="Do you support EDI?"
          checked={formData.supportsEdi}
          onChange={(e) => onChange('supportsEdi', e.target.checked)}
        />
        
        <Checkbox
          id="supportsB2b"
          label="Do you support B2B (Retail, Wholesale, or both)?"
          checked={formData.supportsB2b}
          onChange={(e) => onChange('supportsB2b', e.target.checked)}
        />
      </div>
      
      <div className="mt-6">
        <CheckboxGroup
          label="What marketplaces do you support?"
          options={marketplaceOptions}
          selectedValues={formData.supportedMarketplaces}
          onChange={(values) => onChange('supportedMarketplaces', values)}
          error={errors.supportedMarketplaces}
        />
      </div>
      
      {formData.supportsB2b && (
        <div className="mt-4">
          <CheckboxGroup
            label="B2B Type"
            options={b2bTypeOptions}
            selectedValues={formData.b2bTypes}
            onChange={(values) => onChange('b2bTypes', values)}
            error={errors.b2bTypes}
          />
        </div>
      )}
      
      <div className="mt-4">
        <Input
          id="minimumOrderVolume"
          label="Minimum Monthly Order Volume Required"
          value={formData.minimumOrderVolume}
          onChange={(e) => onChange('minimumOrderVolume', e.target.value)}
          onBlur={() => setFieldTouched('minimumOrderVolume')}
          error={errors.minimumOrderVolume}
        />
      </div>
    </Card>
  );
};

export default CapabilitiesSection;