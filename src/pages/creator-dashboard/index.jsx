import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
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

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      title: "Complete React Development Course",
      description: "Master React from basics to advanced concepts with hands-on projects and real-world examples.",
      price: 2999,
      type: "pdf",
      status: "active",
      views: 1247,
      sales: 89,
      revenue: 266911,
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      createdAt: new Date('2024-01-15')
    },
    {
      id: 2,
      title: "UI/UX Design Templates Pack",
      description: "Professional design templates for web and mobile applications with Figma source files.",
      price: 1499,
      type: "zip",
      status: "active",
      views: 892,
      sales: 156,
      revenue: 233844,
      thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=300&fit=crop",
      createdAt: new Date('2024-01-10')
    },
    {
      id: 3,
      title: "JavaScript Mastery Video Series",
      description: "Comprehensive video tutorials covering modern JavaScript concepts and best practices.",
      price: 3999,
      type: "mp4",
      status: "draft",
      views: 234,
      sales: 12,
      revenue: 47988,
      thumbnail: "https://images.pixabay.com/photo/2015/04/20/13/17/work-731198_1280.jpg?w=400&h=300&fit=crop",
      createdAt: new Date('2024-01-08')
    },
    {
      id: 4,
      title: "Digital Marketing Strategy Guide",
      description: "Step-by-step guide to building successful digital marketing campaigns for small businesses.",
      price: 1999,
      type: "pdf",
      status: "active",
      views: 567,
      sales: 78,
      revenue: 155922,
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      createdAt: new Date('2024-01-05')
    },
    {
      id: 5,
      title: "Photography Lightroom Presets",
      description: "Professional Lightroom presets for portrait, landscape, and street photography.",
      price: 899,
      type: "zip",
      status: "inactive",
      views: 123,
      sales: 5,
      revenue: 4495,
      thumbnail: "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?w=400&h=300&fit=crop",
      createdAt: new Date('2024-01-03')
    },
    {
      id: 6,
      title: "Python Programming Bootcamp",
      description: "Learn Python programming from scratch with practical projects and coding exercises.",
      price: 2499,
      type: "pdf",
      status: "active",
      views: 934,
      sales: 67,
      revenue: 167433,
      thumbnail: "https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg?w=400&h=300&fit=crop",
      createdAt: new Date('2024-01-01')
    }
  ];

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
      alert(currentLanguage === 'hi' ?'उत्पाद सफलतापूर्वक हटा दिया गया!' :'Product deleted successfully!'
      );
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
    alert(currentLanguage === 'hi' ?'उत्पाद लिंक कॉपी हो गया!' :'Product link copied!'
    );
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  {currentLanguage === 'hi' ? 'क्रिएटर डैशबोर्ड' : 'Creator Dashboard'}
                </h1>
                <p className="text-text-secondary">
                  {currentLanguage === 'hi' ?'अपने डिजिटल उत्पादों और कमाई को प्रबंधित करें' :'Manage your digital products and earnings'
                  }
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Button
                  variant="primary"
                  onClick={() => navigate('/product-upload')}
                  iconName="Plus"
                  iconPosition="left"
                  className="glow-effect"
                >
                  {currentLanguage === 'hi' ? 'नया उत्पाद' : 'New Product'}
                </Button>
              </div>
            </div>
          </div>

          {/* Earnings Summary */}
          <EarningsSummary />

          {/* Analytics Chart */}
          <div className="mb-8">
            <AnalyticsChart />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Products Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Products Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary mb-4 sm:mb-0">
                  {currentLanguage === 'hi' ? 'मेरे उत्पाद' : 'My Products'}
                  <span className="ml-2 text-sm font-normal text-text-secondary">
                    ({filteredProducts.length})
                  </span>
                </h2>
                
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    iconName="Filter"
                    iconPosition="left"
                    className="sm:hidden"
                  >
                    {currentLanguage === 'hi' ? 'फ़िल्टर' : 'Filters'}
                  </Button>
                  
                  {selectedProducts.length > 0 && (
                    <Button
                      variant="danger"
                      iconName="Trash2"
                      iconPosition="left"
                    >
                      {currentLanguage === 'hi' ? 'हटाएं' : 'Delete'} ({selectedProducts.length})
                    </Button>
                  )}
                </div>
              </div>

              {/* Search and Filters */}
              <div className={`space-y-4 mb-6 ${showMobileFilters ? 'block' : 'hidden sm:block'}`}>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="flex-1 relative">
                    <Icon 
                      name="Search" 
                      size={20} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                    />
                    <Input
                      type="search"
                      placeholder={currentLanguage === 'hi' ? 'उत्पाद खोजें...' : 'Search products...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="appearance-none bg-surface border border-border rounded-lg px-4 py-2 text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer spring-transition"
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-surface border border-border rounded-lg px-4 py-2 text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer spring-transition"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onEdit={handleProductEdit}
                      onDelete={handleProductDelete}
                      onToggleStatus={handleToggleStatus}
                      onCopyLink={handleCopyLink}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-background-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Package" size={32} className="text-text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary mb-2">
                    {currentLanguage === 'hi' ? 'कोई उत्पाद नहीं मिला' : 'No products found'}
                  </h3>
                  <p className="text-text-secondary mb-6">
                    {searchQuery || filterStatus !== 'all'
                      ? (currentLanguage === 'hi' ?'अपनी खोज या फ़िल्टर बदलने का प्रयास करें' :'Try changing your search or filters'
                        )
                      : (currentLanguage === 'hi' ?'अपना पहला डिजिटल उत्पाद अपलोड करके शुरुआत करें' :'Get started by uploading your first digital product'
                        )
                    }
                  </p>
                  {(!searchQuery && filterStatus === 'all') && (
                    <Button
                      variant="primary"
                      onClick={() => navigate('/product-upload')}
                      iconName="Plus"
                      iconPosition="left"
                    >
                      {currentLanguage === 'hi' ? 'पहला उत्पाद अपलोड करें' : 'Upload First Product'}
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* UPI Setup */}
              <UpiSetup />

              {/* Recent Activity */}
              <div className="bg-surface rounded-xl border border-border p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-warning-50 rounded-lg flex items-center justify-center">
                    <Icon name="Activity" size={20} className="text-warning" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {currentLanguage === 'hi' ? 'हाल की गतिविधि' : 'Recent Activity'}
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    {
                      action: currentLanguage === 'hi' ? 'नई बिक्री' : 'New sale',
                      product: 'React Course',
                      time: currentLanguage === 'hi' ? '2 घंटे पहले' : '2 hours ago',
                      amount: '₹2,999'
                    },
                    {
                      action: currentLanguage === 'hi' ? 'उत्पाद देखा गया' : 'Product viewed',
                      product: 'UI Templates',
                      time: currentLanguage === 'hi' ? '4 घंटे पहले' : '4 hours ago',
                      amount: null
                    },
                    {
                      action: currentLanguage === 'hi' ? 'नई बिक्री' : 'New sale',
                      product: 'Marketing Guide',
                      time: currentLanguage === 'hi' ? '6 घंटे पहले' : '6 hours ago',
                      amount: '₹1,999'
                    }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-text-primary">
                          {activity.action}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {activity.product} • {activity.time}
                        </p>
                      </div>
                      {activity.amount && (
                        <span className="text-sm font-semibold text-success">
                          {activity.amount}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;