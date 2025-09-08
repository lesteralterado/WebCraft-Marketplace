import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSettings = ({ userProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userProfile?.firstName,
    lastName: userProfile?.lastName,
    email: userProfile?.email,
    phone: userProfile?.phone,
    company: userProfile?.company,
    website: userProfile?.website
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    purchaseConfirmations: true,
    marketingEmails: false,
    securityAlerts: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const handleSave = () => {
    console.log('Saving profile:', formData);
    console.log('Saving notifications:', notifications);
    setIsEditing(false);
    // Mock save functionality
  };

  const handleCancel = () => {
    setFormData({
      firstName: userProfile?.firstName,
      lastName: userProfile?.lastName,
      email: userProfile?.email,
      phone: userProfile?.phone,
      company: userProfile?.company,
      website: userProfile?.website
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-card-foreground">Account Settings</h2>
          {!isEditing ? (
            <Button 
              variant="outline" 
              size="sm" 
              iconName="Edit" 
              iconPosition="left"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="p-6 space-y-8">
        {/* Profile Information */}
        <div>
          <h3 className="text-lg font-medium text-card-foreground mb-4">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              value={formData?.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mb-4"
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData?.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mb-4"
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData?.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mb-4"
            />
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData?.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mb-4"
            />
            <Input
              label="Company"
              name="company"
              value={formData?.company}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mb-4"
            />
            <Input
              label="Website"
              name="website"
              type="url"
              value={formData?.website}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="mb-4"
            />
          </div>
        </div>

        {/* Notification Preferences */}
        <div>
          <h3 className="text-lg font-medium text-card-foreground mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {Object.entries(notifications)?.map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-card-foreground">
                    {key === 'emailUpdates' && 'Email Updates'}
                    {key === 'purchaseConfirmations' && 'Purchase Confirmations'}
                    {key === 'marketingEmails' && 'Marketing Emails'}
                    {key === 'securityAlerts' && 'Security Alerts'}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {key === 'emailUpdates' && 'Receive updates about new templates and features'}
                    {key === 'purchaseConfirmations' && 'Get notified when your purchases are complete'}
                    {key === 'marketingEmails' && 'Receive promotional offers and discounts'}
                    {key === 'securityAlerts' && 'Important security and account notifications'}
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationChange(key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-primary' : 'bg-muted-foreground/20'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security Section */}
        <div>
          <h3 className="text-lg font-medium text-card-foreground mb-4">Security</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Lock" size={20} className="text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium text-card-foreground">Password</h4>
                  <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Change Password
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Smartphone" size={20} className="text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium text-card-foreground">Two-Factor Authentication</h4>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Enable 2FA
              </Button>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div>
          <h3 className="text-lg font-medium text-card-foreground mb-4">Billing Information</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="CreditCard" size={20} className="text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium text-card-foreground">Payment Methods</h4>
                  <p className="text-xs text-muted-foreground">Manage your saved payment methods</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="FileText" size={20} className="text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium text-card-foreground">Billing History</h4>
                  <p className="text-xs text-muted-foreground">View and download invoices</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View History
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;