import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';
import AccountTypeSelector from './components/AccountTypeSelector';
import SocialRegistration from './components/SocialRegistration';
import TermsAndPrivacy from './components/TermsAndPrivacy';
import EmailVerificationMessage from './components/EmailVerificationMessage';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: ''
  });

  // Agreement state
  const [agreements, setAgreements] = useState({
    termsAccepted: false,
    privacyAccepted: false,
    newsletterSubscribed: false,
    marketingAccepted: false
  });

  // Error state
  const [errors, setErrors] = useState({});

  // Mock credentials for testing
  const mockCredentials = {
    existingEmails: ['john.doe@example.com', 'jane.smith@example.com', 'admin@webcraft.com']
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAccountTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      accountType: type
    }));
    
    if (errors?.accountType) {
      setErrors(prev => ({
        ...prev,
        accountType: ''
      }));
    }
  };

  const handleAgreementChange = (field, value) => {
    setAgreements(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (mockCredentials?.existingEmails?.includes(formData?.email)) {
      newErrors.email = 'This email is already registered. Please use a different email or try logging in.';
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Confirm password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Account type validation
    if (!formData?.accountType) {
      newErrors.accountType = 'Please select an account type';
    }

    // Agreement validation
    if (!agreements?.termsAccepted) {
      newErrors.termsAccepted = 'You must agree to the Terms of Service';
    }
    if (!agreements?.privacyAccepted) {
      newErrors.privacyAccepted = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show verification message
      setShowVerification(true);
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = async (provider) => {
    setIsLoading(true);
    
    try {
      // Simulate social registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo, redirect to dashboard
      navigate('/user-account-dashboard');
    } catch (error) {
      setErrors({ submit: `${provider} registration failed. Please try again.` });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setIsResending(true);
    
    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  if (showVerification) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <EmailVerificationMessage
              email={formData?.email}
              onResendVerification={handleResendVerification}
              isResending={isResending}
            />
            
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-primary hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="bg-card border border-border rounded-lg shadow-soft p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                <Icon name="UserPlus" size={32} className="text-primary" />
              </div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Create Your Account
              </h1>
              <p className="text-muted-foreground">
                Join WebCraft Marketplace to access premium templates and digital products
              </p>
            </div>

            {/* Social Registration */}
            <SocialRegistration onSocialRegister={handleSocialRegister} />

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData?.firstName}
                  onChange={handleInputChange}
                  error={errors?.firstName}
                  required
                />
                <Input
                  label="Last Name"
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData?.lastName}
                  onChange={handleInputChange}
                  error={errors?.lastName}
                  required
                />
              </div>

              {/* Email */}
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData?.email}
                onChange={handleInputChange}
                error={errors?.email}
                description="We'll send you a verification email"
                required
              />

              {/* Password */}
              <div>
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData?.password}
                  onChange={handleInputChange}
                  error={errors?.password}
                  required
                />
                <PasswordStrengthIndicator password={formData?.password} />
              </div>

              {/* Confirm Password */}
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData?.confirmPassword}
                onChange={handleInputChange}
                error={errors?.confirmPassword}
                required
              />

              {/* Account Type Selection */}
              <AccountTypeSelector
                selectedType={formData?.accountType}
                onTypeChange={handleAccountTypeChange}
              />
              {errors?.accountType && (
                <p className="text-sm text-error mt-1">{errors?.accountType}</p>
              )}

              {/* Terms and Privacy */}
              <TermsAndPrivacy
                termsAccepted={agreements?.termsAccepted}
                onTermsChange={(value) => handleAgreementChange('termsAccepted', value)}
                privacyAccepted={agreements?.privacyAccepted}
                onPrivacyChange={(value) => handleAgreementChange('privacyAccepted', value)}
                newsletterSubscribed={agreements?.newsletterSubscribed}
                onNewsletterChange={(value) => handleAgreementChange('newsletterSubscribed', value)}
                marketingAccepted={agreements?.marketingAccepted}
                onMarketingChange={(value) => handleAgreementChange('marketingAccepted', value)}
              />
              
              {(errors?.termsAccepted || errors?.privacyAccepted) && (
                <div className="space-y-1">
                  {errors?.termsAccepted && (
                    <p className="text-sm text-error">{errors?.termsAccepted}</p>
                  )}
                  {errors?.privacyAccepted && (
                    <p className="text-sm text-error">{errors?.privacyAccepted}</p>
                  )}
                </div>
              )}

              {/* Submit Error */}
              {errors?.submit && (
                <div className="bg-error/10 border border-error/20 rounded-md p-3">
                  <p className="text-sm text-error">{errors?.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                loading={isLoading}
                fullWidth
                iconName="UserPlus"
                iconPosition="left"
              >
                Create Account
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;