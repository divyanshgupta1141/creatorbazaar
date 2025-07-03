import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PhoneInput = ({ onSubmit, isLoading, error, currentLanguage }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Validate 10-digit Indian phone number
    const phoneRegex = /^[6-9]\d{9}$/;
    setIsValid(phoneRegex.test(phoneNumber));
  }, [phoneNumber]);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && !isLoading) {
      onSubmit(phoneNumber);
    }
  };

  const content = {
    en: {
      title: "Welcome to CreatorBazaar",
      subtitle: "Enter your mobile number to get started",
      placeholder: "Enter 10-digit mobile number",
      button: "Send OTP",
      error: "Please enter a valid 10-digit mobile number",
      hint: "We'll send you a verification code"
    },
    hi: {
      title: "CreatorBazaar में आपका स्वागत है",
      subtitle: "शुरू करने के लिए अपना मोबाइल नंबर दर्ज करें",
      placeholder: "10 अंकों का मोबाइल नंबर दर्ज करें",
      button: "OTP भेजें",
      error: "कृपया एक वैध 10 अंकों का मोबाइल नंबर दर्ज करें",
      hint: "हम आपको एक सत्यापन कोड भेजेंगे"
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
          <Icon name="Smartphone" size={32} color="white" strokeWidth={2} />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">
          {text.title}
        </h2>
        <p className="text-text-secondary text-sm">
          {text.subtitle}
        </p>
      </div>

      {/* Phone Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 pointer-events-none">
              <div className="w-6 h-4 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-sm border border-border flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-text-primary font-medium text-sm">+91</span>
              <div className="w-px h-4 bg-border"></div>
            </div>
            <Input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder={text.placeholder}
              className="pl-20 pr-4 py-3 text-lg font-medium tracking-wide"
              disabled={isLoading}
              required
            />
          </div>
          
          {error && (
            <div className="flex items-center space-x-2 text-error text-sm">
              <Icon name="AlertCircle" size={16} />
              <span>{error}</span>
            </div>
          )}
          
          {!isValid && phoneNumber.length > 0 && !error && (
            <div className="flex items-center space-x-2 text-warning text-sm">
              <Icon name="AlertTriangle" size={16} />
              <span>{text.error}</span>
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={!isValid || isLoading}
          loading={isLoading}
          className="py-3 text-lg font-semibold spring-transition glow-effect"
        >
          {text.button}
        </Button>

        <div className="text-center">
          <p className="text-text-tertiary text-xs flex items-center justify-center space-x-1">
            <Icon name="Shield" size={14} />
            <span>{text.hint}</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default PhoneInput;