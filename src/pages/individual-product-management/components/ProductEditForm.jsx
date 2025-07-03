import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProductEditForm = ({ product, onSave, onCancel, currentLanguage }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 49,
    status: 'active'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price || 49,
        status: product.status || 'active'
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = currentLanguage === 'hi' ? 'शीर्षक आवश्यक है' : 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = currentLanguage === 'hi' ? 'शीर्षक कम से कम 3 अक्षर का होना चाहिए' : 'Title must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = currentLanguage === 'hi' ? 'विवरण आवश्यक है' : 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = currentLanguage === 'hi' ? 'विवरण कम से कम 10 अक्षर का होना चाहिए' : 'Description must be at least 10 characters';
    }

    if (formData.price < 49) {
      newErrors.price = currentLanguage === 'hi' ? 'न्यूनतम मूल्य ₹49 है' : 'Minimum price is ₹49';
    } else if (formData.price > 100000) {
      newErrors.price = currentLanguage === 'hi' ? 'अधिकतम मूल्य ₹1,00,000 है' : 'Maximum price is ₹1,00,000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedProduct = {
        ...product,
        ...formData,
        updatedAt: new Date().toLocaleDateString('en-IN')
      };
      
      onSave(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const pricingSuggestions = [
    { label: currentLanguage === 'hi' ? 'बेसिक' : 'Basic', value: 49 },
    { label: currentLanguage === 'hi' ? 'स्टैंडर्ड' : 'Standard', value: 99 },
    { label: currentLanguage === 'hi' ? 'प्रीमियम' : 'Premium', value: 199 },
    { label: currentLanguage === 'hi' ? 'प्रो' : 'Pro', value: 499 }
  ];

  return (
    <div className="bg-surface rounded-xl border border-border shadow-md">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">
            {currentLanguage === 'hi' ? 'उत्पाद संपादित करें' : 'Edit Product'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-background-secondary rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {currentLanguage === 'hi' ? 'उत्पाद शीर्षक' : 'Product Title'}
            <span className="text-error-500 ml-1">*</span>
          </label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder={currentLanguage === 'hi' ? 'अपने उत्पाद का शीर्षक दर्ज करें' : 'Enter your product title'}
            className={errors.title ? 'border-error-500 focus:ring-error-500' : ''}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-error-500 flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.title}
            </p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {currentLanguage === 'hi' ? 'उत्पाद विवरण' : 'Product Description'}
            <span className="text-error-500 ml-1">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder={currentLanguage === 'hi' ? 'अपने उत्पाद का विस्तृत विवरण दें' : 'Provide detailed description of your product'}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
              errors.description ? 'border-error-500 focus:ring-error-500' : 'border-border'
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-error-500 flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.description}
            </p>
          )}
        </div>

        {/* Price Field */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {currentLanguage === 'hi' ? 'मूल्य (₹)' : 'Price (₹)'}
            <span className="text-error-500 ml-1">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-text-secondary">₹</span>
            </div>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
              min="49"
              max="100000"
              className={`pl-8 ${errors.price ? 'border-error-500 focus:ring-error-500' : ''}`}
            />
          </div>
          {errors.price && (
            <p className="mt-1 text-sm text-error-500 flex items-center">
              <Icon name="AlertCircle" size={14} className="mr-1" />
              {errors.price}
            </p>
          )}
          
          {/* Price Preview */}
          <div className="mt-2 text-sm text-text-secondary">
            {currentLanguage === 'hi' ? 'पूर्वावलोकन:' : 'Preview:'} {formatPrice(formData.price)}
          </div>
        </div>

        {/* Pricing Suggestions */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {currentLanguage === 'hi' ? 'सुझावित मूल्य' : 'Suggested Pricing'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {pricingSuggestions.map((suggestion) => (
              <button
                key={suggestion.value}
                type="button"
                onClick={() => handleInputChange('price', suggestion.value)}
                className={`p-2 text-xs font-medium rounded-lg border transition-colors duration-200 ${
                  formData.price === suggestion.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-surface text-text-secondary border-border hover:border-primary hover:text-primary'
                }`}
              >
                <div>{suggestion.label}</div>
                <div className="font-bold">{formatPrice(suggestion.value)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Status Field */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {currentLanguage === 'hi' ? 'स्थिति' : 'Status'}
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="active"
                checked={formData.status === 'active'}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="mr-2 text-primary focus:ring-primary"
              />
              <span className="text-sm text-text-primary">
                {currentLanguage === 'hi' ? 'सक्रिय' : 'Active'}
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={formData.status === 'inactive'}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="mr-2 text-primary focus:ring-primary"
              />
              <span className="text-sm text-text-primary">
                {currentLanguage === 'hi' ? 'निष्क्रिय' : 'Inactive'}
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            iconName="Save"
            iconPosition="left"
            className="flex-1"
          >
            {isLoading 
              ? (currentLanguage === 'hi' ? 'सहेजा जा रहा है...' : 'Saving...')
              : (currentLanguage === 'hi' ? 'परिवर्तन सहेजें' : 'Save Changes')
            }
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            iconName="X"
            iconPosition="left"
            className="flex-1 sm:flex-none"
          >
            {currentLanguage === 'hi' ? 'रद्द करें' : 'Cancel'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductEditForm;