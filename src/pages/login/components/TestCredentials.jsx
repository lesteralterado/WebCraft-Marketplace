import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestCredentials = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const credentials = [
    {
      role: "Administrator",
      email: "admin@royalswebsolutions.com",
      password: "admin123",
      description: "Full access to all features and admin panel"
    },
    {
      role: "Developer",
      email: "dev@royalswebsolutions.com",
      password: "dev123",
      description: "Access to developer tools and template uploads"
    },
    {
      role: "Customer",
      email: "customer@royalswebsolutions.com",
      password: "customer123",
      description: "Standard customer account with purchase history"
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="bg-warning/5 border border-warning/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon name="Info" size={16} className="text-warning mr-2" />
          <span className="text-sm font-medium text-warning">Demo Credentials Available</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? "Hide" : "Show"}
        </Button>
      </div>
      {isExpanded && (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-muted-foreground mb-4">
            Use these test accounts to explore different user roles and features:
          </p>
          
          {credentials?.map((cred, index) => (
            <div key={index} className="bg-background rounded-md p-3 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{cred?.role}</span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => copyToClipboard(cred?.email)}
                    className="p-1 hover:bg-muted rounded transition-smooth"
                    title="Copy email"
                  >
                    <Icon name="Copy" size={12} className="text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => copyToClipboard(cred?.password)}
                    className="p-1 hover:bg-muted rounded transition-smooth"
                    title="Copy password"
                  >
                    <Icon name="Key" size={12} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center text-xs">
                  <span className="text-muted-foreground w-16">Email:</span>
                  <code className="bg-muted px-2 py-1 rounded text-foreground">{cred?.email}</code>
                </div>
                <div className="flex items-center text-xs">
                  <span className="text-muted-foreground w-16">Password:</span>
                  <code className="bg-muted px-2 py-1 rounded text-foreground">{cred?.password}</code>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-2">{cred?.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestCredentials;