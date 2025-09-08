import React from 'react';
import Icon from '../../../components/AppIcon';

const AccountTypeSelector = ({ selectedType, onTypeChange }) => {
  const accountTypes = [
    {
      id: 'developer',
      title: 'Developer',
      description: 'Building websites and applications',
      icon: 'Code',
      benefits: ['Access to source files', 'Developer documentation', 'API integration guides']
    },
    {
      id: 'business',
      title: 'Business Owner',
      description: 'Looking for professional website solutions',
      icon: 'Building',
      benefits: ['Easy customization', 'Business-focused templates', 'Support priority']
    },
    {
      id: 'agency',
      title: 'Agency',
      description: 'Creating websites for multiple clients',
      icon: 'Users',
      benefits: ['Bulk licensing', 'White-label options', 'Agency dashboard']
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Account Type <span className="text-error">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accountTypes?.map((type) => (
            <div
              key={type?.id}
              onClick={() => onTypeChange(type?.id)}
              className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-soft ${
                selectedType === type?.id
                  ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`p-3 rounded-full ${
                  selectedType === type?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={type?.icon} size={24} />
                </div>
                
                <div>
                  <h3 className={`font-semibold ${
                    selectedType === type?.id ? 'text-primary' : 'text-foreground'
                  }`}>
                    {type?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {type?.description}
                  </p>
                </div>

                <ul className="text-xs text-muted-foreground space-y-1">
                  {type?.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-1">
                      <Icon name="Check" size={12} className="text-success" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedType === type?.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} color="white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountTypeSelector;