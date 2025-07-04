import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import ProgressIndicator from './components/ProgressIndicator';
import FileUploadZone from './components/FileUploadZone';
import ProductDetailsForm from './components/ProductDetailsForm';
import SuccessModal from './components/SuccessModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductUpload = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdProduct, setCreatedProduct] = useState(null);
  const [showAuthBanner, setShowAuthBanner] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);

    // Check authentication status
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    setShowAuthBanner(!isAuthenticated);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    if (file) {
      setCurrentStep(2);
      // Auto-suggest title based on filename
      if (!formData.title) {
        const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
        setFormData(prev => ({ ...prev, title: fileName }));
      }
    } else {
      setCurrentStep(1);
    }
  };

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  const generateProductId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleProductSubmit = async () => {
    // Check authentication before saving
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/authentication-modal', { 
        state: { from: '/product-upload', productData: { formData, selectedFile } }
      });
      return;
    }

    setIsLoading(true);
    setCurrentStep(3);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const productId = generateProductId();
      const newProduct = {
        id: productId,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        file: {
          name: selectedFile.name,
          type: selectedFile.type,
          size: selectedFile.size
        },
        createdAt: new Date().toISOString(),
        views: 0,
        sales: 0,
        revenue: 0,
        status: 'active'
      };

      // Save to localStorage (mock database)
      const existingProducts = JSON.parse(localStorage.getItem('userProducts') || '[]');
      existingProducts.push(newProduct);
      localStorage.setItem('userProducts', JSON.stringify(existingProducts));

      setCreatedProduct(newProduct);
      setShowSuccessModal(true);

    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Reset form
    setSelectedFile(null);
    setFormData({ title: '', description: '', price: '' });
    setCurrentStep(1);
  };

  const handleAuthLogin = () => {
    navigate('/authentication-modal', { 
      state: { from: '/product-upload' }
    });
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FileUploadZone
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            currentLanguage={currentLanguage}
          />
        );
      case 2:
        return (
          <ProductDetailsForm
            formData={formData}
            onFormChange={handleFormChange}
            onSubmit={handleProductSubmit}
            isLoading={isLoading}
            currentLanguage={currentLanguage}
            selectedFile={selectedFile}
          />
        );
      case 3:
        return (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-primary mb-2">
              {currentLanguage === 'hi' ? 'आपका उत्पाद बनाया जा रहा है...' : 'Creating your product...'}
            </h3>
            <p className="text-text-secondary">
              {currentLanguage === 'hi' ? 'कृपया प्रतीक्षा करें, यह कुछ सेकंड में पूरा हो जाएगा' : 'Please wait, this will be completed in a few seconds'}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      
      {/* Authentication Banner */}
      {showAuthBanner && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-highlight to-warning text-black px-4 py-3 text-center relative"
        >
          <div className="container-responsive flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={20} />
              <span className="font-medium">
                {currentLanguage === 'hi' 
                  ? 'अपने उत्पाद को सहेजने और प्रकाशित करने के लिए लॉग इन करें'
                  : 'Login to save and publish your product'
                }
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAuthLogin}
              className="border-black text-black hover:bg-black hover:text-white"
            >
              {currentLanguage === 'hi' ? 'लॉग इन करें' : 'Login'}
            </Button>
          </div>
        </motion.div>
      )}
      
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto container-responsive">
          {/* Page Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                {currentLanguage === 'hi' ? 'अपना डिजिटल उत्पाद अपलोड करें' : 'Upload Your Digital Product'}
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                {currentLanguage === 'hi' 
                  ? 'तीन आसान चरणों में अपना डिजिटल उत्पाद बनाएं और तुरंत बेचना शुरू करें'
                  : 'Create your digital product in three easy steps and start selling instantly'
                }
              </p>
            </motion.div>
          </div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ProgressIndicator 
              currentStep={currentStep} 
              totalSteps={3} 
              currentLanguage={currentLanguage}
            />
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Left Column - File Upload or Loading */}
            <div className="space-y-6">
              {currentStep === 1 || currentStep === 3 ? (
                getStepContent()
              ) : (
                <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
                    <Icon name="FileCheck" size={20} />
                    <span>
                      {currentLanguage === 'hi' ? 'चयनित फ़ाइल' : 'Selected File'}
                    </span>
                  </h3>
                  <FileUploadZone
                    onFileSelect={handleFileSelect}
                    selectedFile={selectedFile}
                    currentLanguage={currentLanguage}
                  />
                </div>
              )}
            </div>

            {/* Right Column - Form or Tips */}
            <div className="space-y-6">
              {currentStep === 2 ? (
                getStepContent()
              ) : (
                <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl border border-primary-200 p-6">
                  <h3 className="text-lg font-semibold text-primary mb-4 flex items-center space-x-2">
                    <Icon name="Lightbulb" size={20} />
                    <span>
                      {currentLanguage === 'hi' ? 'सफलता के लिए टिप्स' : 'Tips for Success'}
                    </span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={14} color="white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">
                          {currentLanguage === 'hi' ? 'आकर्षक शीर्षक' : 'Catchy Title'}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {currentLanguage === 'hi' 
                            ? 'एक स्पष्ट और आकर्षक शीर्षक चुनें जो आपके उत्पाद को बेहतर तरीके से दर्शाता हो'
                            : 'Choose a clear and catchy title that best represents your product'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={14} color="white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">
                          {currentLanguage === 'hi' ? 'विस्तृत विवरण' : 'Detailed Description'}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {currentLanguage === 'hi' 
                            ? 'अपने उत्पाद के बारे में विस्तार से बताएं कि यह क्या है और कैसे उपयोगी है'
                            : 'Describe your product in detail, what it is and how it can be useful'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={14} color="white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">
                          {currentLanguage === 'hi' ? 'सही मूल्य' : 'Right Pricing'}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {currentLanguage === 'hi' 
                            ? 'प्रतिस्पर्धी मूल्य रखें जो आपके उत्पाद की गुणवत्ता को दर्शाता हो'
                            : 'Set competitive pricing that reflects the quality of your product'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Upload Once, Sell Forever Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-full text-white font-semibold shadow-lg">
              <Icon name="Infinity" size={20} />
              <span>
                {currentLanguage === 'hi' ? 'एक बार अपलोड करें। हमेशा के लिए बेचें।' : 'Upload Once. Sell Forever.'}
              </span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        productData={createdProduct}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default ProductUpload;