import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginBenefits = () => {
  const benefits = [
    {
      icon: "Download",
      title: "Instant Downloads",
      description: "Access your purchased templates immediately after login"
    },
    {
      icon: "History",
      title: "Purchase History",
      description: "View and re-download all your previous purchases"
    },
    {
      icon: "Heart",
      title: "Save Favorites",
      description: "Create wishlists and save templates for later"
    },
    {
      icon: "Users",
      title: "Developer Community",
      description: "Connect with other developers and share feedback"
    },
    {
      icon: "Headphones",
      title: "Priority Support",
      description: "Get faster response times for technical assistance"
    },
    {
      icon: "Zap",
      title: "Early Access",
      description: "Be first to access new templates and features"
    }
  ];

  return (
    <div className="bg-muted/50 rounded-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Why Sign In to Royals Web Solutions?
        </h2>
        <p className="text-muted-foreground">
          Unlock exclusive features and enhance your development experience
        </p>
      </div>
      <div className="grid gap-6">
        {benefits?.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={benefit?.icon} size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground mb-1">
                {benefit?.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Trust Indicators */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mb-2">
              <Icon name="Shield" size={16} className="text-success" />
            </div>
            <span className="text-xs text-muted-foreground">SSL Secured</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center mb-2">
              <Icon name="Lock" size={16} className="text-success" />
            </div>
            <span className="text-xs text-muted-foreground">Privacy Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBenefits;