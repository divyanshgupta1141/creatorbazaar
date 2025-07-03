import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UpiSetup = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [upiId, setUpiId] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    accountHolderName: '',
    bankName: ''
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);

    // Load saved UPI ID
    const savedUpiId = localStorage.getItem('creatorUpiId');
    if (savedUpiId) {
      setUpiId(savedUpiId);
      setIsVerified(true);
    }
  }, []);

  const validateUpiId = (id) => {
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    return upiRegex.test(id);
  };

  const handleVerifyUpi = async () => {
    if (!validateUpiId(upiId)) {
      alert(currentLanguage === 'hi' ?'कृपया वैध UPI ID दर्ज करें' :'Please enter a valid UPI ID'
      );
      return;
    }

    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerified(true);
      setIsVerifying(false);
      localStorage.setItem('creatorUpiId', upiId);
      alert(currentLanguage === 'hi' ?'UPI ID सफलतापूर्वक सत्यापित हो गई!' :'UPI ID verified successfully!'
      );
    }, 2000);
  };

  const handleBankDetailsSubmit = () => {
    if (!bankDetails.accountNumber || !bankDetails.ifscCode || !bankDetails.accountHolderName) {
      alert(currentLanguage === 'hi' ?'कृपया सभी आवश्यक फ़ील्ड भरें' :'Please fill all required fields'
      );
      return;
    }

    localStorage.setItem('creatorBankDetails', JSON.stringify(bankDetails));
    setShowBankDetails(false);
    alert(currentLanguage === 'hi' ?'बैंक विवरण सफलतापूर्वक सहेजे गए!' :'Bank details saved successfully!'
    );
  };

  const payoutMethods = [
    {
      id: 'upi',
      name: currentLanguage === 'hi' ? 'UPI भुगतान' : 'UPI Payment',
      description: currentLanguage === 'hi' ?'तत्काल भुगतान प्राप्त करें' :'Receive instant payments',
      icon: 'Smartphone',
      isActive: isVerified,
      processingTime: currentLanguage === 'hi' ? 'तत्काल' : 'Instant'
    },
    {
      id: 'bank',
      name: currentLanguage === 'hi' ? 'बैंक ट्रांसफर' : 'Bank Transfer',
      description: currentLanguage === 'hi' ?'सीधे बैंक खाते में भुगतान' :'Direct bank account transfer',
      icon: 'Building2',
      isActive: false,
      processingTime: currentLanguage === 'hi' ? '1-2 दिन' : '1-2 days'
    }
  ];

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center">
          <Icon name="CreditCard" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">
            {currentLanguage === 'hi' ? 'भुगतान सेटअप' : 'Payout Setup'}
          </h2>
          <p className="text-sm text-text-secondary">
            {currentLanguage === 'hi' ?'अपनी कमाई प्राप्त करने के लिए भुगतान विधि सेट करें' :'Set up payment method to receive your earnings'
            }
          </p>
        </div>
      </div>

      {/* Payout Methods */}
      <div className="space-y-4 mb-6">
        {payoutMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 spring-transition ${
              method.isActive 
                ? 'border-success bg-success-50' :'border-border hover:border-primary'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={method.icon} 
                  size={20} 
                  className={method.isActive ? 'text-success' : 'text-text-secondary'}
                />
                <div>
                  <h3 className="font-medium text-text-primary">{method.name}</h3>
                  <p className="text-sm text-text-secondary">{method.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xs px-2 py-1 rounded-full ${
                  method.isActive 
                    ? 'bg-success text-success-foreground' 
                    : 'bg-background-secondary text-text-secondary'
                }`}>
                  {method.processingTime}
                </div>
                {method.isActive && (
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span className="text-xs text-success font-medium">
                      {currentLanguage === 'hi' ? 'सक्रिय' : 'Active'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* UPI Setup */}
      {!isVerified && (
        <div className="border border-border rounded-lg p-4 mb-4">
          <h3 className="font-medium text-text-primary mb-3">
            {currentLanguage === 'hi' ? 'UPI ID सेटअप' : 'UPI ID Setup'}
          </h3>
          <div className="flex space-x-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder={currentLanguage === 'hi' ? 'yourname@paytm' : 'yourname@paytm'}
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full"
              />
            </div>
            <Button
              variant="primary"
              onClick={handleVerifyUpi}
              loading={isVerifying}
              iconName="Shield"
              iconPosition="left"
            >
              {currentLanguage === 'hi' ? 'सत्यापित करें' : 'Verify'}
            </Button>
          </div>
          <p className="text-xs text-text-secondary mt-2">
            {currentLanguage === 'hi' ?'उदाहरण: yourname@paytm, yourname@phonepe, yourname@googlepay' :'Example: yourname@paytm, yourname@phonepe, yourname@googlepay'
            }
          </p>
        </div>
      )}

      {/* Verified UPI Display */}
      {isVerified && (
        <div className="border border-success bg-success-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <div>
                <h3 className="font-medium text-success">
                  {currentLanguage === 'hi' ? 'UPI ID सत्यापित' : 'UPI ID Verified'}
                </h3>
                <p className="text-sm text-success opacity-80">{upiId}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setIsVerified(false);
                setUpiId('');
                localStorage.removeItem('creatorUpiId');
              }}
              iconName="Edit"
              iconPosition="left"
            >
              {currentLanguage === 'hi' ? 'बदलें' : 'Change'}
            </Button>
          </div>
        </div>
      )}

      {/* Bank Details Option */}
      <div className="border-t border-border pt-4">
        <Button
          variant="ghost"
          onClick={() => setShowBankDetails(!showBankDetails)}
          iconName={showBankDetails ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right"
          fullWidth
          className="justify-between"
        >
          {currentLanguage === 'hi' ? 'बैंक विवरण जोड़ें (वैकल्पिक)' : 'Add Bank Details (Optional)'}
        </Button>

        {showBankDetails && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder={currentLanguage === 'hi' ? 'खाता संख्या' : 'Account Number'}
                value={bankDetails.accountNumber}
                onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
              />
              <Input
                type="text"
                placeholder={currentLanguage === 'hi' ? 'IFSC कोड' : 'IFSC Code'}
                value={bankDetails.ifscCode}
                onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value})}
              />
              <Input
                type="text"
                placeholder={currentLanguage === 'hi' ? 'खाताधारक का नाम' : 'Account Holder Name'}
                value={bankDetails.accountHolderName}
                onChange={(e) => setBankDetails({...bankDetails, accountHolderName: e.target.value})}
              />
              <Input
                type="text"
                placeholder={currentLanguage === 'hi' ? 'बैंक का नाम' : 'Bank Name'}
                value={bankDetails.bankName}
                onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
              />
            </div>
            <div className="flex space-x-3">
              <Button
                variant="primary"
                onClick={handleBankDetailsSubmit}
                iconName="Save"
                iconPosition="left"
              >
                {currentLanguage === 'hi' ? 'सहेजें' : 'Save Details'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowBankDetails(false)}
              >
                {currentLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpiSetup;