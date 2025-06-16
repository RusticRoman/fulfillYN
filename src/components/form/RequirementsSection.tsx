import React from 'react';
import { BrandFormData } from '../../types/brandFormTypes';
import Checkbox from '../ui/Checkbox';
import Input from '../ui/Input';
import Select from '../ui/Select';
import CheckboxGroup from '../ui/CheckboxGroup';
import Card from '../ui/Card';

interface RequirementsSectionProps {
  formData: BrandFormData;
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
  setFieldTouched: (name: string) => void;
}

const marketplaceOptions = [
  { value: 'amazon', label: 'Amazon' },
  { value: 'shopify', label: 'Shopify' },
  { value: 'walmart', label: 'Walmart' },
  { value: 'ebay', label: 'eBay' },
  { value: 'etsy', label: 'Etsy' },
  { value: 'target', label: 'Target' },
  { value: 'woocommerce', label: 'WooCommerce' },
  { value: 'magento', label: 'Magento' },
  { value: 'bigcommerce', label: 'BigCommerce' },
  { value: 'other', label: 'Other' },
];

const shippingSpeedOptions = [
  { value: 'same_day', label: 'Same Day' },
  { value: 'next_day', label: 'Next Day' },
  { value: '2_day', label: '2-Day' },
  { value: 'standard', label: 'Standard (3-5 days)' },
  { value: 'economy', label: 'Economy (5-7 days)' },
];

const budgetRangeOptions = [
  { value: 'under_5k', label: 'Under $5,000/month' },
  { value: '5k_15k', label: '$5,000 - $15,000/month' },
  { value: '15k_50k', label: '$15,000 - $50,000/month' },
  { value: '50k_100k', label: '$50,000 - $100,000/month' },
  { value: 'over_100k', label: 'Over $100,000/month' },
];

