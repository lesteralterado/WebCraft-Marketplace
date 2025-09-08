import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProjectDetailsSection = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange, 
  handleCheckboxChange,
  errors 
}) => {
  const industryOptions = [
    { value: '', label: 'Select Industry' },
    { value: 'technology', label: 'Technology & Software' },
    { value: 'healthcare', label: 'Healthcare & Medical' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'ecommerce', label: 'E-commerce & Retail' },
    { value: 'education', label: 'Education & Training' },
    { value: 'realestate', label: 'Real Estate' },
    { value: 'hospitality', label: 'Hospitality & Tourism' },
    { value: 'nonprofit', label: 'Non-profit & NGO' },
    { value: 'manufacturing', label: 'Manufacturing & Industrial' },
    { value: 'consulting', label: 'Consulting & Professional Services' },
    { value: 'other', label: 'Other' }
  ];

  const websiteTypeOptions = [
    { value: '', label: 'Select Website Type' },
    { value: 'business', label: 'Business/Corporate Website' },
    { value: 'ecommerce', label: 'E-commerce Store' },
    { value: 'portfolio', label: 'Portfolio/Personal Website' },
    { value: 'blog', label: 'Blog/News Website' },
    { value: 'landing', label: 'Landing Page' },
    { value: 'saas', label: 'SaaS Application' },
    { value: 'marketplace', label: 'Marketplace Platform' },
    { value: 'booking', label: 'Booking/Reservation System' },
    { value: 'directory', label: 'Directory/Listing Website' },
    { value: 'community', label: 'Community/Forum' },
    { value: 'other', label: 'Other' }
  ];

  const budgetOptions = [
    { value: '', label: 'Select Budget Range' },
    { value: '1000-2500', label: '$1,000 - $2,500' },
    { value: '2500-5000', label: '$2,500 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000-25000', label: '$10,000 - $25,000' },
    { value: '25000-50000', label: '$25,000 - $50,000' },
    { value: '50000+', label: '$50,000+' },
    { value: 'discuss', label: 'Let\'s Discuss' }
  ];

  const timelineOptions = [
    { value: '', label: 'Select Timeline' },
    { value: '2-4weeks', label: '2-4 weeks' },
    { value: '1-2months', label: '1-2 months' },
    { value: '2-3months', label: '2-3 months' },
    { value: '3-6months', label: '3-6 months' },
    { value: '6months+', label: '6+ months' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const additionalServices = [
    { id: 'seo', label: 'SEO Optimization', description: 'Search engine optimization for better visibility' },
    { id: 'cms', label: 'Content Management System', description: 'Easy-to-use admin panel for content updates' },
    { id: 'maintenance', label: 'Ongoing Maintenance', description: 'Regular updates and technical support' },
    { id: 'hosting', label: 'Hosting Setup', description: 'Domain and hosting configuration' },
    { id: 'analytics', label: 'Analytics Integration', description: 'Google Analytics and tracking setup' },
    { id: 'social', label: 'Social Media Integration', description: 'Connect with social media platforms' },
    { id: 'security', label: 'Security Features', description: 'SSL certificates and security measures' },
    { id: 'backup', label: 'Backup Solutions', description: 'Automated backup and recovery systems' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Project Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Project Name"
            type="text"
            name="projectName"
            placeholder="Enter your project name"
            value={formData?.projectName}
            onChange={handleInputChange}
            error={errors?.projectName}
            required
            className="w-full"
          />

          <Select
            label="Industry"
            name="industry"
            options={industryOptions}
            value={formData?.industry}
            onChange={(value) => handleSelectChange('industry', value)}
            error={errors?.industry}
            required
            className="w-full"
          />

          <Select
            label="Website Type"
            name="websiteType"
            options={websiteTypeOptions}
            value={formData?.websiteType}
            onChange={(value) => handleSelectChange('websiteType', value)}
            error={errors?.websiteType}
            required
            className="w-full"
          />

          <Select
            label="Budget Range"
            name="budget"
            options={budgetOptions}
            value={formData?.budget}
            onChange={(value) => handleSelectChange('budget', value)}
            error={errors?.budget}
            required
            className="w-full"
          />

          <Select
            label="Project Timeline"
            name="timeline"
            options={timelineOptions}
            value={formData?.timeline}
            onChange={(value) => handleSelectChange('timeline', value)}
            error={errors?.timeline}
            required
            className="w-full"
          />

          <Input
            label="Number of Pages"
            type="number"
            name="pageCount"
            placeholder="Estimated number of pages"
            value={formData?.pageCount}
            onChange={handleInputChange}
            error={errors?.pageCount}
            min="1"
            max="100"
            className="w-full"
          />
        </div>
      </div>
      <div>
        <Input
          label="Project Description"
          type="textarea"
          name="description"
          placeholder="Please describe your project requirements, design preferences, specific features needed, and any other important details..."
          value={formData?.description}
          onChange={handleInputChange}
          error={errors?.description}
          required
          rows={6}
          className="w-full"
        />
      </div>
      <div>
        <h4 className="text-md font-medium text-foreground mb-4">Additional Services</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {additionalServices?.map((service) => (
            <Checkbox
              key={service?.id}
              label={service?.label}
              description={service?.description}
              checked={formData?.additionalServices?.includes(service?.id)}
              onChange={(e) => handleCheckboxChange('additionalServices', service?.id, e?.target?.checked)}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsSection;