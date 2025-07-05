import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProductPreview from './components/ProductPreview';
import ProductEditForm from './components/ProductEditForm';
import ProductAnalytics from './components/ProductAnalytics';
import FileManagement from './components/FileManagement';
import ShareableLinks from './components/ShareableLinks';
import ActionButtons from './components/ActionButtons';

const IndividualProductManagement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');
  
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Mock product data
  const mockProduct = {
    id: productId || 'prod_123',
    title: "Complete Digital Marketing Course 2024",
    description: `Master digital marketing with this comprehensive course covering SEO, social media marketing, content strategy, and paid advertising.\n\nWhat you'll learn:\n• SEO fundamentals and advanced techniques\n• Social media marketing strategies\n• Content creation and marketing\n• Google Ads and Facebook Ads\n• Email marketing automation\n• Analytics and performance tracking`,
    price: 1999,
    status: 'active',fileName: 'digital_marketing_course_2024.pdf',fileType: 'pdf',
    fileSize: 15728640, // 15MB
    uploadDate: '15/11/2024',updatedAt: '20/11/2024',totalViews: 2847,totalSales: 156,totalRevenue: 311844,linkClicks: 1523,uniqueVisitors: 1247,previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);

    // Simulate loading product data
    setTimeout(() => {
      setProduct(mockProduct);
      setIsLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, [productId]);

  const handleSaveProduct = (updatedProduct) => {
    setProduct(updatedProduct);
    setIsEditing(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleDeleteProduct = (deletedProductId) => {
    // Navigate back to dashboard after deletion
    navigate('/dashboard');
  };

  const handleFileReplace = (newFileData) => {
    setProduct(prev => ({
      ...prev,
      ...newFileData,
      updatedAt: new Date().toLocaleDateString('en-IN')
    }));
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const tabs = [
    {
      id: 'overview',
      label: currentLanguage === 'hi' ? 'अवलोकन' : 'Overview',
      icon: 'LayoutDashboard'
    },
    {
      id: 'analytics',
      label: currentLanguage === 'hi' ? 'एनालिटिक्स' : 'Analytics',
      icon: 'BarChart3'
    },
    {
      id: 'files',
      label: currentLanguage === 'hi' ? 'फ़ाइलें' : 'Files',
      icon: 'FolderOpen'
    },
    {
      id: 'sharing',
      label: currentLanguage === 'hi' ? 'साझाकरण' : 'Sharing',
      icon: 'Share2'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-border rounded-lg w-1/3"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-96 bg-border rounded-xl"></div>
                  <div className="h-64 bg-border rounded-xl"></div>
                </div>
                <div className="space-y-6">
                  <div className="h-64 bg-border rounded-xl"></div>
                  <div className="h-48 bg-border rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <Icon name="AlertCircle" size={48} className="text-error-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                {currentLanguage === 'hi' ? 'उत्पाद नहीं मिला' : 'Product Not Found'}
              </h2>
              <p className="text-text-secondary mb-6">
                {currentLanguage === 'hi' ?'यह उत्पाद मौजूद नहीं है या हटा दिया गया है।' :'This product does not exist or has been removed.'
                }
              </p>
              <Button
                variant="primary"
                iconName="ArrowLeft"
                iconPosition="left"
                onClick={() => navigate('/creator-dashboard')}
              >
                {currentLanguage === 'hi' ? 'डैशबोर्ड पर वापस जाएं' : 'Back to Dashboard'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-20 right-4 z-50 bg-success-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-down">
          <Icon name="CheckCircle" size={20} />
          <span className="font-medium">
            {currentLanguage === 'hi' ? 'सफलतापूर्वक सहेजा गया!' : 'Successfully saved!'}
          </span>
        </div>
      )}

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <button
                onClick={() => navigate('/creator-dashboard')}
                className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
              >
                <Icon name="ArrowLeft" size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  {currentLanguage === 'hi' ? 'उत्पाद प्रबंधन' : 'Product Management'}
                </h1>
                <p className="text-text-secondary">
                  {currentLanguage === 'hi' ? 'अपने उत्पाद को संपादित और प्रबंधित करें' : 'Edit and manage your product'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant={isEditing ? "outline" : "primary"}
                iconName={isEditing ? "X" : "Edit"}
                iconPosition="left"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing 
                  ? (currentLanguage === 'hi' ? 'रद्द करें' : 'Cancel')
                  : (currentLanguage === 'hi' ? 'संपादित करें' : 'Edit')
                }
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-primary hover:border-border'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {activeTab === 'overview' && (
                <>
                  {isEditing ? (
                    <ProductEditForm
                      product={product}
                      onSave={handleSaveProduct}
                      onCancel={() => setIsEditing(false)}
                      currentLanguage={currentLanguage}
                    />
                  ) : (
                    <ProductPreview
                      product={product}
                      currentLanguage={currentLanguage}
                    />
                  )}
                </>
              )}

              {activeTab === 'analytics' && (
                <ProductAnalytics
                  product={product}
                  currentLanguage={currentLanguage}
                />
              )}

              {activeTab === 'files' && (
                <FileManagement
                  product={product}
                  onFileReplace={handleFileReplace}
                  currentLanguage={currentLanguage}
                />
              )}

              {activeTab === 'sharing' && (
                <ShareableLinks
                  product={product}
                  currentLanguage={currentLanguage}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ActionButtons
                product={product}
                onDelete={handleDeleteProduct}
                onSave={handleSaveProduct}
                onPreview={() => window.open(`/product-detail-page?id=${product.id}`, '_blank')}
                currentLanguage={currentLanguage}
              />

              {/* Quick Stats Card */}
              <div className="bg-surface rounded-xl border border-border shadow-md p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  {currentLanguage === 'hi' ? 'त्वरित आंकड़े' : 'Quick Stats'}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">
                      {currentLanguage === 'hi' ? 'आज के व्यूज' : "Today's Views"}
                    </span>
                    <span className="font-semibold text-text-primary">47</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">
                      {currentLanguage === 'hi' ? 'इस सप्ताह की बिक्री' : 'This Week Sales'}
                    </span>
                    <span className="font-semibold text-text-primary">12</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">
                      {currentLanguage === 'hi' ? 'रूपांतरण दर' : 'Conversion Rate'}
                    </span>
                    <span className="font-semibold text-success-600">5.48%</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-sm text-text-secondary">
                      {currentLanguage === 'hi' ? 'अंतिम बिक्री' : 'Last Sale'}
                    </span>
                    <span className="font-semibold text-text-primary">2h ago</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-surface rounded-xl border border-border shadow-md p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">
                  {currentLanguage === 'hi' ? 'हाल की गतिविधि' : 'Recent Activity'}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-success-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">
                        {currentLanguage === 'hi' ? 'नई बिक्री' : 'New sale'}
                      </p>
                      <p className="text-xs text-text-secondary">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">
                        {currentLanguage === 'hi' ? 'उत्पाद अपडेट किया गया' : 'Product updated'}
                      </p>
                      <p className="text-xs text-text-secondary">1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-text-primary">
                        {currentLanguage === 'hi' ? 'लिंक साझा किया गया' : 'Link shared'}
                      </p>
                      <p className="text-xs text-text-secondary">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualProductManagement;