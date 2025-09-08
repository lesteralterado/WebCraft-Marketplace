import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingSection = ({ template, onAddToCart }) => {
  const [selectedLicense, setSelectedLicense] = useState('standard');
  const [quantity, setQuantity] = useState(1);

  const licenses = {
    standard: {
      name: 'Standard License',
      price: template?.price,
      description: 'Perfect for personal and small business websites',
      features: [
        'Use for 1 website',
        'Personal & commercial use',
        'Free updates for 6 months',
        'Basic support included'
      ]
    },
    extended: {
      name: 'Extended License',
      price: template?.price * 3,
      description: 'Ideal for client projects and resale',
      features: [
        'Use for unlimited websites',
        'Client projects allowed',
        'Free updates for 1 year',
        'Priority support included',
        'Remove attribution links'
      ]
    },
    developer: {
      name: 'Developer License',
      price: template?.price * 5,
      description: 'Best for agencies and developers',
      features: [
        'Unlimited websites',
        'Resale rights included',
        'Lifetime free updates',
        'Premium support included',
        'Source files included',
        'White-label rights'
      ]
    }
  };

  const currentLicense = licenses?.[selectedLicense];
  const totalPrice = currentLicense?.price * quantity;

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart({
      template,
      license: selectedLicense,
      quantity,
      totalPrice
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">Choose Your License</h2>
      {/* License Options */}
      <div className="space-y-4 mb-6">
        {Object.entries(licenses)?.map(([key, license]) => (
          <div
            key={key}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedLicense === key
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedLicense(key)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                  selectedLicense === key
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {selectedLicense === key && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{license?.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{license?.description}</p>
                  <ul className="mt-2 space-y-1">
                    {license?.features?.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <Icon name="Check" size={12} className="text-success" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">${license?.price}</div>
                {key === 'extended' && (
                  <div className="text-xs text-success">Most Popular</div>
                )}
                {key === 'developer' && (
                  <div className="text-xs text-warning">Best Value</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Quantity Selector */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-medium text-foreground">Quantity:</span>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            <Icon name="Minus" size={16} />
          </Button>
          <span className="w-12 text-center font-medium text-foreground">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleQuantityChange(1)}
          >
            <Icon name="Plus" size={16} />
          </Button>
        </div>
      </div>
      {/* Total Price */}
      <div className="border-t border-border pt-4 mb-6">
        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold text-foreground">Total:</span>
          <span className="text-2xl font-bold text-primary">${totalPrice}</span>
        </div>
        {template?.originalPrice && template?.originalPrice > currentLicense?.price && (
          <div className="text-right">
            <span className="text-sm text-muted-foreground line-through">
              ${template?.originalPrice * quantity}
            </span>
            <span className="text-sm text-success ml-2">
              Save ${(template?.originalPrice - currentLicense?.price) * quantity}
            </span>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          onClick={handleAddToCart}
          iconName="ShoppingCart"
          iconPosition="left"
        >
          Add to Cart
        </Button>
        <Button
          variant="outline"
          fullWidth
          iconName="Download"
          iconPosition="left"
        >
          Buy & Download Now
        </Button>
      </div>
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Download" size={16} className="text-success" />
          <span>Instant Download</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="RefreshCw" size={16} className="text-success" />
          <span>30-Day Refund</span>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;