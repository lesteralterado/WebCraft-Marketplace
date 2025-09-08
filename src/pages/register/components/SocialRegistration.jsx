import React from 'react';
import Button from '../../../components/ui/Button';


const SocialRegistration = ({ onSocialRegister }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      color: 'bg-gray-900 hover:bg-gray-800',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            onClick={() => onSocialRegister(provider?.id)}
            className="w-full justify-center"
            iconName={provider?.icon}
            iconPosition="left"
            iconSize={18}
          >
            Continue with {provider?.name}
          </Button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground text-center space-y-1">
        <p>By using social registration, you agree to share:</p>
        <ul className="text-center">
          <li>• Basic profile information (name, email)</li>
          <li>• Profile picture (optional)</li>
        </ul>
      </div>
    </div>
  );
};

export default SocialRegistration;