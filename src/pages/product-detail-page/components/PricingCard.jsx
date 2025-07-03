import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingCard = ({ product, currentLanguage, onPurchase }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const originalPrice = product.price * 1.3; // Mock original price for discount display

  return (
    <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6 shadow-lg border border-primary-200 sticky top-24">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-sm text-text-secondary line-through">
            {formatPrice(originalPrice)}
          </span>
          <span className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-bold">
            23% {currentLanguage === 'hi' ? 'छूट' : 'OFF'}
          </span>
        </div>
        <div className="text-4xl font-bold text-primary mb-2 glow-effect">
          {formatPrice(product.price)}
        </div>
        <p className="text-sm text-text-secondary">
          {currentLanguage === 'hi' ? 'एक बार खरीदें, हमेशा के लिए अपना' : 'Buy once, yours forever'}
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Download" size={16} className="text-success" />
          <span className="text-sm text-text-secondary">
            {currentLanguage === 'hi' ? 'तुरंत डाउनलोड' : 'Instant Download'}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm text-text-secondary">
            {currentLanguage === 'hi' ? 'सुरक्षित भुगतान' : 'Secure Payment'}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Icon name="RefreshCw" size={16} className="text-success" />
          <span className="text-sm text-text-secondary">
            {currentLanguage === 'hi' ? '30 दिन की गारंटी' : '30-day Guarantee'}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Icon name="Smartphone" size={16} className="text-success" />
          <span className="text-sm text-text-secondary">
            {currentLanguage === 'hi' ? 'UPI से भुगतान करें' : 'Pay with UPI'}
          </span>
        </div>
      </div>

      <Button
        variant="primary"
        fullWidth
        onClick={onPurchase}
        iconName="ShoppingCart"
        iconPosition="left"
        className="mb-4 text-lg py-4 glow-effect hover:shadow-xl transition-all duration-300"
      >
        {currentLanguage === 'hi' ? 'अभी खरीदें' : 'Buy Now'}
      </Button>

      <div className="text-center">
        <p className="text-xs text-text-tertiary mb-2">
          {currentLanguage === 'hi' ? 'भुगतान के तरीके' : 'Payment Methods'}
        </p>
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-1 bg-white px-2 py-1 rounded border">
            <Icon name="Smartphone" size={14} className="text-primary" />
            <span className="text-xs font-medium">UPI</span>
          </div>
          <div className="flex items-center space-x-1 bg-white px-2 py-1 rounded border">
            <Icon name="CreditCard" size={14} className="text-primary" />
            <span className="text-xs font-medium">Card</span>
          </div>
          <div className="flex items-center space-x-1 bg-white px-2 py-1 rounded border">
            <Icon name="Building2" size={14} className="text-primary" />
            <span className="text-xs font-medium">Net Banking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;