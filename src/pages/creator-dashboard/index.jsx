import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CreatorDashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);

    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/authentication-modal');
    }

    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, [navigate]);

  const sidebarItems = [
    { icon: 'Home', label: currentLanguage === 'hi' ? 'होम' : 'Home', path: '/creator-dashboard', active: true },
    { icon: 'Package', label: currentLanguage === 'hi' ? 'उत्पाद' : 'Products', path: '/dashboard/products' },
    { icon: 'Upload', label: currentLanguage === 'hi' ? 'अपलोड' : 'Upload', path: '/product-upload' },
    { icon: 'Users', label: currentLanguage === 'hi' ? 'सहयोगी' : 'Collaborators', path: '/dashboard/collaborators' },
    { icon: 'Mail', label: currentLanguage === 'hi' ? 'ईमेल' : 'Emails', path: '/dashboard/emails' },
    { icon: 'DollarSign', label: currentLanguage === 'hi' ? 'बिक्री' : 'Sales', path: '/dashboard/sales' },
    { icon: 'BarChart3', label: currentLanguage === 'hi' ? 'एनालिटिक्स' : 'Analytics', path: '/dashboard/analytics' },
    { icon: 'Settings', label: currentLanguage === 'hi' ? 'सेटिंग्स' : 'Settings', path: '/dashboard/settings' },
  ];

  const missionCards = [
    {
      id: 'welcome',
      title: currentLanguage === 'hi' ? 'Welcome Aboard' : 'Welcome Aboard',
      subtitle: currentLanguage === 'hi' ? 'Complete your profile setup' : 'Complete your profile setup',
      status: currentLanguage === 'hi' ? 'शुरू करें' : 'Get Started',
      progress: 75,
      color: 'bg-blue-500',
      path: '/dashboard/settings'
    },
    {
      id: 'impression',
      title: currentLanguage === 'hi' ? 'Make an Impression' : 'Make an Impression',
      subtitle: currentLanguage === 'hi' ? 'Upload your first product' : 'Upload your first product',
      status: currentLanguage === 'hi' ? 'शुरू करें' : 'Get Started',
      progress: 0,
      color: 'bg-emerald-500',
      path: '/product-upload'
    },
    {
      id: 'showtime',
      title: currentLanguage === 'hi' ? 'Showtime' : 'Showtime',
      subtitle: currentLanguage === 'hi' ? 'Publish your product' : 'Publish your product',
      status: currentLanguage === 'hi' ? 'शुरू करें' : 'Get Started',
      progress: 0,
      color: 'bg-purple-500',
      path: '/dashboard/products'
    },
    {
      id: 'tribe',
      title: currentLanguage === 'hi' ? 'Build Your Tribe' : 'Build Your Tribe',
      subtitle: currentLanguage === 'hi' ? 'Share on social media' : 'Share on social media',
      status: currentLanguage === 'hi' ? 'शुरू करें' : 'Get Started',
      progress: 0,
      color: 'bg-orange-500',
      path: '/dashboard/emails'
    },
    {
      id: 'cha-ching',
      title: currentLanguage === 'hi' ? 'Cha-ching' : 'Cha-ching',
      subtitle: currentLanguage === 'hi' ? 'Make your first sale' : 'Make your first sale',
      status: currentLanguage === 'hi' ? 'शुरू करें' : 'Get Started',
      progress: 0,
      color: 'bg-yellow-500',
      path: '/dashboard/sales'
    },
    {
      id: 'money-inbound',
      title: currentLanguage === 'hi' ? 'Money Inbound' : 'Money Inbound',
      subtitle: currentLanguage === 'hi' ? 'Set up UPI payments' : 'Set up UPI payments',
      status: currentLanguage === 'hi' ? 'प्रगति में' : 'In Progress',
      progress: 50,
      color: 'bg-green-600',
      path: '/dashboard/settings'
    },
    {
      id: 'waves',
      title: currentLanguage === 'hi' ? 'Making Waves' : 'Making Waves',
      subtitle: currentLanguage === 'hi' ? 'Check your analytics' : 'Check your analytics',
      status: currentLanguage === 'hi' ? 'प्रगति में' : 'In Progress',
      progress: 25,
      color: 'bg-teal-500',
      path: '/dashboard/analytics'
    },
    {
      id: 'smart-move',
      title: currentLanguage === 'hi' ? 'Smart Move' : 'Smart Move',
      subtitle: currentLanguage === 'hi' ? 'Optimize your earnings' : 'Optimize your earnings',
      status: currentLanguage === 'hi' ? 'शुरू करें' : 'Get Started',
      progress: 10,
      color: 'bg-indigo-500',
      path: '/dashboard/analytics'
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/homepage');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <Header />
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`} style={{ backgroundColor: '#005F65' }}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-highlight to-accent rounded-lg flex items-center justify-center">
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
            className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 min-h-[44px] ${
                  item.active
                    ? 'bg-highlight text-black font-semibold shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon name={item.icon} size={20} strokeWidth={2} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200 min-h-[44px]"
          >
            <Icon name="LogOut" size={20} />
            <span className="font-medium">{currentLanguage === 'hi' ? 'लॉग आउट' : 'Logout'}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="hidden lg:flex items-center justify-between h-20 px-8 bg-white border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentLanguage === 'hi' ? 'Creator Dashboard' : 'Creator Dashboard'}
            </h1>
            <p className="text-gray-600 mt-1">
              {currentLanguage === 'hi' ? 'अपने डिजिटल उत्पादों को प्रबंधित करें' : 'Manage your digital products'}
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate('/product-upload')}
            iconName="Plus"
            iconPosition="left"
            className="bg-primary hover:bg-primary-600 text-white min-h-[44px] px-6 font-semibold"
          >
            {currentLanguage === 'hi' ? '+ नया उत्पाद' : '+ New Product'}
          </Button>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Icon name="Menu" size={24} />
          </button>
          <h1 className="text-lg font-bold text-gray-900">
            {currentLanguage === 'hi' ? 'Dashboard' : 'Dashboard'}
          </h1>
          <Button
            variant="primary"
            onClick={() => navigate('/product-upload')}
            iconName="Plus"
            className="bg-primary hover:bg-primary-600 text-white min-h-[44px] min-w-[44px] p-2"
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-gray-50 p-6">
          {/* Mission Cards Section */}
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {currentLanguage === 'hi' ? 'अपनी सफलता की यात्रा पूरी करें' : 'Complete your journey to success'}
              </h2>
              <p className="text-gray-600">
                {currentLanguage === 'hi' ? 'इन कार्यों को पूरा करके अपने व्यवसाय को बढ़ाएं' : 'Complete these tasks to grow your business'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {missionCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="cursor-pointer"
                  onClick={() => handleCardClick(card.path)}
                >
                  <div className={`${card.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-full min-h-[200px] flex flex-col justify-between`}>
                    <div>
                      <h3 className="text-lg font-bold mb-2 leading-tight">
                        {card.title}
                      </h3>
                      <p className="text-white/90 text-sm mb-4 leading-relaxed">
                        {card.subtitle}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      {card.progress > 0 && (
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-white/80">Progress</span>
                            <span className="text-white font-medium">{card.progress}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                            <motion.div 
                              className="h-full bg-white rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${card.progress}%` }}
                              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/80 font-medium">
                          {card.status}
                        </span>
                        <Icon name="ArrowRight" size={16} className="text-white/80" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon name="Package" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                    <p className="text-gray-600 text-sm">{currentLanguage === 'hi' ? 'उत्पाद' : 'Products'}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                    <Icon name="DollarSign" size={24} className="text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">₹0</p>
                    <p className="text-gray-600 text-sm">{currentLanguage === 'hi' ? 'कमाई' : 'Earnings'}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                    <p className="text-gray-600 text-sm">{currentLanguage === 'hi' ? 'ग्राहक' : 'Customers'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
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