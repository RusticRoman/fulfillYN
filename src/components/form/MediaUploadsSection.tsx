import React from 'react';
import { FormData } from '../../types/formTypes';
import Input from '../ui/Input';
import FileUpload from '../ui/FileUpload';
import Card from '../ui/Card';

interface MediaUploadsSectionProps {
  formData: FormData;
  onChange: (name: string, value: any) => void;
  errors: Record<string, string>;
  setFieldTouched: (name: string) => void;
}

const MediaUploadsSection: React.FC<MediaUploadsSectionProps> = ({
  formData,
  onChange,
  errors,
  setFieldTouched,
}) => {
  return (
    <Card title="Media Uploads" subtitle="Optional but recommended" className="mb-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUpload
          id="logo"
          label="Upload your logo"
          accept="image/*"
          onChange={(files) => onChange('logo', files ? files[0] : null)}
          error={errors.logo}
        />
        
        <FileUpload
          id="warehouseImages"
          label="Upload pictures of your warehouse"
          accept="image/*"
          multiple
          onChange={(files) => {
            if (files) {
              const filesArray = Array.from(files);
              onChange('warehouseImages', filesArray);
            }
          }}
          error={errors.warehouseImages}
        />
      </div>
      
      <div className="mt-6">
        <Input
          id="introVideo"
          label="Include a quick intro video about your 3PL (Dropbox or Loom link, 60 seconds max)"
          placeholder="https://www.loom.com/share/your-video-id"
          value={formData.introVideo}
          onChange={(e) => onChange('introVideo', e.target.value)}
          onBlur={() => setFieldTouched('introVideo')}
          error={errors.introVideo}
        />
      </div>
    </Card>
  );
};

export default MediaUploadsSection;