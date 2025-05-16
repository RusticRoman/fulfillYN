import React from 'react';
import { FormData, WarehouseLocation } from '../../types/formTypes';
import Input from '../ui/Input';
import Card from '../ui/Card';
import Button from '../ui/Button';
import CheckboxGroup from '../ui/CheckboxGroup';

interface CompanyOverviewSectionProps {
  formData: FormData;
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
  setFieldTouched: (name: string) => void;
}

const warehouseCapabilities = [
  { value: 'dtc', label: 'DTC (Direct to Consumer)' },
  { value: 'b2b', label: 'B2B (Business to Business)' },
  { value: 'fba', label: 'FBA Prep' },
  { value: 'cold', label: 'Cold Storage' },
  { value: 'hazmat', label: 'Hazmat' },
  { value: 'returns', label: 'Returns Processing' },
];

const CompanyOverviewSection: React.FC<CompanyOverviewSectionProps> = ({
  formData,
  onChange,
  errors,
  setFieldTouched,
}) => {
  const updateWarehouseLocation = (index: number, field: keyof WarehouseLocation, value: any) => {
    const updatedLocations = [...formData.warehouseLocations];
    updatedLocations[index] = {
      ...updatedLocations[index],
      [field]: value
    };
    onChange('warehouseLocations', updatedLocations);
  };

  const addWarehouseLocation = () => {
    onChange('warehouseLocations', [
      ...formData.warehouseLocations,
      { address: '', squareFootage: 0, capabilities: [] }
    ]);
  };

  const removeWarehouseLocation = (index: number) => {
    const updatedLocations = [...formData.warehouseLocations];
    updatedLocations.splice(index, 1);
    onChange('warehouseLocations', updatedLocations);
  };

  return (
    <Card title="Company Overview" className="mb-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="yearFounded"
          label="Year Founded"
          type="number"
          value={formData.yearFounded}
          onChange={(e) => onChange('yearFounded', e.target.value)}
          onBlur={() => setFieldTouched('yearFounded')}
          error={errors.yearFounded}
          required
        />
        <Input
          id="headquartersAddress"
          label="Headquarters Address"
          value={formData.headquartersAddress}
          onChange={(e) => onChange('headquartersAddress', e.target.value)}
          onBlur={() => setFieldTouched('headquartersAddress')}
          error={errors.headquartersAddress}
          required
        />
      </div>

      <div className="mt-4">
        <Input
          id="totalWarehouses"
          label="Total Number of Warehouse Locations"
          type="number"
          min="1"
          value={formData.totalWarehouses}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            onChange('totalWarehouses', value);
            
            // Adjust warehouse locations array size
            if (value > formData.warehouseLocations.length) {
              const additionalLocations = Array(value - formData.warehouseLocations.length)
                .fill(null)
                .map(() => ({ address: '', squareFootage: 0, capabilities: [] }));
              
              onChange('warehouseLocations', [...formData.warehouseLocations, ...additionalLocations]);
            } else if (value < formData.warehouseLocations.length) {
              onChange('warehouseLocations', formData.warehouseLocations.slice(0, value));
            }
          }}
          onBlur={() => setFieldTouched('totalWarehouses')}
          error={errors.totalWarehouses}
          required
        />
      </div>

      {formData.totalWarehouses > 1 && (
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-4">Warehouse Locations</h4>
          
          {formData.warehouseLocations.map((location, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-sm font-medium">Warehouse #{index + 1}</h5>
                {formData.warehouseLocations.length > 1 && (
                  <Button 
                    variant="text" 
                    size="sm" 
                    onClick={() => removeWarehouseLocation(index)}
                    className="text-red-500"
                  >
                    Remove
                  </Button>
                )}
              </div>
              
              <Input
                id={`warehouse-address-${index}`}
                label="Warehouse Full Address"
                value={location.address}
                onChange={(e) => updateWarehouseLocation(index, 'address', e.target.value)}
                error={errors[`warehouseLocations.${index}.address`]}
                required
              />
              
              <Input
                id={`warehouse-footage-${index}`}
                label="Warehouse Square Footage"
                type="number"
                value={location.squareFootage}
                onChange={(e) => updateWarehouseLocation(index, 'squareFootage', parseInt(e.target.value))}
                error={errors[`warehouseLocations.${index}.squareFootage`]}
                required
              />
              
              <CheckboxGroup
                label="Capabilities"
                options={warehouseCapabilities}
                selectedValues={location.capabilities}
                onChange={(values) => updateWarehouseLocation(index, 'capabilities', values)}
                error={errors[`warehouseLocations.${index}.capabilities`]}
              />
            </div>
          ))}
          
          {formData.warehouseLocations.length < formData.totalWarehouses && (
            <Button onClick={addWarehouseLocation} variant="outline" className="mt-2">
              Add Another Warehouse
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default CompanyOverviewSection;