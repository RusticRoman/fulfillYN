import React from 'react';
import { FormData } from '../../types/formTypes';
import Checkbox from '../ui/Checkbox';
import Input from '../ui/Input';
import Select from '../ui/Select';
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

const b2bTypeOptions = [
  { value: 'retail', label: 'Retail' },
  { value: 'wholesale', label: 'Wholesale' },
  { value: 'both', label: 'Both Retail and Wholesale' },
];

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

const certificationOptions = [
  { value: 'gmp', label: 'GMP / cGMP' },
  { value: 'iso9001', label: 'ISO 9001' },
  { value: 'organic', label: 'Organic certified' },
  { value: 'other', label: 'Other' },
];

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

const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  formData,
  onChange,
  errors,
  setFieldTouched,
}) => {
  return (
    <div className="space-y-6">
      {/* Warehouse & Capabilities */}
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
            label="Minimum Monthly Order Volume Required (Number of Units)"
            type="number"
            min="11"
            max="99999"
            value={formData.minimumOrderVolume}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              onChange('minimumOrderVolume', value);
            }}
            onBlur={() => setFieldTouched('minimumOrderVolume')}
            error={errors.minimumOrderVolume}
            required
          />
        </div>
      </Card>

      {/* Insurance & Compliance */}
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

      {/* Tech & Integrations */}
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

      {/* SLA & Performance Metrics */}
      <Card title="SLA & Performance Metrics" className="mb-6 animate-fadeIn">
        <h4 className="font-medium text-lg mb-4">Receiving</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="averageReceivingTime"
            label="Average receiving time (in business days)"
            type="number"
            value={formData.averageReceivingTime}
            onChange={(e) => onChange('averageReceivingTime', parseInt(e.target.value) || 0)}
            onBlur={() => setFieldTouched('averageReceivingTime')}
            error={errors.averageReceivingTime}
          />
          
          <Input
            id="maxReceivingTime"
            label="Max receiving time (peak season, in business days)"
            type="number"
            value={formData.maxReceivingTime}
            onChange={(e) => onChange('maxReceivingTime', parseInt(e.target.value) || 0)}
            onBlur={() => setFieldTouched('maxReceivingTime')}
            error={errors.maxReceivingTime}
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
        
        <h4 className="font-medium text-lg mt-8 mb-4">Order Fulfillment</h4>
        
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

      {/* Returns Processing */}
      <Card title="Returns Processing" className="mb-6 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="returnsProcessingTime"
            label="Average turnaround time for returns processing (in business days)"
            type="number"
            value={formData.returnsProcessingTime}
            onChange={(e) => onChange('returnsProcessingTime', parseInt(e.target.value) || 0)}
            onBlur={() => setFieldTouched('returnsProcessingTime')}
            error={errors.returnsProcessingTime}
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

      {/* Accuracy & Reporting */}
      <Card title="Accuracy & Reporting" className="mb-6 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="orderAccuracyRate"
            label="Order accuracy rate (e.g., 99.7%)"
            value={formData.orderAccuracyRate}
            onChange={(e) => onChange('orderAccuracyRate', e.target.value)}
            onBlur={() => setFieldTouched('orderAccuracyRate')}
            error={errors.orderAccuracyRate}
          />
          
          <Input
            id="inventoryAccuracyRate"
            label="Inventory accuracy rate (e.g., 99.9%)"
            value={formData.inventoryAccuracyRate}
            onChange={(e) => onChange('inventoryAccuracyRate', e.target.value)}
            onBlur={() => setFieldTouched('inventoryAccuracyRate')}
            error={errors.inventoryAccuracyRate}
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

      {/* Support & Communication */}
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
          />
          
          <Input
            id="supportHours"
            label="Support hours (e.g., Mon–Fri, 9–6 EST)"
            value={formData.supportHours}
            onChange={(e) => onChange('supportHours', e.target.value)}
            onBlur={() => setFieldTouched('supportHours')}
            error={errors.supportHours}
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
    </div>
  );
};

export default CapabilitiesSection;