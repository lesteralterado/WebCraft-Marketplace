import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const TechnicalRequirementsSection = ({ 
  formData, 
  handleInputChange, 
  handleSelectChange, 
  handleCheckboxChange,
  errors 
}) => {
  const technologyPreferences = [
    { id: 'react', label: 'React', description: 'Modern JavaScript library for building user interfaces' },
    { id: 'vue', label: 'Vue.js', description: 'Progressive JavaScript framework' },
    { id: 'angular', label: 'Angular', description: 'Platform for building mobile and desktop web applications' },
    { id: 'wordpress', label: 'WordPress', description: 'Content management system' },
    { id: 'shopify', label: 'Shopify', description: 'E-commerce platform' },
    { id: 'webflow', label: 'Webflow', description: 'Visual web development platform' },
    { id: 'nextjs', label: 'Next.js', description: 'React framework for production' },
    { id: 'gatsby', label: 'Gatsby', description: 'Static site generator' }
  ];

  const features = [
    { id: 'responsive', label: 'Responsive Design', description: 'Mobile-friendly across all devices' },
    { id: 'search', label: 'Search Functionality', description: 'Site-wide search capabilities' },
    { id: 'blog', label: 'Blog/News Section', description: 'Content management for articles' },
    { id: 'contact', label: 'Contact Forms', description: 'Custom contact and inquiry forms' },
    { id: 'gallery', label: 'Image/Video Gallery', description: 'Media showcase functionality' },
    { id: 'testimonials', label: 'Customer Testimonials', description: 'Reviews and testimonials section' },
    { id: 'newsletter', label: 'Newsletter Signup', description: 'Email subscription functionality' },
    { id: 'multilingual', label: 'Multi-language Support', description: 'Content in multiple languages' },
    { id: 'booking', label: 'Booking/Appointment System', description: 'Online scheduling functionality' },
    { id: 'payment', label: 'Payment Integration', description: 'Online payment processing' },
    { id: 'membership', label: 'User Registration/Login', description: 'User account management' },
    { id: 'chat', label: 'Live Chat Support', description: 'Real-time customer support' }
  ];

  const integrations = [
    { id: 'google-analytics', label: 'Google Analytics', description: 'Website traffic analysis' },
    { id: 'google-ads', label: 'Google Ads', description: 'Pay-per-click advertising integration' },
    { id: 'facebook-pixel', label: 'Facebook Pixel', description: 'Social media advertising tracking' },
    { id: 'mailchimp', label: 'Mailchimp', description: 'Email marketing platform' },
    { id: 'hubspot', label: 'HubSpot', description: 'CRM and marketing automation' },
    { id: 'salesforce', label: 'Salesforce', description: 'Customer relationship management' },
    { id: 'stripe', label: 'Stripe', description: 'Payment processing' },
    { id: 'paypal', label: 'PayPal', description: 'Online payment system' }
  ];

  const hostingOptions = [
    { value: '', label: 'Select Hosting Preference' },
    { value: 'managed', label: 'We Handle Hosting (Recommended)' },
    { value: 'existing', label: 'Use My Existing Hosting' },
    { value: 'recommend', label: 'Recommend Hosting Provider' },
    { value: 'cloud', label: 'Cloud Hosting (AWS, Google Cloud)' },
    { value: 'discuss', label: 'Let\'s Discuss Options' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Technical Requirements</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-md font-medium text-foreground mb-3">Technology Preferences</h4>
            <p className="text-sm text-muted-foreground mb-4">Select your preferred technologies (optional - we can recommend the best fit)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {technologyPreferences?.map((tech) => (
                <Checkbox
                  key={tech?.id}
                  label={tech?.label}
                  description={tech?.description}
                  checked={formData?.technologies?.includes(tech?.id)}
                  onChange={(e) => handleCheckboxChange('technologies', tech?.id, e?.target?.checked)}
                  className="w-full"
                />
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-foreground mb-3">Required Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features?.map((feature) => (
                <Checkbox
                  key={feature?.id}
                  label={feature?.label}
                  description={feature?.description}
                  checked={formData?.features?.includes(feature?.id)}
                  onChange={(e) => handleCheckboxChange('features', feature?.id, e?.target?.checked)}
                  className="w-full"
                />
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-foreground mb-3">Third-party Integrations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations?.map((integration) => (
                <Checkbox
                  key={integration?.id}
                  label={integration?.label}
                  description={integration?.description}
                  checked={formData?.integrations?.includes(integration?.id)}
                  onChange={(e) => handleCheckboxChange('integrations', integration?.id, e?.target?.checked)}
                  className="w-full"
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Hosting Preference"
              name="hosting"
              options={hostingOptions}
              value={formData?.hosting}
              onChange={(value) => handleSelectChange('hosting', value)}
              error={errors?.hosting}
              className="w-full"
            />

            <Input
              label="Expected Monthly Traffic"
              type="text"
              name="expectedTraffic"
              placeholder="e.g., 1,000 - 5,000 visitors/month"
              value={formData?.expectedTraffic}
              onChange={handleInputChange}
              error={errors?.expectedTraffic}
              className="w-full"
            />
          </div>

          <Input
            label="Technical Notes"
            type="textarea"
            name="technicalNotes"
            placeholder="Any specific technical requirements, existing systems to integrate with, or technical constraints we should know about..."
            value={formData?.technicalNotes}
            onChange={handleInputChange}
            error={errors?.technicalNotes}
            rows={4}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TechnicalRequirementsSection;