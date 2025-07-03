import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentModal = ({ isOpen, onClose, product, currentLanguage, onPaymentSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Mock payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
      onClose();
    }, 2000);
  };

  const paymentMethods = [
    {
      id: 'upi',
      name: currentLanguage === 'hi' ? 'UPI' : 'UPI',
      icon: 'Smartphone',
      description: currentLanguage === 'hi' ? 'तुरंत भुगतान' : 'Instant Payment'
    },
    {
      id: 'card',
      name: currentLanguage === 'hi' ? 'कार्ड' : 'Card',
      icon: 'CreditCard',
      description: currentLanguage === 'hi' ? 'डेबिट/क्रेडिट कार्ड' : 'Debit/Credit Card'
    },
    {
      id: 'netbanking',
      name: currentLanguage === 'hi' ? 'नेट बैंकिंग' : 'Net Banking',
      icon: 'Building2',
      description: currentLanguage === 'hi' ? 'ऑनलाइन बैंकिंग' : 'Online Banking'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary">
              {currentLanguage === 'hi' ? 'भुगतान करें' : 'Complete Payment'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Order Summary */}
          <div className="bg-primary-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-text-primary mb-2">
              {currentLanguage === 'hi' ? 'ऑर्डर सारांश' : 'Order Summary'}
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-secondary">{product.title}</span>
              <span className="font-medium">{formatPrice(product.price)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-text-secondary">
                {currentLanguage === 'hi' ? 'प्लेटफॉर्म फीस' : 'Platform Fee'}
              </span>
              <span className="font-medium text-success">
                {currentLanguage === 'hi' ? 'मुफ्त (बीटा)' : 'Free (Beta)'}
              </span>
            </div>
            <div className="border-t border-primary-200 pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-text-primary">
                  {currentLanguage === 'hi' ? 'कुल राशि' : 'Total Amount'}
                </span>
                <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="font-semibold text-text-primary mb-3">
              {currentLanguage === 'hi' ? 'भुगतान का तरीका चुनें' : 'Select Payment Method'}
            </h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedMethod === method.id
                      ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="sr-only"
                  />
                  <Icon name={method.icon} size={20} className="text-primary mr-3" />
                  <div className="flex-1">
                    <div className="font-medium text-text-primary">{method.name}</div>
                    <div className="text-sm text-text-secondary">{method.description}</div>
                  </div>
                  {selectedMethod === method.id && (
                    <Icon name="CheckCircle" size={20} className="text-primary" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* UPI ID Input */}
          {selectedMethod === 'upi' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-2">
                {currentLanguage === 'hi' ? 'UPI ID दर्ज करें' : 'Enter UPI ID'}
              </label>
              <Input
                type="text"
                placeholder={currentLanguage === 'hi' ? 'yourname@paytm' : 'yourname@paytm'}
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-text-tertiary mt-1">
                {currentLanguage === 'hi' ?'डेमो के लिए कोई भी UPI ID दर्ज करें' :'Enter any UPI ID for demo purposes'
                }
              </p>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-success-50 border border-success-200 rounded-lg p-3 mb-6">
            <div className="flex items-start space-x-2">
              <Icon name="Shield" size={16} className="text-success mt-0.5" />
              <div className="text-sm text-success-700">
                <p className="font-medium mb-1">
                  {currentLanguage === 'hi' ? 'सुरक्षित भुगतान' : 'Secure Payment'}
                </p>
                <p>
                  {currentLanguage === 'hi' ?'आपकी जानकारी 256-बिट SSL एन्क्रिप्शन से सुरक्षित है।' :'Your information is protected with 256-bit SSL encryption.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <Button
            variant="primary"
            fullWidth
            onClick={handlePayment}
            disabled={isProcessing || (selectedMethod === 'upi' && !upiId.trim())}
            loading={isProcessing}
            iconName={isProcessing ? undefined : "Lock"}
            iconPosition="left"
            className="text-lg py-4"
          >
            {isProcessing 
              ? (currentLanguage === 'hi' ? 'भुगतान प्रक्रिया में...' : 'Processing Payment...')
              : `${currentLanguage === 'hi' ? 'भुगतान करें' : 'Pay'} ${formatPrice(product.price)}`
            }
          </Button>

          <p className="text-xs text-text-tertiary text-center mt-3">
            {currentLanguage === 'hi' ?'भुगतान करके आप हमारी सेवा की शर्तों से सहमत हैं।' :'By proceeding, you agree to our terms of service.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;