const RequirementsSection: React.FC<RequirementsSectionProps> = ({
  formData,
  onChange,
  errors,
  setFieldTouched,
}) => {
  return (
    <div className="space-y-6">
      {/* Essential Requirements */}
      <Card title="Essential 3PL Requirements" subtitle="What capabilities must your 3PL partner have?" className="mb-6 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <Checkbox
            id="requiresTemperatureControl"
            label="Temperature-controlled storage required"
            checked={formData.requirements.temperatureControlled}
            onChange={(e) => onChange('requirements', { ...formData.requirements, temperatureControlled: e.target.checked })}
          />
          
          <Checkbox
            id="requiresHazmatSupport"
            label="Hazmat handling required"
            checked={formData.requirements.hazmatSupport}
            onChange={(e) => onChange('requirements', { ...formData.requirements, hazmatSupport: e.target.checked })}
          />
          
          <Checkbox
            id="requiresFbaPrep"
            label="FBA Prep services required"
            checked={formData.requirements.fbaPrep}
            onChange={(e) => onChange('requirements', { ...formData.requirements, fbaPrep: e.target.checked })}
          />
          
          <Checkbox
            id="requiresReturnsHandling"
            label="Returns processing required"
            checked={formData.requirements.returnsHandling}
            onChange={(e) => onChange('requirements', { ...formData.requirements, returnsHandling: e.target.checked })}
          />
          
          <Checkbox
            id="requiresKitting"
            label="Kitting/assembly services required"
            checked={formData.requirements.kitting}
            onChange={(e) => onChange('requirements', { ...formData.requirements, kitting: e.target.checked })}
          />
          
          <Checkbox
            id="requiresSubscriptionFulfillment"
            label="Subscription box fulfillment required"
            checked={formData.requirements.subscriptionFulfillment}
            onChange={(e) => onChange('requirements', { ...formData.requirements, subscriptionFulfillment: e.target.checked })}
          />
          
          <Checkbox
            id="requiresSameDayShipping"
            label="Same-day shipping capability required"
            checked={formData.requirements.sameDayShipping}
            onChange={(e) => onChange('requirements', { ...formData.requirements, sameDayShipping: e.target.checked })}
          />
          
          <Checkbox
            id="requiresB2bSupport"
            label="B2B/wholesale support required"
            checked={formData.requirements.b2bSupport}
            onChange={(e) => onChange('requirements', { ...formData.requirements, b2bSupport: e.target.checked })}
          />
          
          <Checkbox
            id="requiresEdiSupport"
            label="EDI integration required"
            checked={formData.requirements.ediSupport}
            onChange={(e) => onChange('requirements', { ...formData.requirements, ediSupport: e.target.checked })}
          />
          
          <Checkbox
            id="requiresClientPortal"
            label="Client portal/dashboard required"
            checked={formData.requirements.clientPortal}
            onChange={(e) => onChange('requirements', { ...formData.requirements, clientPortal: e.target.checked })}
          />
        </div>
      </Card>

      {/* Integration Requirements */}
      <Card title="Integration & Platform Requirements" className="mb-6 animate-fadeIn">
        <div className="mb-6">
          <CheckboxGroup
            label="Which platforms/marketplaces do you need integration with?"
            options={marketplaceOptions}
            selectedValues={formData.requiredIntegrations}
            onChange={(values) => onChange('requiredIntegrations', values)}
            error={errors.requiredIntegrations}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="currentPlatform"
            label="Current E-commerce Platform"
            value={formData.currentPlatform}
            onChange={(e) => onChange('currentPlatform', e.target.value)}
            onBlur={() => setFieldTouched('currentPlatform')}
            error={errors.currentPlatform}
            placeholder="e.g., Shopify, WooCommerce, Custom"
          />
          
          <Input
            id="currentWms"
            label="Current WMS/Inventory System (if any)"
            value={formData.currentWms}
            onChange={(e) => onChange('currentWms', e.target.value)}
            onBlur={() => setFieldTouched('currentWms')}
            error={errors.currentWms}
            placeholder="e.g., NetSuite, TradeGecko, None"
          />
        </div>
      </Card>

      {/* Performance Requirements */}
      <Card title="Performance & SLA Requirements" className="mb-6 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            id="requiredShippingSpeed"
            label="Required Shipping Speed"
            value={formData.requiredShippingSpeed}
            options={shippingSpeedOptions}
            onChange={(e) => onChange('requiredShippingSpeed', e.target.value)}
            onBlur={() => setFieldTouched('requiredShippingSpeed')}
            error={errors.requiredShippingSpeed}
          />
          
          <Input
            id="maxReceivingTime"
            label="Maximum Acceptable Receiving Time (business days)"
            type="number"
            min="1"
            max="30"
            value={formData.maxReceivingTime}
            onChange={(e) => onChange('maxReceivingTime', parseInt(e.target.value) || 0)}
            onBlur={() => setFieldTouched('maxReceivingTime')}
            error={errors.maxReceivingTime}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input
            id="minOrderAccuracy"
            label="Minimum Required Order Accuracy (%)"
            type="number"
            min="90"
            max="100"
            step="0.1"
            value={formData.minOrderAccuracy}
            onChange={(e) => onChange('minOrderAccuracy', parseFloat(e.target.value) || 0)}
            onBlur={() => setFieldTouched('minOrderAccuracy')}
            error={errors.minOrderAccuracy}
            placeholder="e.g., 99.5"
          />
          
          <Input
            id="minInventoryAccuracy"
            label="Minimum Required Inventory Accuracy (%)"
            type="number"
            min="90"
            max="100"
            step="0.1"
            value={formData.minInventoryAccuracy}
            onChange={(e) => onChange('minInventoryAccuracy', parseFloat(e.target.value) || 0)}
            onBlur={() => setFieldTouched('minInventoryAccuracy')}
            error={errors.minInventoryAccuracy}
            placeholder="e.g., 99.8"
          />
        </div>

        <div className="mt-4">
          <Checkbox
            id="requiresRealTimeTracking"
            label="Real-time inventory tracking required"
            checked={formData.requiresRealTimeTracking}
            onChange={(e) => onChange('requiresRealTimeTracking', e.target.checked)}
          />
        </div>
      </Card>

      {/* Budget & Contract Preferences */}
      <Card title="Budget & Contract Preferences" className="mb-6 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            id="budgetRange"
            label="Monthly Fulfillment Budget Range"
            value={formData.budgetRange}
            options={budgetRangeOptions}
            onChange={(e) => onChange('budgetRange', e.target.value)}
            onBlur={() => setFieldTouched('budgetRange')}
            error={errors.budgetRange}
          />
          
          <Input
            id="maxSetupFee"
            label="Maximum Acceptable Setup Fee ($)"
            type="number"
            min="0"
            value={formData.maxSetupFee}
            onChange={(e) => onChange('maxSetupFee', parseInt(e.target.value) || 0)}
            onBlur={() => setFieldTouched('maxSetupFee')}
            error={errors.maxSetupFee}
            placeholder="0 for no setup fees"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mt-4">
          <Checkbox
            id="preferNoLongTermContract"
            label="Prefer no long-term contracts"
            checked={formData.preferNoLongTermContract}
            onChange={(e) => onChange('preferNoLongTermContract', e.target.checked)}
          />
          
          <Checkbox
            id="requiresTransparentPricing"
            label="Require fully transparent pricing"
            checked={formData.requiresTransparentPricing}
            onChange={(e) => onChange('requiresTransparentPricing', e.target.checked)}
          />
          
          <Checkbox
            id="requiresDedicatedManager"
            label="Dedicated account manager required"
            checked={formData.requiresDedicatedManager}
            onChange={(e) => onChange('requiresDedicatedManager', e.target.checked)}
          />
          
          <Checkbox
            id="requires24x7Support"
            label="24/7 support required"
            checked={formData.requires24x7Support}
            onChange={(e) => onChange('requires24x7Support', e.target.checked)}
          />
        </div>
      </Card>

      {/* Additional Requirements */}
      <Card title="Additional Requirements & Notes" className="mb-6 animate-fadeIn">
        <div className="space-y-4">
          <Input
            id="specialRequirements"
            label="Special Requirements or Notes"
            value={formData.specialRequirements}
            onChange={(e) => onChange('specialRequirements', e.target.value)}
            onBlur={() => setFieldTouched('specialRequirements')}
            error={errors.specialRequirements}
            placeholder="Any specific requirements, certifications needed, or additional notes..."
          />
          
          <Input
            id="timelineToStart"
            label="Timeline to Start Fulfillment"
            value={formData.timelineToStart}
            onChange={(e) => onChange('timelineToStart', e.target.value)}
            onBlur={() => setFieldTouched('timelineToStart')}
            error={errors.timelineToStart}
            placeholder="e.g., ASAP, 30 days, Q2 2024"
          />
        </div>
      </Card>
    </div>
  );
};

export default RequirementsSection;