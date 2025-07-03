import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ProductDetailsForm = ({ 
  formData, 
  onFormChange, 
  onSubmit, 
  isLoading, 
  currentLanguage,
  selectedFile 
}) => {
  const [errors, setErrors] = useState({});
  const [showSuggestions, setShowSuggestions] = useState(false);

  const pricingSuggestions = {
    'application/pdf': [199, 299, 499],
    'video/mp4': [499, 799, 1299],
    'application/zip': [299, 599, 999],
    'application/x-zip-compressed': [299, 599, 999]
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = currentLanguage === 'hi' ?'शीर्षक आवश्यक है' :'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = currentLanguage === 'hi' ?'शीर्षक कम से कम 3 अक्षर का होना चाहिए' :'Title must be at least 3 characters';
    } else if (formData.title.length > 100) {
      newErrors.title = currentLanguage === 'hi' ?'शीर्षक 100 अक्षरों से अधिक नहीं हो सकता' :'Title cannot exceed 100 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = currentLanguage === 'hi' ?'विवरण आवश्यक है' :'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = currentLanguage === 'hi' ?'विवरण कम से कम 10 अक्षर का होना चाहिए' :'Description must be at least 10 characters';
    } else if (formData.description.length > 500) {
      newErrors.description = currentLanguage === 'hi' ?'विवरण 500 अक्षरों से अधिक नहीं हो सकता' :'Description cannot exceed 500 characters';
    }

    if (!formData.price || formData.price < 49) {
      newErrors.price = currentLanguage === 'hi' ?'न्यूनतम मूल्य ₹49 है' :'Minimum price is ₹49';
    } else if (formData.price > 99999) {
      newErrors.price = currentLanguage === 'hi' ?'अधिकतम मूल्य ₹99,999 है' :'Maximum price is ₹99,999';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  const handleInputChange = (field, value) => {
    onFormChange({ ...formData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handlePriceSuggestion = (price) => {
    handleInputChange('price', price);
    setShowSuggestions(false);
  };

  const getSuggestedPrices = () => {
    if (!selectedFile) return [];
    return pricingSuggestions[selectedFile.type] || [];
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  useEffect(() => {
    if (selectedFile && !formData.price) {
      const suggestions = getSuggestedPrices();
      if (suggestions.length > 0) {
        setShowSuggestions(true);
      }
    }
  }, [selectedFile]);

  return (
    <div className="w-full space-y-6">
      <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-primary mb-6 flex items-center space-x-2">
          <Icon name="FileText" size={24} />
          <span>
            {currentLanguage === 'hi' ? 'उत्पाद विवरण' : 'Product Details'}
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              {currentLanguage === 'hi' ? 'उत्पाद शीर्षक' : 'Product Title'}
              <span className="text-error ml-1">*</span>
            </label>
            <Input
              type="text"
              placeholder={currentLanguage === 'hi' ?'अपने उत्पाद का आकर्षक शीर्षक दें' :'Give your product a catchy title'
              }
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={errors.title ? 'border-error focus:ring-error' : ''}
            />
            <div className="flex justify-between items-center">
              {errors.title && (
                <p className="text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={16} />
                  <span>{errors.title}</span>
                </p>
              )}
              <p className={`text-xs ml-auto ${
                formData.title.length > 80 ? 'text-warning' : 'text-text-tertiary'
              }`}>
                {formData.title.length}/100
              </p>
            </div>
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              {currentLanguage === 'hi' ? 'उत्पाद विवरण' : 'Product Description'}
              <span className="text-error ml-1">*</span>
            </label>
            <textarea
              placeholder={currentLanguage === 'hi' ?'अपने उत्पाद के बारे में विस्तार से बताएं...' :'Describe your product in detail...'
              }
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 transition-all duration-200 ${
                errors.description 
                  ? 'border-error focus:ring-error' :'border-border focus:ring-primary focus:border-primary'
              }`}
            />
            <div className="flex justify-between items-center">
              {errors.description && (
                <p className="text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={16} />
                  <span>{errors.description}</span>
                </p>
              )}
              <p className={`text-xs ml-auto ${
                formData.description.length > 400 ? 'text-warning' : 'text-text-tertiary'
              }`}>
                {formData.description.length}/500
              </p>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-text-primary">
              {currentLanguage === 'hi' ? 'मूल्य निर्धारण' : 'Pricing'}
              <span className="text-error ml-1">*</span>
            </label>

            {/* Price Suggestions */}
            {showSuggestions && getSuggestedPrices().length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-text-secondary">
                  {currentLanguage === 'hi' ?'सुझाए गए मूल्य:' :'Suggested prices:'
                  }
                </p>
                <div className="flex flex-wrap gap-2">
                  {getSuggestedPrices().map((price) => (
                    <button
                      key={price}
                      type="button"
                      onClick={() => handlePriceSuggestion(price)}
                      className="px-4 py-2 bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 rounded-lg text-sm font-medium text-primary hover:from-primary-100 hover:to-accent-100 hover:shadow-md transition-all duration-200 spring-transition"
                    >
                      {formatPrice(price)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Input */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                ₹
              </div>
              <Input
                type="number"
                placeholder="49"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseInt(e.target.value) || '')}
                min="49"
                max="99999"
                className={`pl-8 ${errors.price ? 'border-error focus:ring-error' : ''}`}
              />
            </div>
            {errors.price && (
              <p className="text-sm text-error flex items-center space-x-1">
                <Icon name="AlertCircle" size={16} />
                <span>{errors.price}</span>
              </p>
            )}
            <p className="text-xs text-text-tertiary">
              {currentLanguage === 'hi' ?'न्यूनतम मूल्य ₹49 है। बेहतर बिक्री के लिए प्रतिस्पर्धी मूल्य रखें।' :'Minimum price is ₹49. Keep competitive pricing for better sales.'
              }
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              loading={isLoading}
              iconName="Rocket"
              iconPosition="left"
              fullWidth
              className="h-12 text-lg font-semibold spring-transition glow-effect"
            >
              {isLoading 
                ? (currentLanguage === 'hi' ? 'उत्पाद बनाया जा रहा है...' : 'Creating Product...')
                : (currentLanguage === 'hi' ? 'उत्पाद बनाएं' : 'Create Product')
              }
            </Button>
          </div>
        </form>
      </div>

      {/* Beta Platform Fee Notice */}
      <div className="bg-gradient-to-r from-warning-50 to-accent-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-warning to-accent rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Zap" size={16} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="font-semibold text-warning-700 mb-1">
              {currentLanguage === 'hi' ? 'बीटा ऑफर!' : 'Beta Offer!'}
            </h4>
            <p className="text-sm text-warning-600">
              {currentLanguage === 'hi' ?'बीटा अवधि के दौरान 0% प्लेटफॉर्म फीस। आपकी पूरी कमाई आपकी!' :'0% platform fee during beta period. Keep 100% of your earnings!'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsForm;