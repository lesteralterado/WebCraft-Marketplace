import React from 'react';
import Icon from '../../../components/AppIcon';

const PasswordStrengthIndicator = ({ password }) => {
  const requirements = [
    { label: 'At least 8 characters', test: (pwd) => pwd?.length >= 8 },
    { label: 'Contains uppercase letter', test: (pwd) => /[A-Z]/?.test(pwd) },
    { label: 'Contains lowercase letter', test: (pwd) => /[a-z]/?.test(pwd) },
    { label: 'Contains number', test: (pwd) => /\d/?.test(pwd) },
    { label: 'Contains special character', test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/?.test(pwd) }
  ];

  const metRequirements = requirements?.filter(req => req?.test(password));
  const strength = metRequirements?.length;

  const getStrengthColor = () => {
    if (strength <= 2) return 'bg-error';
    if (strength <= 3) return 'bg-warning';
    if (strength <= 4) return 'bg-accent';
    return 'bg-success';
  };

  const getStrengthText = () => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Fair';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Password strength:</span>
        <span className={`text-sm font-medium ${
          strength <= 2 ? 'text-error' : 
          strength <= 3 ? 'text-warning' : 
          strength <= 4 ? 'text-accent' : 'text-success'
        }`}>
          {getStrengthText()}
        </span>
      </div>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5]?.map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded-full ${
              level <= strength ? getStrengthColor() : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <div className="space-y-1">
        {requirements?.map((req, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Icon 
              name={req?.test(password) ? "Check" : "X"} 
              size={14} 
              className={req?.test(password) ? 'text-success' : 'text-muted-foreground'} 
            />
            <span className={`text-xs ${
              req?.test(password) ? 'text-success' : 'text-muted-foreground'
            }`}>
              {req?.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;