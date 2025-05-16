import React from 'react';
import { FormData } from '../../types/formTypes';
import Card from '../ui/Card';

interface FormReviewSectionProps {
  formData: FormData;
}

const FormReviewSection: React.FC<FormReviewSectionProps> = ({ formData }) => {
  return (
    <div className="mb-6 animate-fadeIn">
      <Card title="Review Your Information" className="mb-6">
        <p className="text-sm text-gray-600 mb-4">
          Please review all information below before submitting. You can go back to any section to make changes.
        </p>
        
        <div className="space-y-6">
          <ReviewSection 
            title="Basic Contact Information" 
            items={[
              { label: 'Name', value: `${formData.firstName} ${formData.lastName}` },
              { label: 'Email', value: formData.email },
              { label: 'Phone', value: formData.phone },
              { label: 'Company', value: formData.companyName },
              { label: 'Website', value: formData.websiteUrl },
            ]} 
          />
          
          <ReviewSection 
            title="Company Overview" 
            items={[
              { label: 'Year Founded', value: formData.yearFounded },
              { label: 'Headquarters', value: formData.headquartersAddress },
              { label: 'Warehouses', value: formData.totalWarehouses.toString() },
            ]} 
          />
          
          <ReviewSection 
            title="Capabilities" 
            items={[
              { label: 'Temperature Control', value: formData.temperatureControlled ? 'Yes' : 'No' },
              { label: 'Temperature Types', value: formData.temperatureTypes.join(', ') },
              { label: 'Hazmat Support', value: formData.supportsHazmat ? 'Yes' : 'No' },
              { label: 'FBA Prep', value: formData.supportsFbaProp ? 'Yes' : 'No' },
              { label: 'Returns Handling', value: formData.handlesReturns ? 'Yes' : 'No' },
              { label: 'Kitting', value: formData.offersKitting ? 'Yes' : 'No' },
              { label: 'Subscription Fulfillment', value: formData.offersSubscriptionFulfillment ? 'Yes' : 'No' },
              { label: 'Same-Day Shipping', value: formData.offersSameDayShipping ? 'Yes' : 'No' },
              { label: 'Marketplaces', value: formData.supportedMarketplaces.join(', ') },
              { label: 'EDI Support', value: formData.supportsEdi ? 'Yes' : 'No' },
              { label: 'B2B Support', value: formData.supportsB2b ? 'Yes' : 'No' },
            ]} 
          />
            
          <ReviewSection 
            title="Insurance & Compliance" 
            items={[
              { label: 'FDA Registered', value: formData.fdaRegistered ? 'Yes' : 'No' },
              { label: 'Liability Insurance', value: formData.hasLiabilityInsurance ? 'Yes' : 'No' },
              { label: 'Certifications', value: formData.certifications.join(', ') },
            ]} 
          />
            
          <ReviewSection 
            title="Tech & Integrations" 
            items={[
              { label: 'WMS System', value: formData.wmsSystem === 'other' ? formData.otherWms : formData.wmsSystem },
              { label: 'Client Portal', value: formData.hasClientPortal ? 'Yes' : 'No' },
              { label: 'Integrations', value: formData.integrations.join(', ') },
              { label: 'Carriers', value: formData.carriers.join(', ') },
            ]} 
          />
            
          <ReviewSection 
            title="SLA & Performance" 
            items={[
              { label: 'Avg. Receiving Time', value: `${formData.averageReceivingTime} days` },
              { label: 'DTC SLA', value: formData.dtcSla },
              { label: 'Order Accuracy', value: formData.orderAccuracyRate },
              { label: 'Inventory Accuracy', value: formData.inventoryAccuracyRate },
            ]} 
          />
        </div>
      </Card>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-sm">
        <p className="font-medium">Ready to submit?</p>
        <p className="mt-1">By clicking "Submit" you agree that all information provided is accurate and complete.</p>
      </div>
    </div>
  );
};

interface ReviewSectionProps {
  title: string;
  items: Array<{ label: string; value: string }>;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ title, items }) => {
  return (
    <div>
      <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
      <div className="bg-gray-50 rounded-md p-3 border border-gray-100">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {items.map((item, index) => (
            <div key={index} className="text-sm">
              <dt className="text-gray-500 inline">{item.label}: </dt>
              <dd className="text-gray-900 inline">{item.value || 'N/A'}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default FormReviewSection;