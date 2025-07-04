import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import DashboardCards from './components/DashboardCards';
import EarningsSummary from './components/EarningsSummary';
import ProductCard from './components/ProductCard';
import UpiSetup from './components/UpiSetup';
import AnalyticsChart from './components/AnalyticsChart';
import QuickActions from './components/QuickActions';

const CreatorDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      navigate('/authentication-modal');
    }
  }, [navigate]);

  // Mock products data - removed fake products for beta
  const mockProducts = [];

  // Filter and sort products
  const filteredProducts = mockProducts
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'revenue':
          return b.revenue - a.revenue;
        case 'sales':
          return b.sales - a.sales;
        case 'views':
          return b.views - a.views;
        case 'price-high':
          return b.price - a.price;
        case 'price-low':
          return a.price - b.price;
        default:
          return 0;
      }
    });

  const handleProductEdit = (product) => {
    navigate('/individual-product-management', { state: { editProduct: product } });
  };

  const handleProductDelete = (product) => {
    if (window.confirm(currentLanguage === 'hi' 
      ? `क्या आप वाकई "${product.title}" को हटाना चाहते हैं?`
      : `Are you sure you want to delete "${product.title}"?`
    )) {
      alert(currentLanguage === 'hi' ? 'उत्पाद सफलतापूर्वक हटा दिया गया!' : 'Product deleted successfully!');
    }
  };

  const handleToggleStatus = (product) => {
    const newStatus = product.status === 'active' ? 'inactive' : 'active';
    alert(currentLanguage === 'hi' 
      ? `उत्पाद स्थिति "${newStatus}" में बदल दी गई!`
      : `Product status changed to "${newStatus}"!`
    );
  };

  const handleCopyLink = (product) => {
    const productUrl = `${window.location.origin}/p/${product.id}`;
    navigator.clipboard.writeText(productUrl);
    alert(currentLanguage === 'hi' ? 'उत्पाद लिंक कॉपी हो गया!' : 'Product link copied!');
  };

  const statusOptions = [
    { value: 'all', label: currentLanguage === 'hi' ? 'सभी' : 'All' },
    { value: 'active', label: currentLanguage === 'hi' ? 'सक्रिय' : 'Active' },
    { value: 'draft', label: currentLanguage === 'hi' ? 'मसौदा' : 'Draft' },
    { value: 'inactive', label: currentLanguage === 'hi' ? 'निष्क्रिय' : 'Inactive' }
  ];

  const sortOptions = [
    { value: 'recent', label: currentLanguage === 'hi' ? 'नवीनतम' : 'Most Recent' },
    { value: 'revenue', label: currentLanguage === 'hi' ? 'सर्वाधिक आय' : 'Highest Revenue' },
    { value: 'sales', label: currentLanguage === 'hi' ? 'सर्वाधिक बिक्री' : 'Most Sales' },
    { value: 'views', label: currentLanguage === 'hi' ? 'सर्वाधिक व्यू' : 'Most Views' },
    { value: 'price-high', label: currentLanguage === 'hi' ? 'मूल्य: उच्च से निम्न' : 'Price: High to Low' },
    { value: 'price-low', label: currentLanguage === 'hi' ? 'मूल्य: निम्न से उच्च' : 'Price: Low to High' }
  ];

  const sidebarItems = [
    { icon: 'Home', label: currentLanguage === 'hi' ? 'होम' : 'Home', path: '/creator-dashboard', active: true },
    { icon: 'Package', label: currentLanguage === 'hi' ? 'उत्पाद' : 'Products', path: '/creator-dashboard' },
    { icon: 'Upload', label: currentLanguage === 'hi' ? 'अपलोड' : 'Upload', path: '/product-upload' },
    { icon: 'Users', label: currentLanguage === 'hi' ? 'सहयोगी' : 'Collaborators', path: '/collaborators' },
    { icon: 'Mail', label: currentLanguage === 'hi' ? 'ईमेल' : 'Emails', path: '/emails' },
    { icon: 'DollarSign', label: currentLanguage === 'hi' ? 'बिक्री' : 'Sales', path: '/sales' },
    { icon: 'BarChart3', label: currentLanguage === 'hi' ? 'एनालिटिक्स' : 'Analytics', path: '/analytics' },
    { icon: 'Settings', label: currentLanguage === 'hi' ? 'सेटिंग्स' : 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-dark-bg transition-colors duration-300">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <Header />
      </div>
      
      {/* Desktop Layout */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-primary-600">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-highlight rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-lg font-bold text-white">CreatorBazaar</div>
                <div className="text-xs text-white/60 -mt-1">
                  {currentLanguage === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-white/60 hover:text-white"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <nav className="mt-8 px-4">
            <div className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    item.active
                      ? 'bg-highlight text-black font-semibold'
                      : 'text-white/80 hover:text-white hover:bg-primary-600'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between h-16 px-8 bg-dark-surface border-b border-primary-600">
            <div>
              <h1 className="text-xl font-bold text-white">
                {currentLanguage === 'hi' ? 'क्रिएटर डैशबोर्ड' : 'Creator Dashboard'}
              </h1>
              <p className="text-white/60 text-sm">
                {currentLanguage === 'hi' ? 'अपने डिजिटल उत्पादों को प्रबंधित करें' : 'Manage your digital products'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="primary"
                onClick={() => navigate('/product-upload')}
                iconName="Plus"
                iconPosition="left"
                className="bg-highlight hover:bg-highlight-600 text-black"
              >
                {currentLanguage === 'hi' ? 'नया उत्पाद' : 'New Product'}
              </Button>
            </div>
          </div>

          {/* Mobile Header Toggle */}
          <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-dark-surface border-b border-primary-600">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-white/60 hover:text-white"
            >
              <Icon name="Menu" size={24} />
            </button>
            <h1 className="text-lg font-bold text-white">
              {currentLanguage === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
            </h1>
            <Button
              variant="primary"
              onClick={() => navigate('/product-upload')}
              iconName="Plus"
              className="bg-highlight hover:bg-highlight-600 text-black p-2"
            />
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto bg-dark-bg">
            <div className="container-responsive py-8">
              {/* Dashboard Cards */}
              <DashboardCards currentLanguage={currentLanguage} />

              {/* Earnings Summary */}
              <EarningsSummary />

              {/* Analytics Chart */}
              <div className="mb-8">
                <AnalyticsChart />
              </div>

              {/* Products Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  {/* Products Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white mb-4 sm:mb-0">
                      {currentLanguage === 'hi' ? 'मेरे उत्पाद' : 'My Products'}
                      <span className="ml-2 text-sm font-normal text-white/60">
                        ({filteredProducts.length})
                      </span>
                    </h2>
                  </div>

                  {/* Empty State */}
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Package" size={32} className="text-white/60" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      {currentLanguage === 'hi' ? 'अभी तक कोई उत्पाद नहीं' : 'No products yet'}
                    </h3>
                    <p className="text-white/60 mb-6">
                      {currentLanguage === 'hi' 
                        ? 'अपना पहला डिजिटल उत्पाद अपलोड करके शुरुआत करें'
                        : 'Get started by uploading your first digital product'
                      }
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => navigate('/product-upload')}
                      iconName="Plus"
                      iconPosition="left"
                      className="bg-highlight hover:bg-highlight-600 text-black"
                    >
                      {currentLanguage === 'hi' ? 'पहला उत्पाद अपलोड करें' : 'Upload First Product'}
                    </Button>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* UPI Setup */}
                  <UpiSetup />

                  {/* Quick Actions */}
                  <QuickActions />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default CreatorDashboard;