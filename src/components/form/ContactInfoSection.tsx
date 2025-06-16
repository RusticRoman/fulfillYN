import React from 'react';
import { FormData } from '../../types/formTypes';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface ContactInfoSectionProps {
  formData: FormData;
  onChange: (name: string, value: string) => void;
  errors: Record<string, string>;
  setFieldTouched: (name: string) => void;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  formData,
  onChange,
  errors,
  setFieldTouched,
}) => {
  return (
    <Card title="3PL Contact Information" className="mb-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          onBlur={() => setFieldTouched('firstName')}
          error={errors.firstName}
        />
        <Input
          id="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          onBlur={() => setFieldTouched('lastName')}
          error={errors.lastName}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="email"
          label="Corporate email"
          type="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          onBlur={() => setFieldTouched('email')}
          error={errors.email}
        />
        <Input
          id="phone"
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          onBlur={() => setFieldTouched('phone')}
          error={errors.phone}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Input
          id="companyName"
          label="Company Name"
          value={formData.companyName}
          onChange={(e) => onChange('companyName', e.target.value)}
          onBlur={() => setFieldTouched('companyName')}
          error={errors.companyName}
        />
        <Input
          id="websiteUrl"
          label="Website URL"
          type="url"
          value={formData.websiteUrl}
          onChange={(e) => onChange('websiteUrl', e.target.value)}
          onBlur={() => setFieldTouched('websiteUrl')}
          error={errors.websiteUrl}
          placeholder="https://example.com"
        />
      </div>
    </Card>
  );
};

export default ContactInfoSection;