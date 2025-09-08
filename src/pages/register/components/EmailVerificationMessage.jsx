import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmailVerificationMessage = ({ email, onResendVerification, isResending }) => {
  return (
    <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 text-center space-y-4">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
          <Icon name="Mail" size={32} className="text-accent" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">
          Check Your Email
        </h3>
        <p className="text-muted-foreground">
          We've sent a verification link to{' '}
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <div className="space-y-3">
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Please check your email and click the verification link to activate your account.</p>
          <p>The link will expire in 24 hours.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={onResendVerification}
            loading={isResending}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Resend Email
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => window.open('https://gmail.com', '_blank')}
            iconName="ExternalLink"
            iconPosition="right"
          >
            Open Email
          </Button>
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Didn't receive the email?</strong></p>
          <ul className="text-left space-y-1">
            <li>• Check your spam or junk folder</li>
            <li>• Make sure {email} is correct</li>
            <li>• Try resending the verification email</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationMessage;