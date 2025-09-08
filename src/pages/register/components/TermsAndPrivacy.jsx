import React, { useState } from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TermsAndPrivacy = ({ 
  termsAccepted, 
  onTermsChange, 
  privacyAccepted, 
  onPrivacyChange,
  newsletterSubscribed,
  onNewsletterChange,
  marketingAccepted,
  onMarketingChange
}) => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const openTermsModal = (e) => {
    e?.preventDefault();
    setShowTermsModal(true);
  };

  const openPrivacyModal = (e) => {
    e?.preventDefault();
    setShowPrivacyModal(true);
  };

  const TermsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Terms of Service</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTermsModal(false)}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
          
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <h3 className="text-foreground font-medium">1. Acceptance of Terms</h3>
            <p>By creating an account on WebCraft Marketplace, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
            
            <h3 className="text-foreground font-medium">2. Use License</h3>
            <p>Permission is granted to temporarily download one copy of the materials on WebCraft Marketplace for personal, non-commercial transitory viewing only.</p>
            
            <h3 className="text-foreground font-medium">3. Account Responsibilities</h3>
            <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.</p>
            
            <h3 className="text-foreground font-medium">4. Template Licensing</h3>
            <p>Each template comes with specific licensing terms. Regular licenses allow single-use, while extended licenses permit multiple uses.</p>
            
            <h3 className="text-foreground font-medium">5. Refund Policy</h3>
            <p>Refunds are available within 30 days of purchase if the template has not been downloaded or used in any project.</p>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setShowTermsModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const PrivacyModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Privacy Policy</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPrivacyModal(false)}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
          
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <h3 className="text-foreground font-medium">Information We Collect</h3>
            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
            
            <h3 className="text-foreground font-medium">How We Use Your Information</h3>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
            
            <h3 className="text-foreground font-medium">Information Sharing</h3>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
            
            <h3 className="text-foreground font-medium">Data Security</h3>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            
            <h3 className="text-foreground font-medium">Cookies</h3>
            <p>We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts.</p>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setShowPrivacyModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-3">
          <Checkbox
            label={
              <span className="text-sm">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={openTermsModal}
                  className="text-primary hover:underline font-medium"
                >
                  Terms of Service
                </button>
                <span className="text-error ml-1">*</span>
              </span>
            }
            checked={termsAccepted}
            onChange={(e) => onTermsChange(e?.target?.checked)}
            required
          />

          <Checkbox
            label={
              <span className="text-sm">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={openPrivacyModal}
                  className="text-primary hover:underline font-medium"
                >
                  Privacy Policy
                </button>
                <span className="text-error ml-1">*</span>
              </span>
            }
            checked={privacyAccepted}
            onChange={(e) => onPrivacyChange(e?.target?.checked)}
            required
          />
        </div>

        <div className="border-t border-border pt-4 space-y-3">
          <h4 className="text-sm font-medium text-foreground">Communication Preferences</h4>
          
          <Checkbox
            label="Subscribe to newsletter for template updates and design tips"
            description="Receive weekly updates about new templates and design resources"
            checked={newsletterSubscribed}
            onChange={(e) => onNewsletterChange(e?.target?.checked)}
          />

          <Checkbox
            label="Receive marketing emails about promotions and special offers"
            description="Get notified about sales, discounts, and exclusive deals"
            checked={marketingAccepted}
            onChange={(e) => onMarketingChange(e?.target?.checked)}
          />
        </div>
      </div>
      {showTermsModal && <TermsModal />}
      {showPrivacyModal && <PrivacyModal />}
    </>
  );
};

export default TermsAndPrivacy;