import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContactInformationSection = ({ formData, handleInputChange, handleSelectChange, errors }) => {
  const countryOptions = [
    { value: '', label: 'Select Country' },
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'in', label: 'India' },
    { value: 'jp', label: 'Japan' },
    { value: 'br', label: 'Brazil' },
    { value: 'mx', label: 'Mexico' },
    { value: 'other', label: 'Other' }
  ];

  const companySize = [
    { value: '', label: 'Select Company Size' },
    { value: 'solo', label: 'Solo/Freelancer' },
    { value: '2-10', label: '2-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '500+', label: '500+ employees' }
  ];

  const preferredContact = [
    { value: '', label: 'Preferred Contact Method' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'video', label: 'Video Call' },
    { value: 'chat', label: 'Live Chat' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData?.fullName}
            onChange={handleInputChange}
            error={errors?.fullName}
            required
            className="w-full"
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="your.email@company.com"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            className="w-full"
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="+1 (555) 123-4567"
            value={formData?.phone}
            onChange={handleInputChange}
            error={errors?.phone}
            className="w-full"
          />

          <Input
            label="Company Name"
            type="text"
            name="company"
            placeholder="Your company name"
            value={formData?.company}
            onChange={handleInputChange}
            error={errors?.company}
            className="w-full"
          />

          <Input
            label="Job Title"
            type="text"
            name="jobTitle"
            placeholder="Your job title"
            value={formData?.jobTitle}
            onChange={handleInputChange}
            error={errors?.jobTitle}
            className="w-full"
          />

          <Select
            label="Company Size"
            name="companySize"
            options={companySize}
            value={formData?.companySize}
            onChange={(value) => handleSelectChange('companySize', value)}
            error={errors?.companySize}
            className="w-full"
          />

          <Input
            label="Website URL"
            type="url"
            name="currentWebsite"
            placeholder="https://www.yourwebsite.com"
            value={formData?.currentWebsite}
            onChange={handleInputChange}
            error={errors?.currentWebsite}
            description="Current website (if any)"
            className="w-full"
          />

          <Select
            label="Country"
            name="country"
            options={countryOptions}
            value={formData?.country}
            onChange={(value) => handleSelectChange('country', value)}
            error={errors?.country}
            required
            className="w-full"
          />

          <Select
            label="Preferred Contact Method"
            name="preferredContact"
            options={preferredContact}
            value={formData?.preferredContact}
            onChange={(value) => handleSelectChange('preferredContact', value)}
            error={errors?.preferredContact}
            className="w-full"
          />

          <Input
            label="Best Time to Contact"
            type="text"
            name="bestTimeToContact"
            placeholder="e.g., Weekdays 9 AM - 5 PM EST"
            value={formData?.bestTimeToContact}
            onChange={handleInputChange}
            error={errors?.bestTimeToContact}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInformationSection;