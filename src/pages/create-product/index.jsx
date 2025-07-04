import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import MobileNavigation from '../../components/ui/MobileNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CreateProductPage = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);

    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  const categories = [
    { value: 'course', label: currentLanguage === 'hi' ? 'कोर्स' : 'Course' },
    { value: 'ebook', label: currentLanguage === 'hi' ? 'ई-बुक' : 'E-book' },
    { value: 'template', label: currentLanguage === 'hi' ? 'टेम्प्लेट' : 'Template' },
    { value: 'design', label: currentLanguage === 'hi' ? 'डिज़ाइन' : 'Design' },
    { value: 'software', label: currentLanguage === 'hi' ? 'सॉफ्टवेयर' : 'Software' },
    { value: 'other', label: currentLanguage === 'hi' ? 'अन्य' : 'Other' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = currentLanguage === 'hi' ? 'शीर्षक आवश्यक है' : 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = currentLanguage === 'hi' ? 'विवरण आवश्यक है' : 'Description is required';
    }

    if (!formData.price || formData.price < 49) {
      newErrors.price = currentLanguage === 'hi' ? 'न्यूनतम मूल्य ₹49 है' : 'Minimum price is ₹49';
    }

    if (!formData.category) {
      newErrors.category = currentLanguage === 'hi' ? 'श्रेणी चुनें' : 'Select a category';
    }

    if (!selectedFile) {
      newErrors.file = currentLanguage === 'hi' ? 'फ़ाइल अपलोड करें' : 'Upload a file';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (errors.file) {
        setErrors(prev => ({ ...prev, file: '' }));
      }
    }
  };

  const handleThumbnailSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const productId = Math.random().toString(36).substr(2, 9);
      const newProduct = {
        id: productId,
        ...formData,
        file: selectedFile,
        thumbnail: thumbnail,
        createdAt: new Date().toISOString(),
        status: 'active'
      };

      // Save to localStorage (mock database)
      const existingProducts = JSON.parse(localStorage.getItem('userProducts') || '[]');
      existingProducts.push(newProduct);
      localStorage.setItem('userProducts', JSON.stringify(existingProducts));

      navigate('/creator-dashboard');
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const content = {
    en: {
      title: "Create New Product",
      subtitle: "Upload your digital product and start selling",
      productTitle: "Product Title",
      description: "Description",
      price: "Price (₹)",
      category: "Category",
      file: "Product File",
      thumbnail: "Thumbnail Image (Optional)",
      create: "Create Product",
      fileTypes: "Supported: PDF, MP4, ZIP (Max 100MB)",
      imageTypes: "Supported: JPG, PNG (Max 5MB)"
    },
    hi: {
      title: "नया उत्पाद बनाएं",
      subtitle: "अपना डिजिटल उत्पाद अपलोड करें और बेचना शुरू करें",
      productTitle: "उत्पाद शीर्षक",
      description: "विवरण",
      price: "मूल्य (₹)",
      category: "श्रेणी",
      file: "उत्पाद फ़ाइल",
      thumbnail: "थंबनेल इमेज (वैकल्पिक)",
      create: "उत्पाद बनाएं",
      fileTypes: "समर्थित: PDF, MP4, ZIP (अधिकतम 100MB)",
      imageTypes: "समर्थित: JPG, PNG (अधिकतम 5MB)"
    }
  };

  const text = content[currentLanguage] || content.en;

  return (
    <>
      <Helmet>
        <title>{text.title} - CreatorBazaar</title>
        <meta name="description" content={text.subtitle} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-20 md:pb-8">
          <div className="container-responsive">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-primary mb-2">{text.title}</h1>
                  <p className="text-text-secondary">{text.subtitle}</p>
                </div>

                {/* Form */}
                <div className="bg-surface rounded-2xl shadow-lg border border-border p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Product Title */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {text.productTitle} *
                      </label>
                      <Input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder={currentLanguage === 'hi' ? 'अपने उत्पाद का शीर्षक' : 'Your product title'}
                        className={errors.title ? 'border-error focus:ring-error' : ''}
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-error flex items-center space-x-1">
                          <Icon name="AlertCircle" size={14} />
                          <span>{errors.title}</span>
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {text.description} *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder={currentLanguage === 'hi' ? 'अपने उत्पाद का विस्तृत विवरण' : 'Detailed description of your product'}
                        rows={4}
                        className={`w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 transition-all duration-200 ${
                          errors.description 
                            ? 'border-error focus:ring-error' 
                            : 'border-border focus:ring-primary focus:border-primary'
                        }`}
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-error flex items-center space-x-1">
                          <Icon name="AlertCircle" size={14} />
                          <span>{errors.description}</span>
                        </p>
                      )}
                    </div>

                    {/* Price and Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          {text.price} *
                        </label>
                        <Input
                          type="number"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', parseInt(e.target.value) || '')}
                          placeholder="49"
                          min="49"
                          className={errors.price ? 'border-error focus:ring-error' : ''}
                        />
                        {errors.price && (
                          <p className="mt-1 text-sm text-error flex items-center space-x-1">
                            <Icon name="AlertCircle" size={14} />
                            <span>{errors.price}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          {text.category} *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => handleInputChange('category', e.target.value)}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                            errors.category 
                              ? 'border-error focus:ring-error' 
                              : 'border-border focus:ring-primary focus:border-primary'
                          }`}
                        >
                          <option value="">{currentLanguage === 'hi' ? 'श्रेणी चुनें' : 'Select category'}</option>
                          {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                              {category.label}
                            </option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="mt-1 text-sm text-error flex items-center space-x-1">
                            <Icon name="AlertCircle" size={14} />
                            <span>{errors.category}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {text.file} *
                      </label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors duration-200">
                        <Icon name="Upload" size={32} className="text-text-secondary mx-auto mb-2" />
                        <p className="text-text-secondary mb-2">
                          {currentLanguage === 'hi' ? 'फ़ाइल चुनें या यहाँ खींचें' : 'Choose file or drag here'}
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.mp4,.zip"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary-600 transition-colors duration-200"
                        >
                          <Icon name="FolderOpen" size={16} className="mr-2" />
                          {currentLanguage === 'hi' ? 'फ़ाइल चुनें' : 'Choose File'}
                        </label>
                        <p className="text-xs text-text-tertiary mt-2">{text.fileTypes}</p>
                      </div>
                      {selectedFile && (
                        <div className="mt-2 p-3 bg-primary-50 rounded-lg">
                          <p className="text-sm text-primary font-medium">{selectedFile.name}</p>
                          <p className="text-xs text-text-secondary">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      )}
                      {errors.file && (
                        <p className="mt-1 text-sm text-error flex items-center space-x-1">
                          <Icon name="AlertCircle" size={14} />
                          <span>{errors.file}</span>
                        </p>
                      )}
                    </div>

                    {/* Thumbnail Upload */}
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        {text.thumbnail}
                      </label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors duration-200">
                        <Icon name="Image" size={24} className="text-text-secondary mx-auto mb-2" />
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={handleThumbnailSelect}
                          className="hidden"
                          id="thumbnail-upload"
                        />
                        <label
                          htmlFor="thumbnail-upload"
                          className="inline-flex items-center px-3 py-2 bg-secondary text-white rounded-lg cursor-pointer hover:bg-secondary-600 transition-colors duration-200 text-sm"
                        >
                          <Icon name="Camera" size={14} className="mr-2" />
                          {currentLanguage === 'hi' ? 'इमेज चुनें' : 'Choose Image'}
                        </label>
                        <p className="text-xs text-text-tertiary mt-1">{text.imageTypes}</p>
                      </div>
                      {thumbnail && (
                        <div className="mt-2 p-3 bg-secondary-50 rounded-lg">
                          <p className="text-sm text-secondary font-medium">{thumbnail.name}</p>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <Button
                        type="submit"
                        variant="primary"
                        loading={isLoading}
                        fullWidth
                        className="py-4 text-lg font-semibold"
                        iconName="Rocket"
                        iconPosition="left"
                      >
                        {text.create}
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        <MobileNavigation />
      </div>
    </>
  );
};

export default CreateProductPage;