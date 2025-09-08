import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProjectDetailsSection from './components/ProjectDetailsSection';
import ContactInformationSection from './components/ContactInformationSection';
import TechnicalRequirementsSection from './components/TechnicalRequirementsSection';
import FileUploadSection from './components/FileUploadSection';
import FormProgressIndicator from './components/FormProgressIndicator';
import FormSummarySection from './components/FormSummarySection';

const CustomRequestForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const stepTitles = ['Project', 'Contact', 'Technical', 'Files', 'Review'];
  const totalSteps = stepTitles?.length;

  const [formData, setFormData] = useState({
    // Project Details
    projectName: '',
    industry: '',
    websiteType: '',
    budget: '',
    timeline: '',
    pageCount: '',
    description: '',
    additionalServices: [],

    // Contact Information
    fullName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    companySize: '',
    currentWebsite: '',
    country: '',
    preferredContact: '',
    bestTimeToContact: '',

    // Technical Requirements
    technologies: [],
    features: [],
    integrations: [],
    hosting: '',
    expectedTraffic: '',
    technicalNotes: '',

    // Files
    files: []
  });

  // Load saved form data from localStorage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem('customRequestFormData');
    const savedStep = localStorage.getItem('customRequestFormStep');
    
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
    
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('customRequestFormData', JSON.stringify(formData));
    localStorage.setItem('customRequestFormStep', currentStep?.toString());
  }, [formData, currentStep]);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCheckboxChange = (fieldName, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: checked 
        ? [...prev?.[fieldName], value]
        : prev?.[fieldName]?.filter(item => item !== value)
    }));
  };

  const handleFileUpload = (file) => {
    // Validate file size (10MB limit)
    if (file?.size > 10 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        files: 'File size must be less than 10MB'
      }));
      return;
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif',
      'application/pdf',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'application/zip', 'application/x-rar-compressed'
    ];

    if (!allowedTypes?.includes(file?.type)) {
      setErrors(prev => ({
        ...prev,
        files: 'File type not supported'
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      files: [...prev?.files, file]
    }));

    // Clear file errors
    if (errors?.files) {
      setErrors(prev => ({
        ...prev,
        files: ''
      }));
    }
  };

  const handleFileRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev?.files?.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // Project Details
        if (!formData?.projectName?.trim()) newErrors.projectName = 'Project name is required';
        if (!formData?.industry) newErrors.industry = 'Industry selection is required';
        if (!formData?.websiteType) newErrors.websiteType = 'Website type is required';
        if (!formData?.budget) newErrors.budget = 'Budget range is required';
        if (!formData?.timeline) newErrors.timeline = 'Timeline is required';
        if (!formData?.description?.trim()) newErrors.description = 'Project description is required';
        break;

      case 2: // Contact Information
        if (!formData?.fullName?.trim()) newErrors.fullName = 'Full name is required';
        if (!formData?.email?.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData?.country) newErrors.country = 'Country selection is required';
        break;

      case 3: // Technical Requirements
        // Technical requirements are mostly optional, but we can add validation if needed
        break;

      case 4: // Files
        // File upload is optional
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleStepEdit = (step) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear saved form data
      localStorage.removeItem('customRequestFormData');
      localStorage.removeItem('customRequestFormStep');
      
      // Show success message and redirect
      alert('Thank you! Your custom website request has been submitted successfully. We\'ll contact you within 24 hours to discuss your project.');
      navigate('/template-gallery');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProjectDetailsSection
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleCheckboxChange={handleCheckboxChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <ContactInformationSection
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <TechnicalRequirementsSection
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleCheckboxChange={handleCheckboxChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <FileUploadSection
            formData={formData}
            handleFileUpload={handleFileUpload}
            handleFileRemove={handleFileRemove}
            errors={errors}
          />
        );
      case 5:
        return (
          <FormSummarySection
            formData={formData}
            onEdit={handleStepEdit}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        <FormProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepTitles={stepTitles}
        />

        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          {renderStepContent()}

          {/* Navigation Buttons */}
          {currentStep < totalSteps && (
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="sm:w-auto w-full"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Previous
              </Button>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/template-gallery')}
                  className="sm:w-auto w-full"
                >
                  Save & Exit
                </Button>
                <Button
                  onClick={handleNext}
                  className="sm:w-auto w-full"
                >
                  Next Step
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-muted rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="HelpCircle" size={16} className="text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground mb-2">Need Help?</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Our team is here to help you create the perfect website. If you have any questions about this form or need assistance with your project requirements, don't hesitate to reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="Mail" size={14} className="mr-2" />
                  Email Support
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Phone" size={14} className="mr-2" />
                  Schedule Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomRequestForm;