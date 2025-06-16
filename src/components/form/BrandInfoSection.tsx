import React from 'react';
import { BrandFormData } from '../../types/brandFormTypes';
import Input from '../ui/Input';
import Select from '../ui/Select';
import CheckboxGroup from '../ui/CheckboxGroup';
import Card from '../ui/Card';

interface BrandInfoSectionProps {
  formData: BrandFormData;
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
  setFieldTouched: (name: string) => void;
}

const industryOptions = [
  { value: 'beauty_wellness', label: 'Beauty & Wellness' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'food_beverage', label: 'Food & Beverage' },
  { value: 'fashion_apparel', label: 'Fashion & Apparel' },
  { value: 'home_garden', label: 'Home & Garden' },
  { value: 'health_supplements', label: 'Health & Supplements' },
  { value: 'toys_games', label: 'Toys & Games' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'books_media', label: 'Books & Media' },
  { value: 'sports_outdoors', label: 'Sports & Outdoors' },
  { value: 'pet_supplies', label: 'Pet Supplies' },
  { value: 'other', label: 'Other' },
];

const productTypeOptions = [
  { value: 'skincare', label: 'Skincare' },
  { value: 'cosmetics', label: 'Cosmetics' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'food', label: 'Food Products' },
  { value: 'beverages', label: 'Beverages' },
  { value: 'supplements', label: 'Supplements' },
  { value: 'home_decor', label: 'Home Decor' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'books', label: 'Books' },
  { value: 'toys', label: 'Toys' },
  { value: 'sporting_goods', label: 'Sporting Goods' },
  { value: 'automotive_parts', label: 'Automotive Parts' },
  { value: 'pet_food', label: 'Pet Food' },
  { value: 'pet_toys', label: 'Pet Toys' },
  { value: 'other', label: 'Other' },
];

const locationOptions = [
  { value: 'west_coast', label: 'West Coast (CA, OR, WA)' },
  { value: 'east_coast', label: 'East Coast (NY, NJ, MA, FL)' },
  { value: 'midwest', label: 'Midwest (IL, OH, MI, IN)' },
  { value: 'south', label: 'South (TX, GA, NC, TN)' },
  { value: 'southwest', label: 'Southwest (AZ, NV, NM)' },
  { value: 'mountain', label: 'Mountain (CO, UT, ID)' },
  { value: 'canada', label: 'Canada' },
  { value: 'international', label: 'International' },
];

const BrandInfoSection: React.FC<BrandInfoSectionProps> = ({
  formData,
  onChange,
  errors,
  setFieldTouched,
}) => {
  return (
    <Card title="Brand Information" className="mb-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="brandName"
          label="Brand Name"
          value={formData.brandName}
          onChange={(e) => onChange('brandName', e.target.value)}
          onBlur={() => setFieldTouched('brandName')}
          error={errors.brandName}
          required
        />
        <Input
          id="contactEmail"
          label="Contact Email"
          type="email"
          value={formData.contactEmail}
          onChange={(e) => onChange('contactEmail', e.target.value)}
          onBlur={() => setFieldTouched('contactEmail')}
          error={errors.contactEmail}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="contactName"
          label="Contact Name"
          value={formData.contactName}
          onChange={(e) => onChange('contactName', e.target.value)}
          onBlur={() => setFieldTouched('contactName')}
          error={errors.contactName}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          id="industry"
          label="Industry"
          value={formData.industry}
          options={industryOptions}
          onChange={(e) => onChange('industry', e.target.value)}
          onBlur={() => setFieldTouched('industry')}
          error={errors.industry}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="monthlyVolume"
          label="Expected Monthly Order Volume (units)"
          type="number"
          min="1"
          value={formData.monthlyVolume}
          onChange={(e) => onChange('monthlyVolume', parseInt(e.target.value) || 0)}
          onBlur={() => setFieldTouched('monthlyVolume')}
          error={errors.monthlyVolume}
          required
        />
        <Input
          id="averageOrderValue"
          label="Average Order Value ($)"
          type="number"
          min="0"
          step="0.01"
          value={formData.averageOrderValue}
          onChange={(e) => onChange('averageOrderValue', parseFloat(e.target.value) || 0)}
          onBlur={() => setFieldTouched('averageOrderValue')}
          error={errors.averageOrderValue}
        />
      </div>

      <div className="mt-6">
        <CheckboxGroup
          label="Product Types (select all that apply)"
          options={productTypeOptions}
          selectedValues={formData.productTypes}
          onChange={(values) => onChange('productTypes', values)}
          error={errors.productTypes}
        />
      </div>

      <div className="mt-6">
        <CheckboxGroup
          label="Preferred 3PL Locations (select all that apply)"
          options={locationOptions}
          selectedValues={formData.preferredLocations}
          onChange={(values) => onChange('preferredLocations', values)}
          error={errors.preferredLocations}
        />
      </div>
    </Card>
  );
};

export default BrandInfoSection;