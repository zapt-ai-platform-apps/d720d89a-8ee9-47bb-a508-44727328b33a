import React from 'react';
import { FormField } from '@/modules/core/ui/FormField';

export function HeaderEditor({ data, onUpdate }) {
  const handleChange = (field, value) => {
    onUpdate({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <FormField
        label="Title"
        id="header-title"
        type="text"
        value={data.title || ''}
        onChange={(e) => handleChange('title', e.target.value)}
      />
      <FormField
        label="Subtitle"
        id="header-subtitle"
        type="text"
        value={data.subtitle || ''}
        onChange={(e) => handleChange('subtitle', e.target.value)}
      />
      <FormField
        label="Button Text"
        id="header-button-text"
        type="text"
        value={data.buttonText || ''}
        onChange={(e) => handleChange('buttonText', e.target.value)}
      />
      <FormField
        label="Button URL"
        id="header-button-url"
        type="text"
        value={data.buttonUrl || ''}
        onChange={(e) => handleChange('buttonUrl', e.target.value)}
      />
      <FormField
        label="Background Image URL"
        id="header-bg-image"
        type="text"
        value={data.backgroundImage || ''}
        onChange={(e) => handleChange('backgroundImage', e.target.value)}
        placeholder="Enter image URL or leave blank"
      />
    </div>
  );
}