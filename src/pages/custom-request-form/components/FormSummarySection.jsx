import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FormSummarySection = ({ formData, onEdit, onSubmit, isSubmitting }) => {
  const formatArrayValues = (array, labels) => {
    if (!array || array?.length === 0) return 'None selected';
    return array?.map(item => labels?.[item] || item)?.join(', ');
  };

  const industryLabels = {
    'technology': 'Technology & Software',
    'healthcare': 'Healthcare & Medical',
    'finance': 'Finance & Banking',
    'ecommerce': 'E-commerce & Retail',
    'education': 'Education & Training',
    'realestate': 'Real Estate',
    'hospitality': 'Hospitality & Tourism',
    'nonprofit': 'Non-profit & NGO',
    'manufacturing': 'Manufacturing & Industrial',
    'consulting': 'Consulting & Professional Services',
    'other': 'Other'
  };

  const websiteTypeLabels = {
    'business': 'Business/Corporate Website',
    'ecommerce': 'E-commerce Store',
    'portfolio': 'Portfolio/Personal Website',
    'blog': 'Blog/News Website',
    'landing': 'Landing Page',
    'saas': 'SaaS Application',
    'marketplace': 'Marketplace Platform',
    'booking': 'Booking/Reservation System',
    'directory': 'Directory/Listing Website',
    'community': 'Community/Forum',
    'other': 'Other'
  };

  const budgetLabels = {
    '1000-2500': '$1,000 - $2,500',
    '2500-5000': '$2,500 - $5,000',
    '5000-10000': '$5,000 - $10,000',
    '10000-25000': '$10,000 - $25,000',
    '25000-50000': '$25,000 - $50,000',
    '50000+': '$50,000+',
    'discuss': 'Let\'s Discuss'
  };

  const timelineLabels = {
    '2-4weeks': '2-4 weeks',
    '1-2months': '1-2 months',
    '2-3months': '2-3 months',
    '3-6months': '3-6 months',
    '6months+': '6+ months',
    'flexible': 'Flexible'
  };

  const technologyLabels = {
    'react': 'React',
    'vue': 'Vue.js',
    'angular': 'Angular',
    'wordpress': 'WordPress',
    'shopify': 'Shopify',
    'webflow': 'Webflow',
    'nextjs': 'Next.js',
    'gatsby': 'Gatsby'
  };

  const summaryItems = [
    {
      title: 'Project Information',
      items: [
        { label: 'Project Name', value: formData?.projectName || 'Not specified' },
        { label: 'Industry', value: industryLabels?.[formData?.industry] || 'Not specified' },
        { label: 'Website Type', value: websiteTypeLabels?.[formData?.websiteType] || 'Not specified' },
        { label: 'Budget Range', value: budgetLabels?.[formData?.budget] || 'Not specified' },
        { label: 'Timeline', value: timelineLabels?.[formData?.timeline] || 'Not specified' },
        { label: 'Number of Pages', value: formData?.pageCount || 'Not specified' }
      ]
    },
    {
      title: 'Contact Information',
      items: [
        { label: 'Name', value: formData?.fullName || 'Not provided' },
        { label: 'Email', value: formData?.email || 'Not provided' },
        { label: 'Phone', value: formData?.phone || 'Not provided' },
        { label: 'Company', value: formData?.company || 'Not provided' },
        { label: 'Country', value: formData?.country || 'Not specified' }
      ]
    },
    {
      title: 'Technical Requirements',
      items: [
        { 
          label: 'Preferred Technologies', 
          value: formatArrayValues(formData?.technologies, technologyLabels) 
        },
        { 
          label: 'Required Features', 
          value: formData?.features?.length > 0 ? `${formData?.features?.length} features selected` : 'None selected' 
        },
        { 
          label: 'Integrations', 
          value: formData?.integrations?.length > 0 ? `${formData?.integrations?.length} integrations selected` : 'None selected' 
        },
        { label: 'Expected Traffic', value: formData?.expectedTraffic || 'Not specified' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Review Your Request</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Please review all the information below before submitting your custom website request.
        </p>

        {summaryItems?.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-medium text-foreground">{section?.title}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(sectionIndex + 1)}
                className="text-primary hover:text-primary"
              >
                <Icon name="Edit2" size={14} className="mr-1" />
                Edit
              </Button>
            </div>
            
            <div className="bg-muted rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section?.items?.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {item?.label}
                    </dt>
                    <dd className="text-sm text-foreground mt-1">
                      {item?.value}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Project Description */}
        {formData?.description && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-medium text-foreground">Project Description</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(1)}
                className="text-primary hover:text-primary"
              >
                <Icon name="Edit2" size={14} className="mr-1" />
                Edit
              </Button>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-foreground whitespace-pre-wrap">
                {formData?.description}
              </p>
            </div>
          </div>
        )}

        {/* Files */}
        {formData?.files && formData?.files?.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-md font-medium text-foreground">Uploaded Files</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(4)}
                className="text-primary hover:text-primary"
              >
                <Icon name="Edit2" size={14} className="mr-1" />
                Edit
              </Button>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-foreground">
                {formData?.files?.length} file{formData?.files?.length !== 1 ? 's' : ''} uploaded
              </p>
              <div className="mt-2 space-y-1">
                {formData?.files?.slice(0, 3)?.map((file, index) => (
                  <p key={index} className="text-xs text-muted-foreground">
                    • {file?.name}
                  </p>
                ))}
                {formData?.files?.length > 3 && (
                  <p className="text-xs text-muted-foreground">
                    • And {formData?.files?.length - 3} more files...
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Submit Section */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Clock" size={16} className="text-primary" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-foreground">What happens next?</h5>
              <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                <li>• We'll review your request within 24 hours</li>
                <li>• Our team will contact you to discuss details and timeline</li>
                <li>• We'll provide a detailed proposal with pricing</li>
                <li>• Upon approval, we'll begin the development process</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => onEdit(1)}
              className="flex-1"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Back to Edit
            </Button>
            <Button
              onClick={onSubmit}
              loading={isSubmitting}
              className="flex-1"
            >
              <Icon name="Send" size={16} className="mr-2" />
              Submit Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSummarySection;