import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, currentLanguage }) => {
  const steps = [
    {
      id: 1,
      label: currentLanguage === 'hi' ? 'फ़ाइल अपलोड' : 'Upload File',
      icon: 'Upload'
    },
    {
      id: 2,
      label: currentLanguage === 'hi' ? 'उत्पाद विवरण' : 'Product Details',
      icon: 'FileText'
    },
    {
      id: 3,
      label: currentLanguage === 'hi' ? 'मूल्य निर्धारण' : 'Pricing',
      icon: 'IndianRupee'
    }
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-border z-0">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {/* Step Indicators */}
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative z-10">
            <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 spring-transition ${
                currentStep >= step.id
                  ? 'bg-gradient-to-br from-primary to-accent border-primary text-white shadow-lg'
                  : 'bg-surface border-border text-text-secondary'
              }`}
            >
              {currentStep > step.id ? (
                <Icon name="Check" size={20} strokeWidth={2.5} />
              ) : (
                <Icon name={step.icon} size={20} strokeWidth={2} />
              )}
            </div>
            <span 
              className={`mt-2 text-xs font-medium text-center transition-colors duration-200 ${
                currentStep >= step.id ? 'text-primary' : 'text-text-secondary'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;